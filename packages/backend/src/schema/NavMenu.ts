

import { gql } from "apollo-server-core";


export const navMenuSchema = gql`
	type NavItem{
		label: String!
		relative_url: String!
	}

	type Query{
		# Using the access token of the current authenticated user
		# we shall find all the nav items for that ROLE
		getNavItems: [NavItem]!
	}
`;
