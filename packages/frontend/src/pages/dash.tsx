import { useQuery } from "@apollo/client";
import router from "next/router";
import { FETCH_CURRENT_USER } from "../graphql/FetchCurrentUser";
import withAuth from "../HOC/withAuth";
import { ADMIN_PRIMARY_DASHBOARD, STUDENT_CAMP_CHOOSE_ROUTE } from "../config/routes-config";

// Only to redirect the user to correct dashboard

const Dash = () => {
	// only auth people can come here. So no loading check
	let { data } = useQuery(FETCH_CURRENT_USER);

	if (data.getUserDetails.access_role === 'ADMIN') {
		router.push(ADMIN_PRIMARY_DASHBOARD);
	} else {
		router.push(STUDENT_CAMP_CHOOSE_ROUTE);
	}

	return null;
}

export default withAuth(Dash);
