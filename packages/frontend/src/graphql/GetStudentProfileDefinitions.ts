import gql from "graphql-tag";


export const GET_STUDENT_PROFILE_DEFINITIONS = gql`
	query getStudentProfileDefinitions{
		getStudentProfileDefinitions{
			attribute_id
			attribute_type
			is_array
			label
			is_blocked
			required
			requires_proof
			options
		}
	}
`
