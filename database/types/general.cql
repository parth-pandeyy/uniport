-- type to store the verification info of every block
CREATE TYPE verification_info_type(
	is_verified Boolean,
	verified_by TEXT,
	verify_action_timestamp TIMESTAMP
);


-- we support campaign rules only for integers
-- and it should not be an array field
-- so if we are given [attribute_id] as alpha. Then just go to alpha[0] (after finding the type from student_profile_definition)

-- IMP: Conditions
-- Should have isArray as false.
-- All conditions will be joined with AND.
-- Any instance of current_course_type_7 -> percent_score FLOAT. (Use $gte, $gt etc)
-- Any instance of education_type_8 -> percent_score FLOAT (Use $gte etc);
-- Any instance of multi_select_type_12 -> Add all options which make the student eligible (out of ones which you had earlier chosen).
-- If a student has any one of them then he/she is selected)
CREATE TYPE filtering_rule(
	attribute_id TEXT,
	-- $gte, $gt, $equal, $lt $lte $not_equal -> for integers/floats
	-- TODO: While comparing floats. Ensure that you keep some tolerance
	-- $any, $all!
	-- $any will mean if any of the multi_select_threshold field is there then he/she is passed
	-- $all will mean if all of the multi_select_threshold fields are there then he/she is passed
	-- NOTE: Ensure that the fields in [multi_select_threshold] are in the schema too. Else how will the candidate fill it. :)
	operator TEXT,
	threshold_value BIGINT, -- threshold for integers
	prefix_multiplier BIGINT, -- for case only when we are working on Integers
	multi_select_threshold set<TEXT>
);



CREATE TYPE company_representative_type(
	name TEXT,
	phone_number TEXT,
	email TEXT,
	last_coordinator_in_touch TEXT,
	note TEXT
);

