import { useQuery } from "@apollo/client";
import HeadMeta from "../../../components/HeadMeta/HeadMeta";
import Layout from "../../../components/AuthLayout/Layout";
import { FETCH_CURRENT_USER } from "../../../graphql/FetchCurrentUser";
import withAuth from "../../../HOC/withAuth";


const AdminDash = () => {

	let { data, loading } = useQuery(FETCH_CURRENT_USER);


	let access_role = data.getUserDetails.access_role;

	return (
		<div>
			<HeadMeta title='Uniport | Admin Dashboard' />
			<Layout>
				<div className='p-10 max-w-3xl mx-auto'>

					<div className='text-2xl font-bold leading-normal mt-0 mb-3 text-purple-800'>
						Job Profile Details
					</div>
					<div className="bg-white px-4 py-4 flex my-2 rounded-lg shadow flex-col gap-2">


						<div >
							<h2 className="text-base font-bold text-gray-700 my-0"></h2>
						</div>
						<div className='grid grid-cols-2'>
							<div className='text-sm font-bold mt-2'>
								Company Name
							</div>
							<div className='text-gray-500 text-sm mt-2'>
								ABC Pvt Ltd
							</div>
							<div className='text-sm font-bold mt-2'>
								Stipend Low
							</div>
							<div className='text-gray-500 text-sm mt-2'>
								12 Lakhs per annum
							</div>
							<div className='text-sm font-bold mt-2'>
								Stipend High
							</div>
							<div className='text-gray-500 text-sm mt-2'>
								15 Lakhs per annum
							</div>
							<div className='text-sm font-bold mt-2'>
								Deadline to apply
							</div>
							<div className='text-red-500 text-sm mt-2 flex gap-3'>
								<div>
									05-Sept-2021, 11:55 hrs (already passed)
								</div>
								<div className='bg-red-500 w-56 text-center hover:bg-red-700 text-white font-medium text-sm py-1 px-2 rounded'>
									Extend Deadline
								</div>


							</div>

							<div className='text-sm font-bold mt-2'>
								Number of interview rounds scheduled
							</div>
							<div className='text-gray-500 text-sm mt-2'>
								4 (3 Technical + 1 HR)
							</div>
							<div className='text-sm font-bold mt-2'>
								Profile Description
							</div>
							<div className='text-gray-500 text-sm mt-2'>
								Minimum qualifications:
								<br />

								• Bachelor's degree in Computer Science, a related technical field, or equivalent practical experience.
								<br />
								• Experience in the media industry, including television and video technologies.
								<br />
								• Experience working with programs or scripts written in C++, Go, Java, and/or Python.
								<br />
								• Experience in a technical and client/partner facing role.
								<br />
								<br />

								Preferred qualifications:

								<br />
								•Experience working with data analysis and SQL queries.
								<br />
								•Experience troubleshooting web technologies such as XML, HTML, and JavaScript.
								<br />
								•Excellent communication and analytical skills and outstanding organizational, prioritization, and multitasking skills.
								<br />
							</div>


						</div>


						<div className='flex gap-3'>
							{access_role === 'ADMIN' ?
								<>
									<div className='bg-blue-500 w-56 text-center hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded'>
										Export applied students data to excel
									</div>

									<div className='bg-indigo-500 w-56 text-center hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded'>
										Shortlist students for next round
									</div>

								</> : null
							}
							{/* <div className='bg-blue-500 w-56 text-center hover:bg-blue-700 text-white font-medium text-sm py-2 px-4 rounded'>
									Apply for the job
								</div> */}
						</div>
					</div>


				</div>
			</Layout>
		</div>

	)
}

export default withAuth(AdminDash);
