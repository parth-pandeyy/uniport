import { gql } from "apollo-server-core";


export const campaignSchema = gql`
	type Campaign{
		campaign_id: ID!
		campaign_name: String!
	}

	type CampaignDetails{
		campaign_id: ID!
		campaign_name: String!
		rules: [FilteringRule]!
	}

	type FilteringRule{
		attribute_id: String!
		operator: String!
		threshold_value: Int!
		prefix_multiplier: Int!
		multi_select_threshold: [String]!
	}

	type Query{
		# for students we will check the [campaign_by_user] table to get the campaigns
		# for admin we will directly fetch all the campaigns registered for the org
		getMyCampaigns: [Campaign]!

		# only authenticated users can access it. (and they need to enrolled in that campaign or must be an admin)
		getCampaignDetailsById(campaign_id: String!): CampaignDetails!
	}

	# input FilteringRuleInput{
	# 	attribute_id: String!
	# 	operator: String!
	# 	threshold_value: Int!
	# 	prefix_multiplier: Int!
	# 	multi_select_threshold: [String]!
	# }

	# input CreateANewCampaignInput{
	# 	# Campaign rules should be set afterwards. Anyhow we have a mutation to add/edit rules
	# 	# rules: [FilteringRule]!
	# }


	input InviteNewUsersToCampaignInput{
		user_emails: [String!]!
		access_role: AccessRoleEnum!
		campaign_id: String!
	}

	enum AccessRoleEnum{
		ADMIN
		STUDENT
	}

	type Mutation{
		# for admin to create a new campaign
		createANewCampaign(campaign_name: String!): Campaign!

		# for now we can only invite people either for
		# ADMIN role or for STUDENT role
		# also ensure that you cannot invite an exisiting user for now!
		# like someone who is admin. and you want to make them student
		# or someone is user and you want to make them admin. (FOR NOW)
		# In future we shall add multiple roles like PLACEMENT_ADMIN, COORDINATOR etc which will make this possible
		# invite new students to the new campaign
		inviteNewUsersToCampaign(payload: InviteNewUsersToCampaignInput): Boolean!


	}
`


