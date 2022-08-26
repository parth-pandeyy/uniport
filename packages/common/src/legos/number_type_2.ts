

// resume_type_11

import { BaseInputPayload } from "./";
import { verification_info } from "./verification_info";

type number_type_2_BASE = {
	value: string,
}


// type of the resume data block which is sent by the backend
export type number_type_2_DataBlock = {
	proof_file_url: string
	verification_info: verification_info
} & number_type_2_BASE;



// schema of the form which the user needs to enter. (other fields will be automatically added)
export type number_type_2_FormBlock = {
	block_proof_data: string
} & number_type_2_BASE;



// type of the payload which needs to be sent to the backend to add a new resume
export type number_type_2_InputPayload = {
	// ! we need [attribute_type] for proper types at server end
	attribute_type: 'number_type_2',
} & number_type_2_BASE & BaseInputPayload
