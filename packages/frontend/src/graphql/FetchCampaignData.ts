import gql from "graphql-tag";


export const FETCH_CAMPAIGN_DETAILS_BY_ID = gql`
	query getCampaignDetailsById($campaign_id: String!){
		getCampaignDetailsById(campaign_id: $campaign_id){
			campaign_id
			campaign_name
			rules{
				attribute_id
				operator
				threshold_value
				prefix_multiplier
				multi_select_threshold
			}
		}
	}
`
