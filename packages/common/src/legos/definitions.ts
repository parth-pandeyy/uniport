

// We current support the following legos!

export const LEGOsWithOptions = [
	"single_select_type_3",
	"multi_select_type_12"
] as const;

export const LEGOsWithoutOptions = [
	"date_type_1",
	"number_type_2",
	"phone_number_type_4",
	"address_type_5",
	"email_type_6",
	"current_course_type_7",
	"education_type_8",
	"work_experience_type_9",
	"project_type_10",
	"resume_type_11",
] as const;

// ! keep it in sync with [StudentProfile] resolver
export const allSupportedLEGOs = <const>[
	...LEGOsWithOptions,
	...LEGOsWithoutOptions
]

export type SupportedLEGOsTypes = typeof allSupportedLEGOs[number]



export const LEGOIdToTypeName: { [key in SupportedLEGOsTypes]: string } = {
	"date_type_1": "Date",
	"number_type_2": "Number/Integer",
	"single_select_type_3": "Single Select (Multiple choice)",
	"multi_select_type_12": "Multi Select (Multiple choice)",
	"phone_number_type_4": "Phone Number",
	"address_type_5": "Address",
	"email_type_6": "Email",
	"current_course_type_7": "Current Course",
	"education_type_8": "Education",
	"work_experience_type_9": "Work Experience",
	"project_type_10": "Project",
	"resume_type_11": "Resume",
}



export type OrgSchemaInstanceBlock = {
	attribute_type: SupportedLEGOsTypes,
	is_array?: Boolean, // defines if we shall take an array
	// [key: string]: any
	label: string,
	is_blocked: boolean,
	required: boolean,
	options?: string[] // notice that we only support strings as options
	requires_proof: boolean,
}

export type verificationInfo = {
	isVerfied: boolean,
	verifyActionTimestamp: Date,
	verifiedBy: string
}
