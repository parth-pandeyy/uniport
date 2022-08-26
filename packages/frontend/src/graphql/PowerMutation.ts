import gql from "graphql-tag";


export const POWER_MUTATION = gql`
	mutation inviteTheNewUsersToCampaign($payload: InviteNewUsersToCampaignInput!){
		inviteNewUsersToCampaign(payload: $payload)
	}
`
