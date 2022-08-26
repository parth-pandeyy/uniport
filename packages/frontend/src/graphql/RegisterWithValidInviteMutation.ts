import gql from "graphql-tag";


export const REGISTER_WITH_VALID_INVITE_MUTATION = gql`
	mutation RegisterWithValidInviteMutation($registerWithValidInvitePayload: RegisterWithValidInviteInput) {
		registerWithValidInvite(payload: $registerWithValidInvitePayload){
			user_id
		}
	}
`
