import HeadMeta from "../../../../components/HeadMeta/HeadMeta";
import Layout from "../../../../components/AuthLayout/Layout";
import * as Yup from 'yup';
import { useMutation } from "@apollo/client";
import { POWER_MUTATION } from "../../../../graphql/PowerMutation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import dayjs from "dayjs";



type loginFormFields = {
	company_name: string,
	stipend_low: number,
	stipend_high: number,
	stipend_breakdown: string,
	deadline: Date,
	filters: string,
	password: string,
	profile_description: string
}



const initialValues: loginFormFields = {
	company_name: '',
	stipend_low: 10,
	stipend_high: 10,
	stipend_breakdown: '',
	deadline: dayjs().add(1, 'day').toDate(),
	filters: '',
	password: '',
	profile_description: ''
}


const formValidationSchema = Yup.object().shape({
	email_address: Yup.string().email().required(),
	password: Yup.string().min(6).required('Please enter the password'),
});



const AddProfilesInCamp = () => {
	const [mutationFn, { data, loading: waitingForServerResponse, error }] = useMutation(POWER_MUTATION);
	const handleSubmit = async (e) => {
		await mutationFn({
			variables: {
				...e
			}
		})
	}



	return (
		<div>
			<HeadMeta title='Uniport | Campaign Add Profile' />
			<Layout>
				<div className='p-10'>
					<div className="mx-auto p-4 max-w-lg shadow-md rounded-md text-left">
						<div className='text-gray-700 text-3xl font-semibold text-center mb-4'>
							Add a Job Profile
						</div>

						{error ?
							<div className='my-3 text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 flex items-center p-4 rounded-md'>
								{error.message}
							</div> : null}


						{/* Actual Form */}
						<Formik
							initialValues={initialValues}
							validationSchema={formValidationSchema}
							onSubmit={handleSubmit}
						>

							<Form className='text-black' autoComplete='off'>

								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='email_address'>
										Company Name
									</label>
									<Field name='company_name'
										type='text'
										id='company_name'
										autoComplete='off'
										placeholder='ABC Pvt Ltd'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='company_name' />
									</p>
								</div>


								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='stipend_low'>
										Stipend Low (in Lakhs per annum)
									</label>
									<Field name='stipend_low'
										type='text'
										id='stipend_low'
										autoComplete='off'
										placeholder='100'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='stipend_low' />
									</p>
								</div>

								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='stipend_high'>
										Stipend High (in Lakhs per annum)
									</label>
									<Field name='stipend_high'
										type='text'
										id='stipend_high'
										autoComplete='off' placeholder='100'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='stipend_high' />
									</p>
								</div>

								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='stipend_breakdown'>
										Stipend Breakdown
									</label>
									<Field name='stipend_breakdown'
										type='textarea'
										id='stipend_breakdown'
										autoComplete='off'
										placeholder='ESOPs: ...., Base: ....'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='stipend_breakdown' />
									</p>
								</div>

								{/* <div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='filters'>
										Filters (newlines separated)
									</label>
									<Field name='filters'
										type='textarea'
										id='filters'
										autoComplete='off'
										placeholder='attribute_id [operator] [threshold_value] [prefix_multiplier]'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='filters' />
									</p>
								</div> */}

								<AddFilteringFormikField />

								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='deadline'>
										Deadline									</label>
									<Field name='deadline'
										type='date'
										id='deadline'
										autoComplete='off'
										placeholder='ABC Pvt Ltd'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='deadline' />
									</p>
								</div>
								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='profile_description'>
										Profile Description
									</label>
									<Field name='profile_description'
										as='textarea'
										id='profile_description'
										autoComplete='off'
										placeholder='Require a Computer Science Graduate...'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='profile_description' />
									</p>
								</div>

								<p className="my-2 text-sm text-left text-purple-600 bg-purple-500 bg-opacity-10 border border-purple-400  px-2 py-1 rounded-md">
									Note: On clicking submit all eligible students will be sent notification via mail.
								</p>
								<div className="flex items-center justify-between">
									<button type="submit"
										disabled={waitingForServerResponse}
										className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
										Add the job profile
									</button>

								</div>
							</Form>
						</Formik>

					</div>

				</div>
			</Layout>
		</div>
	)
}

export default AddProfilesInCamp;


export const AddFilteringFormikField = () => {
	return (
		<div className="mb-4">
			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='filters'>
				Filters (newlines separated)
			</label>
			<Field name='filters'
				as='textarea'
				id='filters'
				autoComplete='off'
				placeholder='attribute_id [operator] [threshold_value] [..]'
				rows={4}
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			/>
			<p className="my-2 text-sm text-left text-blue-600 bg-blue-500 bg-opacity-10 border border-blue-400  px-2 py-1 rounded-md">
				<span className='font-bold'>Valid operators:</span> [$gte | $gt | $lt | | $lte] for [greater than and equal to, greater than, less than, less than and equal to respectively]
			</p>
			<p className="text-red-500 text-xs mt-1">
				<ErrorMessage name='filters' />
			</p>
		</div>
	)
}
