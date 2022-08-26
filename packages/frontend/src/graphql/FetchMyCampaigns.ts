import gql from "graphql-tag";

// NOTE it's same as FETCH_SIDE_BAR_ITEMS. But they need might need a few more things in future
export const FETCH_MY_CAMPAIGNS=gql`
	query fetchMyCampaigns{
		getMyCampaigns{
			campaign_id
			campaign_name
		}
	}
`;
