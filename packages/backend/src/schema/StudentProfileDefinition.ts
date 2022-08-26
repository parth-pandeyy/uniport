import { gql } from "apollo-server-core";


export const studentProfileDefinitionSchema = gql`
	type StudentProfileDefinition {
		org_id: String!
		attribute_id: ID!
		attribute_type: String!
		is_array: Boolean!
		label: String!
		is_blocked: Boolean!
		required: Boolean!
		options: [String]!
		requires_proof: Boolean!
	}

	input AddStudentProfileDefinitionsInput {
		attribute_type: String!
		is_array: Boolean!
		label: String!
		required: Boolean!
		options: [String]!
		requires_proof: Boolean!
	}


	type Query{
		# any authenticated user can get the profile definitions
		getStudentProfileDefinitions: [StudentProfileDefinition]!
	}

	type Mutation{
		# for now we will only allow the admin to add fields
		# editing isn't allowed for now
		addStudentProfileDefinitions(payload: [AddStudentProfileDefinitionsInput!]!): Boolean!
	}

`



