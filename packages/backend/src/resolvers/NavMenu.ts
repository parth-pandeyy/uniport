import { dbClient } from "../db";
import { authenticatedUsersOnly } from "../config/auth/authCheckers";
import { CustomApolloContext } from "../types/CustomApolloContext";


export const navMenuResolvers = {
	Query: {
		// TODO: Deprecate this
		getNavItems: async (_: any, __: any, ctx: CustomApolloContext) => {
			authenticatedUsersOnly(ctx.req);

			let access_role = ctx.req.user?.access_role;

			let res = await dbClient.execute('SELECT * FROM navigation_menu_item WHERE access_role=?', [access_role]);

			// I can be sure that it's of 1 length size only
			if(res.rowLength!==1){
				throw Error("Wrong Logic. ROLE not registered");
			}
			return res.rows[0].items;
		}
	}
}
