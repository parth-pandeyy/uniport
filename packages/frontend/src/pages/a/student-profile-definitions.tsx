import { useMutation, useQuery } from "@apollo/client";
import { allSupportedLEGOs, LEGOIdToTypeName } from "@uniport/common";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import GenericModal from "../../components/GenericModal/GenericModal";
import HeadMeta from "../../components/HeadMeta/HeadMeta";
import Layout from "../../components/AuthLayout/Layout";
import { ADD_STUDENT_PROFILE_DEFINITIONS } from "../../graphql/AddStudentProfileDefinitions";
import { GET_STUDENT_PROFILE_DEFINITIONS } from "../../graphql/GetStudentProfileDefinitions";


const ManageStudentProfileDefinitions = () => {
	let { data, loading, error } = useQuery(GET_STUDENT_PROFILE_DEFINITIONS);
	const [showAddNewRuleModal, setshowAddNewRuleModal] = useState(false)

	return (
		<div>
			<HeadMeta title='Uniport | Manage Student Profile Definitions' />
			<Layout>
				<div className='p-10'>

					{loading ? <div className='my-3 text-sm text-left text-blue-600 bg-blue-500 bg-opacity-10 border border-blue-400 flex items-center p-4 rounded-md'>Loading Student Profile Definitions</div> : null}
					{error ? <div className='my-3 text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 flex items-center p-4 rounded-md'>Something went wrong: {error.message}</div> : null}


					{data ? <div className='bg-white shadow overflow-hidden sm:rounded-lg px-3 py-5 mx-auto max-w-2xl'>
						<div className='text-2xl font-bold leading-normal mt-0 mb-3 text-purple-800'>
							Manage Student Profile Definitions
						</div>
						<div className='my-3 text-sm text-left text-blue-600 bg-blue-500 bg-opacity-10 border border-blue-400  p-4 rounded-md'>
							Each of the following block maps to a profile element in the Student Profile.
							<br />
						</div>
						<div className='my-3 text-sm text-left text-indigo-600 bg-indigo-500 bg-opacity-10 border border-indigo-400  p-4 rounded-md'>
							The following options are nested inside the Edit Block button.
							<ul className='pl-2 pt-1'>
								<li>* Freeze the attribute: No further changes can be performed by students on the attribute</li>
								<li>* Mandate proofs</li>
								<li>* Toggle state from required</li>
								<li>* ..</li>
							</ul>
						</div>
						<div className='flex justify-end'>
							<div onClick={() => setshowAddNewRuleModal(true)} className='btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
								Add a new block
							</div>
						</div>

						<AddNewStudentDefinitionModal
							setOpen={setshowAddNewRuleModal}
							initialValues={{
								is_array: false,
								label: '',
								options: '',
								requires_proof: false,
								attribute_type: allSupportedLEGOs[0],
								required: true
							}}
							open={showAddNewRuleModal}
						/>

						<div className='border-gray-200'>

							{data.getStudentProfileDefinitions.map((e, indx) => {
								return (
									<div key={indx} className='bg-white shadow overflow-hidden sm:rounded-lg mb-4'>
										<div className="px-4 py-3 sm:px-6">
											<h3 className="text-base font-medium text-gray-900">Block {indx + 1}</h3>
										</div>
										<div className='bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<div className="text-sm font-medium text-gray-500">Registered Label</div>
											<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{e.label}</div>
										</div>
										<div className='bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<div className="text-sm font-medium text-gray-500">Attribute Type</div>
											<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{LEGOIdToTypeName[e.attribute_type]}</div>
										</div>
										<div className='bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<div className="text-sm font-medium text-gray-500">Is Blocked</div>
											<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{e.is_blocked ? "YES" : "NO"}</div>
										</div>
										{/*<div className='bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<div className="text-sm font-medium text-gray-500">is Array?</div>
											<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{e.is_array ? "YES" : "NO"}</div>
										</div>
										<div className='bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<div className="text-sm font-medium text-gray-500">Options</div>
											<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{e.options.length ? `[${e.options.map((d, indx) => `${d}${indx + 1 !== e.options.length ? ', ' : ''}`)}]` : "NA"}</div>
										</div>
										<div className='bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<div className="text-sm font-medium text-gray-500">Required Attribute</div>
											<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{e.required ? "YES" : "NO"}</div>
										</div>

										<div className='bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<div className="text-sm font-medium text-gray-500">Requires Proof</div>
											<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{e.requires_proof ? "YES" : "NO"}</div>
										</div> */}
										<div className='bg-white flex justify-end'>
											<div className='px-4 py-2 sm:px-6'>
												<div className='btn bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
													Edit Block
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>

					</div> : null}
				</div>

			</Layout>
		</div>

	)
}

export default ManageStudentProfileDefinitions;




// component which shows the modal and asks the user to add a rule to the [campaign_id] passed as parameter
// have put [any] instead of [AddStudentProfileDefinitionsInput] as [options] is a string and not an array
const AddNewStudentDefinitionModal = ({ setOpen, open, initialValues }: { setOpen: Dispatch<SetStateAction<boolean>>, open: boolean, initialValues: any }) => {
	// TODO: make the data as null in consecutive renders. Currently it retains that data is true
	const [mutationFn, { data, loading, error }] = useMutation(ADD_STUDENT_PROFILE_DEFINITIONS, {
		fetchPolicy: 'no-cache',
	});
	const handleSubmit = async (e: any) => {
		await mutationFn({
			variables: {
				payload: {
					...e,
					options: e.options.split(/[ ,]+/).filter(e => e !== '')
				}
			}
		})
	}


	// TODO: Add frontend validation
	return (
		<div>
			<GenericModal
				setOpen={setOpen}
				open={open}
			>
				<div>
					<Formik
						initialValues={initialValues}
						onSubmit={handleSubmit}
					>

						<Form className='text-black' autoComplete='off'>

							<div>
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">

										{/* Main content */}
										<div>
											<div className='text-xl font-medium mb-5'>
												Add a new student profile block
											</div>

											<div>
												{error ?
													<div className='my-3 text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 flex items-center p-4 rounded-md'>
														{error.message}
													</div> : null}
												{data ?
													<div className='my-3 text-sm text-left text-green-600 bg-green-500 bg-opacity-10 border border-green-400 flex items-center p-4 rounded-md'>
														Block added successfully
													</div> : null}


												<div className="mb-4">
													<div className='grid grid-cols-2 items-center my-2'>
														<label className="block text-gray-700 text-sm font-bold" htmlFor='attribute_type'>
															Attribute Type
														</label>
														<Field
															name='attribute_type'
															component='select'
															id='attribute_type'
															className='shadow border rounded text-sm w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
														>
															{/* {allSupportedLEGOs[11]} */}
															{allSupportedLEGOs.map(e => (
																<option value={e} key={e}>{LEGOIdToTypeName[e]}</option>
															))}

														</Field>
														<p className="text-red-500 text-xs mt-1">
															<ErrorMessage name='attribute_type' />
														</p>
													</div>

													<div className='grid grid-cols-2 items-center my-2'>
														<label className="block text-gray-700 text-sm font-bold" htmlFor='is_array'>
															Is array?
														</label>
														<Field
															type='checkbox'
															id='is_array'
															name='is_array'
															className='h-4 w-4 text-gray-700 border rounded mr-2'
														/>
														<p className="text-red-500 text-xs mt-1">
															<ErrorMessage name='is_array' />
														</p>
													</div>


													<div className='grid grid-cols-2 items-center my-2'>
														<label className="block text-gray-700 text-sm font-bold" htmlFor='required'>
															Is mandatory?
														</label>
														<Field
															type='checkbox'
															id='required'
															name='required'
															className='h-4 w-4 text-gray-700 border rounded mr-2'
														/>
														<p className="text-red-500 text-xs mt-1">
															<ErrorMessage name='required' />
														</p>
													</div>


													<div className='grid grid-cols-2 items-center my-2'>
														<label className="block text-gray-700 text-sm font-bold" htmlFor='label'>
															Attribute Label
														</label>
														<Field
															id='label'
															name='label'
															placeholder='Education (Class 12th)'
															className='shadow appearance-none border rounded text-sm w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
														/>
														<p className="text-red-500 text-xs mt-1">
															<ErrorMessage name='label' />
														</p>
													</div>


													<div className='grid grid-cols-2 items-center my-2'>
														<label className="block text-gray-700 text-sm font-bold" htmlFor='options'>
															Options (comma separated)
														</label>
														<Field
															id='options'
															name='options'
															placeholder='Male, Female'
															className='shadow appearance-none border rounded text-sm w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
														/>
														<p className="text-red-500 text-xs mt-1">
															<ErrorMessage name='options' />
														</p>
													</div>


													<div className='grid grid-cols-2 items-center my-2'>
														<label className="block text-gray-700 text-sm font-bold" htmlFor='requires_proof'>
															Requires proof?
														</label>
														<Field
															type='checkbox'
															id='requires_proof'
															name='requires_proof'
															className='h-4 w-4 text-gray-700 border rounded mr-2'
														/>
														<p className="text-red-500 text-xs mt-1">
															<ErrorMessage name='requires_proof' />
														</p>
													</div>


												</div>

											</div>


										</div>

									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">


									{/* ACTIONS */}
									<div>
										<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
											{/* ACTION BUTTON GOES HERE */}
											<button
												type="submit"
												className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
												disabled={loading}
											>
												Add a new block
											</button>
											<button
												type="button"
												className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
												onClick={() => setOpen(false)}
												disabled={loading}
											>
												Cancel
											</button>
										</div>
									</div>

								</div>
							</div>
						</Form>
					</Formik>
				</div>


			</GenericModal>

		</div>
	)
}

