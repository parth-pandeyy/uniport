


import { useQuery } from "@apollo/client";
import HeadMeta from "../../../../components/HeadMeta/HeadMeta";
import Layout from "../../../../components/AuthLayout/Layout";
import { FETCH_CURRENT_USER } from "../../../../graphql/FetchCurrentUser";


const AllProfilesInCamp = () => {
	const { data, loading, error } = useQuery(FETCH_CURRENT_USER)

	return (
		<>
			<HeadMeta title='Uniport | Dashboard' />
			<Layout>
				<div className='p-10'>
					{/* Content goes here */}
					{error ?
						<div className='my-3 text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 flex items-center p-4 rounded-md'>
							{error.message}
						</div> : null}
					{loading ?
						<div className='my-3 text-sm text-left text-blue-600 bg-blue-500 bg-opacity-10 border border-blue-400 flex items-center p-4 rounded-md'>
							Loading...
						</div> : null}

				</div>
			</Layout>
		</>
	)
}
export default AllProfilesInCamp;
