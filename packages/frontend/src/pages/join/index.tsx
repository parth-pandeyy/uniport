import HeadMeta from "../../components/HeadMeta/HeadMeta";
import NonAuthNavbar from "../../components/NonAuthNavbar/NonAuthNavbar";
import React from 'react';
import { useMutation } from "@apollo/client";
import { RegisterAdminInputForm, registerAdminInputFormValidationSchema, User } from '@uniport/common';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from 'next/router'
import { ADMIN_PRIMARY_DASHBOARD } from "../../config/routes-config";
import { registerAdminMutation } from "../../graphql/RegisterAdminMutation";
import withNoAuth from "../../HOC/withNoAuth";
import Link from 'next/link';


const initialValues: RegisterAdminInputForm = {
	first_name: '',
	last_name: '',
	email_address: '',
	password: '',
	password_confirm: '',
	org_name: '',
}

// For admin

const RegisterAdmin = () => {

	// NOTE: Unlike useQuery, useMutation doesn't execute its operation automatically on render. Instead, you call this mutate function.
	const [mutateFunction, { data, loading: waitingForServerResponse, error }] = useMutation<{ registerAdmin: User }>(registerAdminMutation);
	const router = useRouter();

	// submit handler
	const handleSubmit = async (e: RegisterAdminInputForm) => {
		try {
			let { password_confirm, ...payload } = e;
			await mutateFunction({
				variables: {
					registerAdminPayload: payload,
				}
			}
			);

		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	}

	if (data && data.registerAdmin) {
		// redirecting
		console.log("Successfully registered");
		router.push(ADMIN_PRIMARY_DASHBOARD)
	}


	return (
		<div>
			<HeadMeta title='Uniport | Join the Club' />
			<NonAuthNavbar />
			<div className='main-container w-full pt-4 overflow-y-scroll pb-20'>
				<div className="mx-auto p-4 max-w-md shadow-md rounded-md text-left">
					<div className='text-gray-700 text-3xl font-semibold text-center'>
						Join Uniport
					</div>

					<div className='my-3 text-sm text-left text-purple-600 bg-purple-500 bg-opacity-10 border border-purple-400 flex items-center p-4 rounded-md' role="alert">
						Please note that this registration form is only for institute admins. Incase you are a student and wish to register yourself on the portal, you shall ask for an invite from your institute admin.
					</div>

					{error ?
						<div className='my-3 text-sm text-left text-purple-600 bg-purple-500 bg-opacity-10 border border-purple-400 flex items-center p-4 rounded-md'>
							{error.message}
						</div> : null}

					{/* Actual Form */}
					<div>
						<Formik
							initialValues={initialValues}
							validationSchema={registerAdminInputFormValidationSchema}
							onSubmit={handleSubmit}
						>

							<Form className='text-black' autoComplete='off'>
								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='first_name'>
										First Name
									</label>
									<Field name='first_name' type='text'
										id='first_name'
										autoComplete='off'
										placeholder='Steve'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='first_name' />
									</p>
								</div>


								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='last_name'>
										Last Name
									</label>
									<Field name='last_name' type='text'
										id='last_name'
										autoComplete='off'
										placeholder='Kurt'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='last_name' />
									</p>
								</div>

								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='email_address'>
										Email Address
									</label>
									<Field name='email_address' type='email'
										id='email_address'
										autoComplete='off'
										placeholder='steve@mail.com'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='email_address' />
									</p>
								</div>

								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='org_name'>
										Organization Name
									</label>
									<Field name='org_name' type='text'
										id='org_name'
										autoComplete='off'
										placeholder='Royal'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='org_name' />
									</p>
								</div>


								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='password'>
										Password
									</label>
									<Field name='password' type='password'
										id='password'
										autoComplete='off'
										placeholder='*******'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='password' />
									</p>
								</div>


								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='password_confirm'>
										Password Confirm
									</label>
									<Field name='password_confirm' type='password'
										id='password_confirm'
										autoComplete='off'
										placeholder='*******'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p className="text-red-500 text-xs mt-1">
										<ErrorMessage name='password_confirm' />
									</p>
								</div>

								<div className="flex items-center justify-between">
									<button type="submit" disabled={waitingForServerResponse} className="bg-blue-500 disabled:bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Join Uniport</button>
								</div>
							</Form>

						</Formik>

						<hr className='mt-2 mb-4' />

						<div className='flex gap-4 items-center'>
							Got an invite?
							<Link href='/join/invited/'>
							<button type="submit" disabled={waitingForServerResponse} className="bg-indigo-500 disabled:bg-indigo-300 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Join with Invite</button>
							</Link>
						</div>

					</div>

				</div>
			</div>
		</div >
	)
}




export default withNoAuth(RegisterAdmin);

