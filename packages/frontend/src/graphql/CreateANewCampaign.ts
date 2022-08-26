import gql from "graphql-tag";


export const CREATE_A_NEW_CAMPAIGN=gql`
	mutation createANewCampaign($campaign_name: String!){
		createANewCampaign(campaign_name: $campaign_name){
			campaign_id
			campaign_name
		}
	}
`;

