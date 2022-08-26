import gql from "graphql-tag";


export const loginExistingUser = gql`
	mutation($email_address: String!, $password: String!){
		loginExistingUser(email: $email_address, password: $password){
			user_id
		}
	}
`
