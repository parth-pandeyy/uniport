

// resume_type_11

import { BaseInputPayload } from "./";
import { verification_info } from "./verification_info";

type email_type_6_BASE = {
	value: string,
}


// type of the resume data block which is sent by the backend
export type email_type_6_DataBlock = {
	proof_file_url: string
	verification_info: verification_info
} & email_type_6_BASE;



// schema of the form which the user needs to enter. (other fields will be automatically added)
export type email_type_6_FormBlock = {
	block_proof_data: string
} & email_type_6_BASE;



// type of the payload which needs to be sent to the backend to add a new resume
export type email_type_6_InputPayload = {
	// ! we need [attribute_type] for proper types at server end
	attribute_type: 'email_type_6',
} & email_type_6_BASE & BaseInputPayload
