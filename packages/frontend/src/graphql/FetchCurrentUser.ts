import gql from "graphql-tag";


export const FETCH_CURRENT_USER = gql`
	query fetchCurrentUser{
		getUserDetails{
			org_id
			first_name
			last_name
			email_address
			access_role
			org_id
			has_student_profile
			__typename
			user_id

		}
	}
`
