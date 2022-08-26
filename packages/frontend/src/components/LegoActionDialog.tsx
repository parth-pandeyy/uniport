

// component which shows the modal and asks the user to add a rule to the [campaign_id] passed as parameter

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import GenericModal from "./GenericModal/GenericModal";



type FormSchemaInstanceType = {
	"label": string,
	"type": string
	"id": string
	"placeholder": string,
	"additionalEntries"?: Object
}

// have put [any] instead of [AddStudentProfileDefinitionsInput] as [options] is a string and not an array
const LEGOActionDialog = ({ setOpen, open, initialValues, title, formSchema, submitBtnText, handleSubmit, loading, errorMessage, success }: {
	title: string,
	setOpen: Dispatch<SetStateAction<boolean>>,
	open: boolean,
	initialValues: any,
	formSchema: FormSchemaInstanceType[],
	submitBtnText?: string,
	handleSubmit: any,
	errorMessage: string,
	loading: boolean,
	success: boolean,
}) => {
	// TODO: make the data as null in consecutive renders. Currently it retains that data is true
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
												{title}
											</div>

											<div>
												{errorMessage ?
													<div className='my-3 text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 flex items-center p-4 rounded-md'>
														{errorMessage}
													</div> : null}
												{success ?
													<div className='my-3 text-sm text-left text-green-600 bg-green-500 bg-opacity-10 border border-green-400 flex items-center p-4 rounded-md'>
														Block added successfully
													</div> : null}


												{formSchema.map((e, indx) => {
													return (
														<div className="mb-4" key={indx}>
															<div className='grid grid-cols-2 items-center my-2'>
																<label className="block text-gray-700 text-sm font-bold" htmlFor={e.id}>
																	{e.label}
																</label>
																<Field
																	id={e.id}
																	type={e.type}
																	name={e.id}
																	{...e.additionalEntries}
																	placeholder={e.placeholder}
																	required={true}
																	className='shadow appearance-none border rounded text-sm w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
																/>
																<p className="text-red-500 text-xs mt-1">
																	<ErrorMessage name={e.id} />
																</p>
															</div>
														</div>
													)
												})}
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
												className="w-full inline-flex disabled:bg-red-400 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
												disabled={loading}
											>
												{submitBtnText ?? 'Submit'}
											</button>
											<button
												type="button"
												className="mt-3 w-full inline-flex  justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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



export default LEGOActionDialog;
