

// resume_type_11

import { BaseInputPayload } from "./";
import { verification_info } from "./verification_info";

type single_select_type_3_BASE = {
	value: string,
}


// type of the resume data block which is sent by the backend
export type single_select_type_3_DataBlock = {
	proof_file_url: string
	verification_info: verification_info
} & single_select_type_3_BASE;



// schema of the form which the user needs to enter. (other fields will be automatically added)
export type single_select_type_3_FormBlock = {
	block_proof_data: string
} & single_select_type_3_BASE;



// type of the payload which needs to be sent to the backend to add a new resume
export type single_select_type_3_InputPayload = {
	// ! we need [attribute_type] for proper types at server end
	attribute_type: 'single_select_type_3',
} & single_select_type_3_BASE & BaseInputPayload
