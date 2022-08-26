import { AddStudentProfileDefinitionsInput, StudentProfileDefinition, allSupportedLEGOs, LEGOsWithOptions, LEGOsWithoutOptions } from "@uniport/common";
import { AuthenticationError, ForbiddenError, UserInputError } from "apollo-server-errors";
import { types } from "cassandra-driver";
import { authenticatedUsersOnly } from "../config/auth/authCheckers"
import { dbClient } from "../db";
import { CustomApolloContext } from "../types/CustomApolloContext";
import * as yup from 'yup';


export const studentProfileDefinitionResolver = {
	Query: {
		getStudentProfileDefinitions: async (_: any, args: any, ctx: CustomApolloContext) => {
			authenticatedUsersOnly(ctx.req);

			let res = await dbClient.execute(`
				SELECT *
				FROM student_profile_definition
				WHERE org_id=?`,
				[ctx.req.user?.org_id])

			// convert the null values in [options] as []
			let data = [];
			for (let item of res.rows as unknown as StudentProfileDefinition[]) {
				if (!item.options) {
					item.options = []
				}
				data.push(item);
			}
			return data;
		}

	},
	Mutation: {
		addStudentProfileDefinitions: async (_: any, { payload }: { payload: AddStudentProfileDefinitionsInput[] }, ctx: CustomApolloContext) => {
			// check auth status
			authenticatedUsersOnly(ctx.req);

			// must be an admin
			if (ctx.req.user?.access_role !== 'ADMIN') {
				throw new ForbiddenError("You need to be admin to perform this action")
			}

			let validationSchema = yup.object().shape({
				attribute_type: yup.string().required().min(3),
				is_array: yup.bool().required(),
				label: yup.string().required(),
				required: yup.bool().required(),
				options: yup.array(),
				requires_proof: yup.bool().required(),
			})


			// push all of them at once
			let queries: any[] = [];
			let orgId = ctx.req.user.org_id;

			// 9 fields
			const query = `INSERT INTO student_profile_definition(
				org_id,
				attribute_id,
				attribute_type,
				is_array,
				label,
				is_blocked,
				required,
				options,
				requires_proof
			)VALUES(?,?,?,?,?,?,?,?,?)`;

			for (let item of payload) {
				// TODO: check the attribute type
				// validate everything. :)
				validateStudentProfileDefinitionItem(item);
				await validationSchema.validate(item);

				queries.push({
					query,
					params: [
						orgId,
						types.Uuid.random(),
						item.attribute_type,
						item.is_array,
						item.label,
						false, // initally who would block a field. :)
						item.required,
						item.options ?? [],
						item.requires_proof
					]
				})
			}

			await dbClient.batch(queries);


			return true;
		}
	}
}


// the following validates whenever the admin sends that he/she wants to add a [date_type_1] field
// then we use this to ensure that everything is okay
// Note: validates a single item
export const validateStudentProfileDefinitionItem = (item: AddStudentProfileDefinitionsInput) => {
	let attribute_type = item.attribute_type;

	if (allSupportedLEGOs.findIndex(e => e === attribute_type) === -1) {
		throw new UserInputError(`Invalid LEGO type ${attribute_type}`);
	}

	if (LEGOsWithOptions.findIndex(e => e === attribute_type) !== -1) {
		// this lego is with options
		if (!item.options.length) {
			throw new UserInputError(`LEGO ${attribute_type} need to define some options`)
		}

		if (item.is_array) {
			throw new UserInputError(`LEGO ${attribute_type} already has options. We cannot make it an isArray. Kindly make it multi_select_type_12 if you want multiselect and remove the isArray`)
		}
	} else {
		// this lefo is without options
		if (item.options.length) {
			throw new UserInputError(`LEGO ${attribute_type} shouldn't define any options`)
		}
	}
	if(attribute_type==='resume_type_11' && item.requires_proof===true){
		throw new UserInputError(`LEGO ${attribute_type} is a proof in itself. Please uncheck requires_proof`)
	}
}
