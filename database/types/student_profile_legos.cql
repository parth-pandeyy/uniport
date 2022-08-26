-- Note: all proof_file_url are for proofs!
-- so for a field which requires no proof. It will be null.

-- LEGO 1
CREATE TYPE date_type_1(
	value TIMESTAMP,
	proof_file_url TEXT,
	verification_info verification_info_type
);

-- LEGO 2
CREATE TYPE number_type_2(
	value INT,
	proof_file_url TEXT,
	verification_info verification_info_type
);

-- LEGO 3
CREATE TYPE single_select_type_3(
	value TEXT,
	proof_file_url TEXT,
	verification_info verification_info_type
);

-- LEGO 4
CREATE TYPE phone_number_type_4(
	country_code TEXT,
	ph_number TEXT,
	proof_file_url TEXT,
	verification_info verification_info_type
);

-- LEGO 5
CREATE TYPE address_type_5(
	country TEXT,
	pincode TEXT,
	state TEXT,
	district TEXT,
	city TEXT,
	address_line TEXT,
	proof_file_url TEXT,
	verification_info verification_info_type
);

-- LEGO 6
CREATE TYPE email_type_6(
	value TEXT,
	proof_file_url TEXT,
	verification_info verification_info_type
);

-- LEGO 7
CREATE TYPE current_course_type_7(
	program TEXT,
	specialization TEXT,
	course_start_date DATE,
	course_end_date DATE,
	percent_score FLOAT,
	institute_roll TEXT,
	description TEXT,
	proof_file_url TEXT,
	verification_info verification_info_type
);

-- LEGO 8
CREATE TYPE education_type_8(
	school TEXT,
	program TEXT,
	board TEXT,
	education_type TEXT,
	percent_score FLOAT,
	course_start_date DATE,
	course_end_date DATE,
	proof_file_url TEXT,
	description TEXT,
	verification_info verification_info_type
);

-- LEGO 9
CREATE TYPE work_experience_type_9(
	company_name TEXT,
	job_title TEXT,
	location TEXT,
	position_type TEXT,
	job_start_date DATE,
	job_end_date DATE,
	details TEXT,
	proof_file_url TEXT,
	verification_info verification_info_type
);

-- LEGO 10
CREATE TYPE project_type_10(
	project_name TEXT,
	start_date DATE,
	end_date DATE,
	project_url TEXT,
	description TEXT,
	proof_file_url TEXT,
	verification_info verification_info_type
);

-- LEGO 11
-- resume cannot have [hasProof]
CREATE TYPE resume_type_11(
	file_name TEXT,
	resume_file_url TEXT,
	verification_info verification_info_type
);

-- LEGO 12
CREATE TYPE multi_select_type_12(
	-- store options index only. (it will enable the admin to change things anytime. :))
	value set<TEXT>,
	proof_file_url TEXT,
	verification_info verification_info_type
);
