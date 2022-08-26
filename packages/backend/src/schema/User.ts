import { gql } from "apollo-server-express"


const UserSchema = gql`
	type User {
		user_id: ID!
		first_name: String!
		last_name: String!
		email_address: String!
		org_id: String!
		access_role: String! # for now we have "ADMIN" and "STUDENT"
		has_student_profile: Boolean!
	}

	input RegisterAdminInput {
		first_name: String!
		last_name: String!
		email_address: String!
		password: String!
		org_name: String!
	}

	input RegisterWithValidInviteInput {
		first_name: String!
		last_name: String!
		email_address: String!
		password: String!
	}


	type Query {
		# returns the user details
		getUserDetails: User
		# returns the auth status
		checkAuthStatus: String!
	}


	type Mutation {
		# Note: all three mutations here will set the [uid] cookie
		# Mutation to allow the client register a new user with "Email and Password approach"
		registerAdmin(payload: RegisterAdminInput!): User!
		# Mutation to allow the client login  a user with "Email and Password appraoch"
		loginExistingUser(email: String!, password: String!): User!
		# registration for users with valid invite
		registerWithValidInvite(payload: RegisterWithValidInviteInput): User!
	}
`;


export {
	UserSchema
}
