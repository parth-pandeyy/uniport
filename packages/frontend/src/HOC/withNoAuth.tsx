import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_CURRENT_USER } from "../graphql/FetchCurrentUser";



const withNoAuth = (WrappedComponent) => {
	return (props) => {
		const Router = useRouter();
		let { data, loading } = useQuery(FETCH_CURRENT_USER);

		if (loading) {
			return (
				<div>
					{/* Auth status resolving */}
				</div>
			)
		}

		if (!data) { // is user is authenticated then move them to /dash
			return <WrappedComponent {...props} />;
		}

		Router.replace("/dash/");
		return null;
	};
};

export default withNoAuth;
