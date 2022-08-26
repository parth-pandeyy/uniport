import gql from "graphql-tag";


export const ADD_STUDENT_PROFILE_DEFINITIONS = gql`
	mutation addStudentProfileDefinitions($payload: [AddStudentProfileDefinitionsInput!]!){
		addStudentProfileDefinitions(payload:$payload)
	}
`
