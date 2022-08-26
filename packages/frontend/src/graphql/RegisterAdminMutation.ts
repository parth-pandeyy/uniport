import gql from "graphql-tag";

export const registerAdminMutation = gql`
	mutation ($registerAdminPayload: RegisterAdminInput!) {
		registerAdmin(payload: $registerAdminPayload){
			user_id
			first_name
			last_name
			email_address
			org_id
			access_role
			has_student_profile
		}
	}
`;
