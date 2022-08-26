import passportLocal from 'passport-local';
import { dbClient } from "../../db";
import { UserModelType } from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const LocalStrategy = passportLocal.Strategy;

// For now we will be using session auth
// TODO: Later maybe use JWT based approach where keep ["email", "org_id" and "access_role"] as payload

export const localStrategyConfig = new LocalStrategy(
	async function (email, password, done) {
		try {
			let res = await dbClient.execute('SELECT * FROM user WHERE email=?', [email]);
			// check if user exist
			if(res.rowLength!==1){
				throw Error("Username doesn't exist");
			}
			// check if passwords match
			let user=res.rows[0] as unknown as UserModelType;

			let bcryptRes=await bcrypt.compare(password, user.hashed_password);

			if(!bcryptRes){
				throw Error('Incorrect Password');
			}

			// successful auth
			done(undefined, user);
		} catch (err) {
			return done(undefined, false, { message: err.message })
		}
	}
);
