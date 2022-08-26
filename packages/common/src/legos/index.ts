export * from './date_type_1';
export * from './number_type_2';
export * from './single_select_type_3';
export * from './phone_number_type_4';
export * from './address_type_5';
export * from './email_type_6';
export * from './current_course_type_7';
export * from './education_type_8';
export * from './work_experience_type_9';
export * from './project_type_10';
export * from './resume_type_11';
export * from './multi_select_type_12';


export * from './validators';
export * from './definitions';


export type BaseInputPayload = {
	attribute_id: string,
	block_index?: string,
	student_id: string,
}
