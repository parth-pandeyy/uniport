import gql from "graphql-tag";


export const FETCH_SIDE_BAR_ITEMS=gql`
	query fetchMyCampaigns{
		getMyCampaigns{
			campaign_id
			campaign_name
		}
	}
`;
