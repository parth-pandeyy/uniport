

// dummy route to make the student redirect with their id

import { useQuery } from "@apollo/client";
import withAuth from "../../../HOC/withAuth";
import router from "next/router";
import { FETCH_CURRENT_USER } from "../../../graphql/FetchCurrentUser";
import { ADMIN_PRIMARY_DASHBOARD, STUDENT_PROFILE_ROUTE } from "../../../config/routes-config";

// if it's admin then redirect them to admin page
const StudentProfileBridge = () => {
	let { data } = useQuery(FETCH_CURRENT_USER);

	if (data.getUserDetails.access_role === 'ADMIN') {
		router.push(ADMIN_PRIMARY_DASHBOARD);
	} else {
		router.push(STUDENT_PROFILE_ROUTE(data.getUserDetails.user_id));
	}

	return null;
}

export default withAuth(StudentProfileBridge);
