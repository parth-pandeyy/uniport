

// resume_type_11

import { BaseInputPayload } from "./";
import { verification_info } from "./verification_info";

type address_type_5_BASE = {
	country: string,
	pincode: string,
	state: string,
	district: string,
	city: string,
	address_line: string,
}


// type of the resume data block which is sent by the backend
export type address_type_5_DataBlock = {
	proof_file_url: string
	verification_info: verification_info
} & address_type_5_BASE;



// schema of the form which the user needs to enter. (other fields will be automatically added)
export type address_type_5_FormBlock = {
	block_proof_data: string
} & address_type_5_BASE;



// type of the payload which needs to be sent to the backend to add a new resume
export type address_type_5_InputPayload = {
	// ! we need [attribute_type] for proper types at server end
	attribute_type: 'address_type_5',
} & address_type_5_BASE & BaseInputPayload
