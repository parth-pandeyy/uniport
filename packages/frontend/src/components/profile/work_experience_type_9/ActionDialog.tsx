import { resume_type_11_FormBlock, work_experience_type_9_FormBlock } from "@uniport/common"
import { ErrorMessage, Field, Form, Formik, useField } from "formik"
import GenericModal from "../../GenericModal/GenericModal"
import { ActionDialogType } from "../Utils/ActionDialogType"
import { FormBlockDateInput } from "../Utils/FormBlocks/FormBlockDateInput"
import { FormBlockFileInput } from "../Utils/FormBlocks/FormBlockFileInput"
import { FormBlockSingleSelect } from "../Utils/FormBlocks/FormBlockSingleSelect"
import { FormBlockTextAreaInput } from "../Utils/FormBlocks/FormBlockTextAreaInput"
import { FormBlockTextInput } from "../Utils/FormBlocks/FormBlockTextInput"


type WorkExpActionDialogType = ActionDialogType<work_experience_type_9_FormBlock>


export const WorkExperienceType9ActionDialog = ({ setOpen, open, waitingForServerResponse, initialValues, handleSubmit, errorMessage, successMessage }: WorkExpActionDialogType) => {
	return (
		<GenericModal
			setOpen={setOpen}
			open={open}
		>
			<div>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
				>
					<Form className='text-black' autoComplete='off' encType='multipart/form-data'>
						<div>
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									{/* Main content */}
									<div>
										<div className='text-xl font-medium mb-5'>
											Add Work Experience
										</div>

										<div>
											{errorMessage ?
												<div className='my-3 text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 flex items-center p-4 rounded-md'>
													{errorMessage}
												</div> : null}
											{successMessage ?
												<div className='my-3 text-sm text-left text-green-600 bg-green-500 bg-opacity-10 border border-green-400 flex items-center p-4 rounded-md'>
													{successMessage}
												</div> : null}

											<FormBlockTextInput
												id='company_name'
												placeholder='Uniport LLC'
												label='Company Name'
											/>


											<FormBlockTextInput
												id='job_title'
												placeholder='Student Developer'
												label='Job Title'
											/>

											{/* Positon Type */}
											<FormBlockSingleSelect
												id='position_type'
												label='Position Type'
												options={[
													{ value: 'FULL_TIME', label: 'Full Time' },
													{ value: 'PART_TIME', label: 'Part Time' }
												]}
											/>

											<FormBlockTextInput
												id='location'
												placeholder='Delhi'
												label='Location'
											/>

											<FormBlockDateInput
												id='job_start_date'
												label='Job Start Date'
											/>

											<FormBlockDateInput
												id='job_end_date'
												label='Job End Date'
											/>

											<FormBlockTextAreaInput
												id='details'
												label='Details'
												placeholder='..'
											/>

											<FormBlockFileInput id='block_proof_data' label='Proof' />
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
											disabled={waitingForServerResponse}
										>
											Submit
										</button>
										<button
											type="button"
											className="mt-3 w-full inline-flex  justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
											onClick={() => setOpen(false)}
											disabled={waitingForServerResponse}
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
	)
}
