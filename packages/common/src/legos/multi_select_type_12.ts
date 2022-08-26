

// resume_type_11

import { BaseInputPayload } from "./";
import { verification_info } from "./verification_info";

// Here the base is empty. Since from server we shall send data in array form
// but from client we shall receive data as a string (as we are using formData)
type multi_select_type_12_BASE = {
}


// type of the resume data block which is sent by the backend
export type multi_select_type_12_DataBlock = {
	value: string[],
	proof_file_url: string
	verification_info: verification_info
} & multi_select_type_12_BASE;



// schema of the form which the user needs to enter. (other fields will be automatically added)
export type multi_select_type_12_FormBlock = {
	value: string[],
	block_proof_data: string
} & multi_select_type_12_BASE;



// type of the payload which needs to be sent to the backend to add a new resume
export type multi_select_type_12_InputPayload = {
	// ! we need [attribute_type] for proper types at server end
	attribute_type: 'multi_select_type_12',
	// it should be JSON based separated;
	value: string,
} & multi_select_type_12_BASE & BaseInputPayload
