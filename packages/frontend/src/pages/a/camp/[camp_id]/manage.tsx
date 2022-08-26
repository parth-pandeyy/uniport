import { useMutation, useQuery } from "@apollo/client"
import HeadMeta from "../../../../components/HeadMeta/HeadMeta"
import Layout from "../../../../components/AuthLayout/Layout"
import { FETCH_CAMPAIGN_DETAILS_BY_ID } from "../../../../graphql/FetchCampaignData"
import { useRouter } from 'next/router';
import GenericModal from "../../../../components/GenericModal/GenericModal";
import { Dispatch, SetStateAction, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { INVITE_NEW_USERS_TO_CAMPAIGN_MUTATION } from "../../../../graphql/InviteNewUsersToCampaign";
import { AddFilteringFormikField } from "./addprofile";

const ManageCampaign = () => {
	const router = useRouter();

	let { camp_id } = router.query;

	// TODO: Initially camp_id remains undefined. But we still call /graphql/; How to fix it?


	let { data, loading, error } = useQuery(FETCH_CAMPAIGN_DETAILS_BY_ID, {
		variables: {
			campaign_id: camp_id
		}
	});

	const [showAddNewRuleModal, setshowAddNewRuleModal] = useState(false)

	return (
		<div>
			<HeadMeta title='Uniport | Manage Campaign' />
			<Layout>
				<div className='p-10'>

					{loading ? <div>Loading Campaign Details</div> : null}
					{error ? <div>Something went wrong: {error.message}</div> : null}


					{data ? <div className='bg-white shadow overflow-hidden sm:rounded-lg px-3 py-5'>
						<div className='text-2xl font-bold leading-normal mt-0 mb-3 text-purple-800'>
							Manage Campaign
						</div>
						<div className='my-3 text-sm text-left text-blue-600 bg-blue-500 bg-opacity-10 border border-blue-400  p-4 rounded-md'>
							<span className='text-blue-800 font-medium'>Note on campaign rules:</span> <span>
								Typically you should all those rules which are part of the college placement policy.
								Please note that whenever you add a new rule it applies to all future job profiles in the campaign.
								Incase you wish to add some rules for specific job profiles kindly add that while defining the job profile.
							</span>
						</div>
						<div className="border-t border-gray-200">
							<dl>
								<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">Campaign Name</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data.getCampaignDetailsById.campaign_name}</dd>
								</div>
							</dl>
							<dl>
								<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">Campaign Rules</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.getCampaignDetailsById.rules.length ? data.getCampaignDetailsById.rules.map(e => {
											return (
												<div>
													{JSON.stringify(e)}
												</div>
											)
										}) : <div>No rules found</div>}
									</dd>
								</div>
							</dl>
						</div>


						{showAddNewRuleModal ? <AddNewRuleModal open={showAddNewRuleModal} setOpen={setshowAddNewRuleModal} campaign_id={camp_id as string} /> : null}



						<div className='flex justify-end'>
							<div onClick={() => setshowAddNewRuleModal(true)} className='btn bg-blue-500 mt-2  hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded'>
								Add new rule
							</div>
						</div>

						<InviteUsers camp_id={camp_id} />
					</div> : null}
				</div>
			</Layout>
		</div>
	)
}

export default ManageCampaign;


// component which shows the modal and asks the user to add a rule to the [campaign_id] passed as parameter
const AddNewRuleModal = ({ campaign_id, setOpen, open }: { campaign_id: string, setOpen: Dispatch<SetStateAction<boolean>>, open: boolean }) => {
	const initialValues = {
		rules: '',
	}
	const handleSubmit = (e) => {

	}
	return (
		<div>
			<GenericModal
				setOpen={setOpen}
				open={open}>
				<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div className="sm:flex sm:items-start">
						<div>
							<div className='text-xl mb-4 font-medium'>
								Add a new rule
							</div>
							<Formik
								initialValues={initialValues}
								// validationSchema={formValidationSchema}
								onSubmit={handleSubmit}
							>
								<AddFilteringFormikField />
							</Formik>

						</div>
					</div>
				</div>

				{/* ACTION BUTTON GOES HERE */}
				<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
					<button
						type="button"
						className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
						onClick={() => setOpen(false)}
					>
						Add rule
					</button>
					<button
						type="button"
						className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						onClick={() => setOpen(false)}
					>
						Cancel
					</button>
				</div>

			</GenericModal>
		</div>
	)
}



const InviteUsers = ({ camp_id }) => {

	const [mutationFn, { data, loading, error }] = useMutation(INVITE_NEW_USERS_TO_CAMPAIGN_MUTATION);
	const handleSubmit = async (e) => {
		// TODO: check that individual mails are valid
		let emails = [];
		e.user_emails.split(/[\s]+/).map((text: string) => {
			// validation will be done at server
			if (text) emails.push(text);
		})

		await mutationFn({
			variables: {
				payload: {
					user_emails: emails,
					campaign_id: camp_id,
					access_role: e.access_role,
				}
			}
		})
	}
	return (
		<>
			<div className='font-bold text-xl mt-7 mb-3'>
				Invite User
			</div>

			{error ? <div className='my-3 text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 flex items-center p-4 rounded-md'>Something went wrong: {error.message}</div> : null}
			{data ? <div className='my-3 text-sm text-left text-green-600 bg-green-500 bg-opacity-10 border border-green-400 flex items-center p-4 rounded-md'>Users added successfully</div> : null}

			<Formik
				initialValues={{ access_role: 'ADMIN', user_emails: '' }}
				// validationSchema={formFieldsValidationSchema}
				onSubmit={handleSubmit}
			>

				<Form className='text-black' autoComplete='off' >
					<div className="mb-4 flex items-center justify-start gap-7">
						<label htmlFor="access_role">Access Role:</label>
						<Field
							component="select"
							id="access_role"
							name="access_role"
							className='outline-none border-2 px-1 text-sm rounded-lg border-gray-300'
						>
							<option value="ADMIN">ADMIN</option>
							<option value="STUDENT">STUDENT</option>
						</Field>
						<p className="text-red-500 text-xs mt-1">
							<ErrorMessage name='access_role' />
						</p>
					</div>

					<Field
						component="textarea"
						id="user_emails"
						name="user_emails"
						rows={4}
						placeholder='Please enter all emails newline or space separated'
						className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
					>
					</Field>
					{/* <textarea className="" rows={4}></textarea> */}

					<div className="flex items-center justify-end">
						<button type="submit"
							disabled={loading}
							className="btn bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send Invite</button>
					</div>
				</Form>
			</Formik>
		</>
	)
}
