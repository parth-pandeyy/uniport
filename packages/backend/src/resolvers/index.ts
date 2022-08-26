import { campaignResolvers } from "./Campaign";
import { navMenuResolvers } from "./NavMenu";
import { studentProfileDefinitionResolver } from "./StudentProfileDefinition";
import { UserResolver } from "./User";


export const mergedResolvers = {
	Query: {
		...UserResolver.Query,
		...navMenuResolvers.Query,
		...studentProfileDefinitionResolver.Query,
		...campaignResolvers.Query,
	},
	Mutation: {
		...UserResolver.Mutation,
		...campaignResolvers.Mutation,
		...studentProfileDefinitionResolver.Mutation,
	},
}
