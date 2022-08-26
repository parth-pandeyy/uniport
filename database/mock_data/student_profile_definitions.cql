
-- NOTE: Change the org_id before executing
-- add student profile definitions


INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Date of Birth', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'date_type_1', -- attribute_type
	false, -- is_array
	false, -- is_blocked
	true, -- required
	null, -- options
	true  -- requires_proof
);


INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Favorite Number', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'number_type_2', -- attribute_type
	false, -- is_array
	false, -- is_blocked
	true, -- required
	null, -- options
	true  -- requires_proof
);




INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Gender', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'single_select_type_3', -- attribute_type
	false, -- is_array
	false, -- is_blocked
	true, -- required
	{'Male', 'Female', 'Others'}, -- options
	true  -- requires_proof
);


INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Contact Number', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'phone_number_type_4', -- attribute_type
	true, -- is_array
	false, -- is_blocked
	true, -- required
	null,
	true  -- requires_proof
);




INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Personal Email Address', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'email_type_6', -- attribute_type
	true, -- is_array
	false, -- is_blocked
	true, -- required
	null,
	true  -- requires_proof
);



INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Permanent Address', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'address_type_5', -- attribute_type
	true, -- is_array
	false, -- is_blocked
	true, -- required
	null,
	false  -- requires_proof
);

INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Current Address', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'address_type_5', -- attribute_type
	false, -- is_array
	false, -- is_blocked
	true, -- required
	null,
	true  -- requires_proof
);



INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Guardian Phone Number', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'phone_number_type_4', -- attribute_type
	false, -- is_array
	false, -- is_blocked
	true, -- required
	null,
	true  -- requires_proof
);



INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Class 12th Details', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'education_type_8', -- attribute_type
	false, -- is_array
	false, -- is_blocked
	true, -- required
	null,
	true  -- requires_proof
);




INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Class 10th Details', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'education_type_8', -- attribute_type
	false, -- is_array
	false, -- is_blocked
	true, -- required
	null,
	true  -- requires_proof
);



INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Work Experience', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'work_experience_type_9', -- attribute_type
	true, -- is_array
	false, -- is_blocked
	true, -- required
	null,
	true  -- requires_proof
);



INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Projects', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'project_type_10', -- attribute_type
	true, -- is_array
	false, -- is_blocked
	true, -- required
	null,
	true  -- requires_proof
);


INSERT INTO student_profile_definition(label, org_id, attribute_id, attribute_type, is_array,  is_blocked, required, options, requires_proof)
VALUES(
	'Resume', -- label
	06b6e9cc-0be1-4d60-9df6-ca9a0353afab, -- org_id
	uuid(), -- attribute_id
	'resume_type_11', -- attribute_type
	true, -- is_array
	false, -- is_blocked
	true, -- required
	null,
	true  -- requires_proof
);
