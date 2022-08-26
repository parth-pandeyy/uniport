import { Request } from "express";
import { UserModelType } from "../../models/User";


export const setAuthCookieAndLogIn = async (req: Request, userData: UserModelType) => {
	return new Promise((resolve, reject) => {
		req.login(userData, (err) => {
			if (err) throw Error("Something went wrong with passport.")
			// user logged in successfully
			resolve(1);
		})
	});
}
