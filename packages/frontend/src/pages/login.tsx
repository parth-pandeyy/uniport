import HeadMeta from "../components/HeadMeta/HeadMeta";
import NonAuthNavbar from "../components/NonAuthNavbar/NonAuthNavbar";
import * as Yup from 'yup';
import Image from 'next/image';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { loginExistingUser } from "../graphql/LoginExistingUser";
import withNoAuth from "../HOC/withNoAuth";
import router from "next/router";


type loginFormFields = {
	email_address: string,
	password: string,
}


const initialValues: loginFormFields = {
	email_address: '',
	password: '',
}

const formValidationSchema = Yup.object().shape({
	email_address: Yup.string().email().required(),
	password: Yup.string().min(6).required('Please enter the password'),
});

const Login = () => {

	const [mutationFn, { data, loading: waitingForServerResponse, error }] = useMutation(loginExistingUser);
	const handleSubmit = async (e) => {
		await mutationFn({
			variables: {
				...e
			}
		})
	}

	if(data){
		router.push('/dash/');
		return null;
	}

	return (
		<div>
			<HeadMeta title='Uniport | Login' />
			<NonAuthNavbar />
			<div className='main-container w-full pt-4 overflow-y-scroll'>
				<div className="mx-auto p-4 max-w-md shadow-md rounded-md text-left">
					<div className='text-gray-700 text-3xl font-semibold text-center'>
						Login
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
									Email address
								</label>
								<Field name='email_address'
									type='email'
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
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='password'>
									Password
								</label>
								<Field name='password'
									type='password'
									id='password'
									autoComplete='off'
									placeholder='*******'
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								/>
								<p className="text-red-500 text-xs mt-1">
									<ErrorMessage name='password' />
								</p>
							</div>

							<div className="flex items-center justify-between">
								<button type="submit"
									disabled={waitingForServerResponse}
									className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
							</div>
						</Form>
					</Formik>



					<div className='border border-t-1 mt-2'></div>

					<div className="w-full">
						<button
							className="w-full flex rounded-2xl gap-3 bg-red-600 hover:bg-red-800 text-white font-bold mt-5 mb-3 py-2 px-4 focus:outline-none focus:shadow-outline"
							type="button"
						>
							<Image src={require('../assets/images/google-logo.svg')} height={25} width={25} />
							<div>
								Login with Google
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}




export default withNoAuth(Login);

