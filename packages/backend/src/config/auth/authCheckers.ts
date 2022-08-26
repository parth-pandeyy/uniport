import { AuthenticationError } from "apollo-server-errors";
import { Request } from "express";


export const nonAuthenticatedUsersOnly = (req: Request) => {
	if (req.user || req.isAuthenticated()) {
		throw new AuthenticationError("Route is only for non authenticated users");
	}
}


export const authenticatedUsersOnly = (req: Request) => {
	if (!req.user || req.isUnauthenticated()) {
		throw new AuthenticationError("Route is only for authenticated users");
	}
}
