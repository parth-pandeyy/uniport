

// resume_type_11

import { BaseInputPayload } from "./";
import { verification_info } from "./verification_info";

type phone_number_type_4_BASE = {
	country_code: string,
	ph_number: string,
}


// type of the resume data block which is sent by the backend
export type phone_number_type_4_DataBlock = {
	proof_file_url: string
	verification_info: verification_info
} & phone_number_type_4_BASE;



// schema of the form which the user needs to enter. (other fields will be automatically added)
export type phone_number_type_4_FormBlock = {
	block_proof_data: string
} & phone_number_type_4_BASE;



// type of the payload which needs to be sent to the backend to add a new resume
export type phone_number_type_4_InputPayload = {
	// ! we need [attribute_type] for proper types at server end
	attribute_type: 'phone_number_type_4',
} & phone_number_type_4_BASE & BaseInputPayload
