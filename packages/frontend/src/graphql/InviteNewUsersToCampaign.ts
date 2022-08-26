import gql from "graphql-tag";


export const INVITE_NEW_USERS_TO_CAMPAIGN_MUTATION = gql`
	mutation inviteNewUsersToCampaign($payload: InviteNewUsersToCampaignInput!){
		inviteNewUsersToCampaign(payload: $payload)
	}
`
