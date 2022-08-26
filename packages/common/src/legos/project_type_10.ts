

// resume_type_11

import { BaseInputPayload } from "./";
import { verification_info } from "./verification_info";

type project_type_10_BASE = {
	project_name: string,
	start_date: string,
	end_date: string,
	project_url: string,
	description: string,
}


// type of the resume data block which is sent by the backend
export type project_type_10_DataBlock = {
	proof_file_url: string
	verification_info: verification_info
} & project_type_10_BASE;



// schema of the form which the user needs to enter. (other fields will be automatically added)
export type project_type_10_FormBlock = {
	block_proof_data: string
} & project_type_10_BASE;



// type of the payload which needs to be sent to the backend to add a new resume
export type project_type_10_InputPayload = {
	// ! we need [attribute_type] for proper types at server end
	attribute_type: 'project_type_10',
} & project_type_10_BASE & BaseInputPayload
