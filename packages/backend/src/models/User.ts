import { types } from "cassandra-driver";

export type UserModelType = {
	user_id: string | types.Uuid,
	first_name: string,
	last_name: string,
	email_address: string,
	hashed_password: string,
	org_id: string | types.Uuid,
	access_role: string,
	has_student_profile: boolean,
}
