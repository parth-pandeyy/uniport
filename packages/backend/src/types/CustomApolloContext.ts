import { Request, Response } from "express";


export type CustomApolloContext = {
	req: Request,
	res: Response
}
