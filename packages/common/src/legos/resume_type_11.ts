

// resume_type_11

import { BaseInputPayload } from "./";
import { verification_info } from "./verification_info";

type resume_type_11_BASE = {
	file_name: string
}

// type of the resume data block which is sent by the backend
export type resume_type_11_DataBlock = {
	resume_file_url: string;
	// since verification data will be sent only by server; Students while adding won't do it
	verification_info: verification_info;
} & resume_type_11_BASE;


// schema of the form which the user needs to enter. (other fields will be automatically added)
export type resume_type_11_FormBlock = {
	resume_file_data: string;
} & resume_type_11_BASE;


// type of the payload which needs to be sent to the backend to add a new resume
export type resume_type_11_InputPayload = {
// ! we need [attribute_type] for proper types
	attribute_type: 'resume_type_11',
} & resume_type_11_FormBlock & BaseInputPayload

