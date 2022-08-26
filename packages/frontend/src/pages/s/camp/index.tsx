// Student dash.
// get all the campaigns and let the student choose from here
// incase there are only 1 campaign then automatically redirect them

import { useQuery } from "@apollo/client";
import HeadMeta from "../../../components/HeadMeta/HeadMeta";
import Layout from "../../../components/AuthLayout/Layout";
import { FETCH_MY_CAMPAIGNS } from "../../../graphql/FetchMyCampaigns";
import Image from 'next/image';
import Link from 'next/link';
import { CAMPAIGN_DASHBOARD } from "../../../config/routes-config";
import { FETCH_CURRENT_USER } from "../../../graphql/FetchCurrentUser";


const StudentCampChoose = () => {
	const { data, loading, error } = useQuery(FETCH_MY_CAMPAIGNS);

	const { data: user } = useQuery(FETCH_CURRENT_USER)

	return (
		<>
			<HeadMeta title='Uniport | Dashboard' />
			<Layout>
				<div className='mt-20'>
					{/* Content goes here */}
					{error ?
						<div className='my-3 text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 flex items-center p-4 rounded-md'>
							{error.message}
						</div> : null}
					{loading ?
						<div className='my-3 text-sm text-left text-blue-600 bg-blue-500 bg-opacity-10 border border-blue-400 flex items-center p-4 rounded-md'>
							Loading...
						</div> : null}

					<div className='max-w-md mx-auto'>
						<div className='text-lg mb-4 font-bold text-blue-600'>
							Choose a campaign to continue
						</div>
						{data && data.getMyCampaigns.map((e, indx) => {
							return (
								<div className="" key={indx}>
									<Link href={CAMPAIGN_DASHBOARD(e.campaign_id,user.access_role)}>
										<div className="btn text-base bg-white px-4 py-2 flex items-center my-2 rounded-lg shadow">
											<div className="w-24 pr-5">
												<Image src={require('../../../assets/images/workspace.svg')} width='50' height='50' className="rounded" />
											</div>
											<div className="flex-1">
												<h2 className="font-bold text-gray-700 my-0">{e.campaign_name}</h2>
											</div>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</Layout>
		</>
	)
}
export default StudentCampChoose;
