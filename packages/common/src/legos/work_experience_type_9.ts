

// resume_type_11

import { BaseInputPayload } from "./";
import { verification_info } from "./verification_info";

type work_experience_type_9_BASE = {
	company_name: string,
	job_title: string,
	location: string,
	position_type: string,
	job_start_date: string,
	job_end_date: string,
	details: string,
}


// type of the resume data block which is sent by the backend
export type work_experience_type_9_DataBlock = {
	proof_file_url: string
	verification_info: verification_info
} & work_experience_type_9_BASE;



// schema of the form which the user needs to enter. (other fields will be automatically added)
export type work_experience_type_9_FormBlock = {
	block_proof_data: string
} & work_experience_type_9_BASE;



// type of the payload which needs to be sent to the backend to add a new resume
export type work_experience_type_9_InputPayload = {
// ! we need [attribute_type] for proper types
	attribute_type: 'work_experience_type_9',
} & work_experience_type_9_BASE & BaseInputPayload
