import { ErrorMessage, Field, Form, Formik } from "formik";
import HeadMeta from "../../../components/HeadMeta/HeadMeta";
import Layout from "../../../components/AuthLayout/Layout";
import * as Yup from 'yup';
import { useMutation } from "@apollo/client";
import { CREATE_A_NEW_CAMPAIGN } from "../../../graphql/CreateANewCampaign";
import Router from "next/router";
import { MANAGE_CAMP } from "../../../config/routes-config";


type FormFields = {
	campaign_name: string,
}

const initialValues = {
	campaign_name: "",
}

const formValidationSchema = Yup.object().shape({
	campaign_name: Yup.string().required().min(4)
})


const CreateNewCampaign = () => {

	const [mutationFn, { data, loading: waitingForServerResponse, error }] = useMutation(CREATE_A_NEW_CAMPAIGN);
	const handleSubmit = async (e: FormFields) => {
		await mutationFn({
			variables: {
				...e
			}
		})
	}


	if(data){
		// new campaign creation was successful
		Router.push(MANAGE_CAMP(data.createANewCampaign.campaign_id));
		return null;
	}


	return (
		<div>
			<HeadMeta title='Uniport | Create new Campaign' />
			<Layout>
				<div className='p-10'>
					<div className='w-full mt-4'>
						<div className="mx-auto p-4 max-w-md shadow-md rounded-md text-left">
							<div className='text-gray-700 text-xl font-semibold text-center mb-4'>
								Create a new campaign
							</div>

							{error ?
								<div className='my-3 text-sm text-left text-purple-600 bg-purple-500 bg-opacity-10 border border-purple-400 flex items-center p-4 rounded-md'>
									{error.message}
								</div> : null}

							<Formik
								initialValues={initialValues}
								validationSchema={formValidationSchema}
								onSubmit={handleSubmit}
							>

								<Form className='text-black' autoComplete='off'>

									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='campaign_name'>
											Campaign Name
										</label>
										<Field name='campaign_name'
											type='text'
											id='campaign_name'
											autoComplete='off'
											placeholder='Internship Drive 2k22'
											className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
										/>
										<p className="text-red-500 text-xs mt-1">
											<ErrorMessage name='campaign_name' />
										</p>
									</div>

									<div className="flex items-center justify-between">
										<button type="submit"
											disabled={waitingForServerResponse}
											className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
									</div>
								</Form>
							</Formik>

						</div>
					</div>
					{/* </d */}
				</div>
			</Layout>
		</div>
	)

}





export default CreateNewCampaign;
