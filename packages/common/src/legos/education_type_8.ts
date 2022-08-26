

// resume_type_11

import { BaseInputPayload } from "./";
import { verification_info } from "./verification_info";

type education_type_8_BASE = {
	school: string,
	program: string,
	board: string,
	education_type: string,
	percent_score: number,
	course_start_date: string,
	course_end_date: string,
	description: string
}


// type of the resume data block which is sent by the backend
export type education_type_8_DataBlock = {
	proof_file_url: string
	verification_info: verification_info
} & education_type_8_BASE;



// schema of the form which the user needs to enter. (other fields will be automatically added)
export type education_type_8_FormBlock = {
	block_proof_data: string
} & education_type_8_BASE;



// type of the payload which needs to be sent to the backend to add a new resume
export type education_type_8_InputPayload = {
	// ! we need [attribute_type] for proper types at server end
	attribute_type: 'education_type_8',
} & education_type_8_BASE & BaseInputPayload
