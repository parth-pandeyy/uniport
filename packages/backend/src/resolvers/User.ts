import bcrypt from 'bcrypt';
import { PWD_HASH_ROUNDS } from "../config/constants";
import { types } from "cassandra-driver";
import { RegisterWithValidInviteInput, RegisterAdminInput, registerAdminInputValidationSchema, registerWithValidInviteInputValidationSchema } from '@uniport/common';
import { dbClient } from '../db/index';
import { CustomApolloContext } from 'src/types/CustomApolloContext';
import { UserInputError } from 'apollo-server-core';
import { UserModelType } from 'src/models/User';
import * as yup from 'yup';
import { authenticatedUsersOnly, nonAuthenticatedUsersOnly } from '../config/auth/authCheckers';
import { setAuthCookieAndLogIn } from '../config/auth/setAuthCookieAndLogIn';



export const UserResolver = {
	Query: {
		// a test route for debugging purposes
		checkAuthStatus: (_: any, __: any, ctx: CustomApolloContext) => {
			if (ctx.req.isAuthenticated()) {
				return "AUTHENTICATED";
			} else {
				return "NOT_AUTHENTICATED";
			}
		},

		getUserDetails: async (_: any, __: any, ctx: CustomApolloContext) => {
			// only for authenticated users
			authenticatedUsersOnly(ctx.req);
			let user = ctx.req.user;
			return user;
		}
	},

	Mutation: {
		// mutation to register a new "ADMIN"
		registerAdmin: async (_: any, { payload }: { payload: RegisterAdminInput }, ctx: CustomApolloContext) => {
			try {
				// route only for non authenticated users
				nonAuthenticatedUsersOnly(ctx.req);

				// validate the inputs
				await registerAdminInputValidationSchema.validate(payload);

				// push the email
				let orgUid = types.Uuid.random();
				let userUid = types.Uuid.random();

				let hashed_password = await bcrypt.hash(payload.password, PWD_HASH_ROUNDS);

				// insert into users table
				let res = await dbClient.execute(
					`INSERT INTO user (
						user_id,
						first_name,
						last_name,
						email_address,
						org_id,
						access_role,
						has_student_profile,
						hashed_password)
					 VALUES (?,?,?,?,?,?,?,?) IF NOT EXISTS`,
					[
						userUid,
						payload.first_name,
						payload.last_name,
						payload.email_address,
						orgUid,
						"ADMIN",
						false,
						hashed_password
					]
				);

				if (!res.rows[0]['[applied]']) {
					throw Error("Account already taken!");
				}

				// create a new org
				res = await dbClient.execute(
					`INSERT INTO organization (org_id, org_name)
					VALUES (?,?) IF NOT EXISTS`, [orgUid, payload.org_name]
				);

				if (!res.rows[0]['[applied]']) {
					// race condition. :(
					await dbClient.execute('DELETE FROM user WHERE email_address=?', [payload.email_address])
					throw Error("Something went wrong!");
				}

				let userData: UserModelType = {
					user_id: userUid,
					first_name: payload.first_name,
					last_name: payload.last_name,
					email_address: payload.email_address,
					org_id: orgUid,
					access_role: "ADMIN",
					has_student_profile: false,
					hashed_password,
				}

				await setAuthCookieAndLogIn(ctx.req, userData);
				return userData;

			} catch (err) {
				console.log("Error:", err.message)
				throw new UserInputError(err.message);
			}
		},

		// mutation to allow a user to join by invite
		registerWithValidInvite: async (_: any, { payload }: { payload: RegisterWithValidInviteInput }, ctx: CustomApolloContext) => {
			// route only for non authenticated users
			nonAuthenticatedUsersOnly(ctx.req);

			await registerWithValidInviteInputValidationSchema.validate(payload);

			// check if the email is actually invited or not
			let res = await dbClient.execute(`SELECT * FROM invited_user WHERE email=?`, [payload.email_address]);
			if (res.rowLength !== 1) {
				throw new UserInputError("Invalid email. Please use the same email where you received the invite.")
			}

			let invitedUserData = res.rows[0];
			let hashedPassword = await bcrypt.hash(payload.password, PWD_HASH_ROUNDS);

			let shouldHaveStudentProfile = false;
			if (invitedUserData['access_role'] === 'STUDENT') {
				// ! Ensure that if you add PLACEMENT_COORDINATOR etc. Then you change it here.
				shouldHaveStudentProfile = true;
			}

			let userUid = types.Uuid.random();
			let insertResponse = await dbClient.execute(
				`INSERT INTO user (
					user_id,
					first_name,
					last_name,
					email_address,
					org_id,
					access_role,
					has_student_profile,
					hashed_password)
				 VALUES (?,?,?,?,?,?,?,?) IF NOT EXISTS`,
				[
					userUid,
					payload.first_name,
					payload.last_name,
					payload.email_address,
					invitedUserData['org_id'],
					invitedUserData['access_role'],
					shouldHaveStudentProfile,
					hashedPassword
				]
			);


			if (!insertResponse.rows[0]['[applied]']) {
				// already used. Somehow we didn't delete the from invited user table. [Strange.]
				throw Error("Something went wrong! Maybe the user is already a user.");
			}

			let newUser: UserModelType = {
				user_id: userUid,
				first_name: payload.first_name,
				last_name: payload.last_name,
				email_address: payload.email_address,
				org_id: invitedUserData['org_id'],
				access_role: invitedUserData['access_role'],
				has_student_profile: false,
				hashed_password: hashedPassword,
			}
			// the user has an invite and the fields are valid

			// delete the invite
			await dbClient.execute(`DELETE FROM invited_user WHERE email=?`, [payload.email_address]);


			// update the [campaign_stats_by_org]
			await dbClient.execute(`UPDATE campaign_stats_by_org
				SET number_of_invited_student = number_of_invited_student -1,
				number_of_registered_student = number_of_registered_student +1
				WHERE org_id=? AND campaign_id=?
				`, [invitedUserData['org_id'], invitedUserData['campaign_id']])

			// add an entry to [campaign_by_user]
			// we need campaign_name; So we shall find that from campaign_by_org
			let campaignDetails = await dbClient.execute(`SELECT campaign_name
				FROM campaign_by_org
				WHERE org_id=? AND campaign_id=?`, [invitedUserData['org_id'], invitedUserData['campaign_id']]);

			if (campaignDetails.rowLength !== 1) {
				throw Error("Something went wrong. Things are out of sync");
			}

			let campaignName = campaignDetails.rows[0]['campaign_name'];


			await dbClient.execute(`INSERT INTO campaign_by_user(
				campaign_id,
				campaign_name,
				org_id,
				user_id)
				VALUES(?,?,?,?)`, [invitedUserData['campaign_id'], campaignName, invitedUserData['org_id'], userUid])



			// add a student profile
			const addStudentProfileQuery = `
				INSERT INTO student_profile(user_id,org_id,first_name, last_name, email_address)
				VALUES(?,?,?,?,?)`;


			await dbClient.execute(addStudentProfileQuery,
				[
					userUid,
					invitedUserData['org_id'],
					payload.first_name,
					payload.last_name,
					payload.email_address
				]
			)

			// logIn the user
			await setAuthCookieAndLogIn(ctx.req, newUser);

			return newUser;
		},

		loginExistingUser: async (_: any, { email, password }: { email: string, password: string }, ctx: CustomApolloContext) => {
			// route only for non authenticated users
			nonAuthenticatedUsersOnly(ctx.req);

			// Validate
			let a = await yup.string().email().isValid(email);
			let b = await yup.string().min(6).isValid(password);

			if (!a || !b) {
				throw new UserInputError("Bad email or password")
			}

			let userInstance = await dbClient.execute(`SELECT * FROM user WHERE email_address=?`, [email]);
			if (userInstance.rowLength !== 1) {
				throw new UserInputError("Invalid email");
			}

			let user = userInstance.rows[0] as unknown as UserModelType;

			let res = await bcrypt.compare(password, user.hashed_password);
			if (!res) {
				throw new UserInputError("Passwords didn't match")
			}

			await setAuthCookieAndLogIn(ctx.req, user);
			return user;
		}

	},
}






