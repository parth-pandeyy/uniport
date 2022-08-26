

// resume_type_11

import { BaseInputPayload } from "./";
import { verification_info } from "./verification_info";

type current_course_type_7_BASE = {
	specialization: string,
	institute_roll: string,
	program: string,
	course_start_date: string,
	course_end_date: string,
	percent_score: number,
	description: string,
}


// type of the resume data block which is sent by the backend
export type current_course_type_7_DataBlock = {
	proof_file_url: string
	verification_info: verification_info
} & current_course_type_7_BASE;



// schema of the form which the user needs to enter. (other fields will be automatically added)
export type current_course_type_7_FormBlock = {
	block_proof_data: string
} & current_course_type_7_BASE;



// type of the payload which needs to be sent to the backend to add a new resume
export type current_course_type_7_InputPayload = {
	// ! we need [attribute_type] for proper types at server end
	attribute_type: 'current_course_type_7',
} & current_course_type_7_BASE & BaseInputPayload
