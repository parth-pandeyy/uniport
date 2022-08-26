import { Router } from 'express'
import { dbClient } from '../db';
import { authenticatedUsersOnly } from '../config/auth/authCheckers';
import { address_type_5_DataBlock, address_type_5_InputPayload, allSupportedLEGOs, current_course_type_7_DataBlock, current_course_type_7_InputPayload, date_type_1_DataBlock, date_type_1_InputPayload, education_type_8_DataBlock, education_type_8_InputPayload, email_type_6_DataBlock, email_type_6_InputPayload, legoDataValidators, multi_select_type_12_DataBlock, multi_select_type_12_InputPayload, number_type_2_DataBlock, number_type_2_InputPayload, OrgSchemaInstanceBlock, phone_number_type_4_DataBlock, phone_number_type_4_InputPayload, project_type_10_DataBlock, project_type_10_InputPayload, resume_type_11_DataBlock, resume_type_11_InputPayload, single_select_type_3_DataBlock, single_select_type_3_InputPayload, StudentProfileDefinition, SupportedLEGOsTypes, work_experience_type_9_DataBlock, work_experience_type_9_InputPayload } from '@uniport/common';
import { STUDENT_PROFILE_BLOCK_ID_INDEX_DELIM } from '../config/constants';
import { types } from 'cassandra-driver';
import { formatLEGOData } from '../utils/formatLEGOData';
import multer from 'multer';
import path from 'path';
import { verification_info } from '@uniport/common/dist/legos/verification_info';

const upload = multer({
	storage: multer.diskStorage({
		destination: './data/uploads/',
		filename: (req, file, cb) => {

			let tmp = file.originalname.split('.');
			let extension = tmp[tmp.length - 1];
			cb(null, `${Date.now()}---${req.user?.user_id}.${extension}`)
		},

	}),

	fileFilter: function (req, file, callback) {
		var ext = path.extname(file.originalname);

		if (req.isUnauthenticated()) {
			return callback(new Error('Not authenticated'))
		}
		if (ext !== '.pdf') {
			return callback(new Error('Only pdfs are allowed'))
		}
		callback(null, true)
	},

	limits: {
		// 5 MB
		fileSize: 1024 * 1024 * 5

	},


})


const app = Router();


const dummyVerificationInfo: verification_info = {
	is_verified: false,
	verified_by: '',
	verify_action_timestamp: ''
}

type PayloadType = resume_type_11_InputPayload
	| work_experience_type_9_InputPayload
	| project_type_10_InputPayload
	| education_type_8_InputPayload
	| current_course_type_7_InputPayload
	| address_type_5_InputPayload
	| email_type_6_InputPayload
	| phone_number_type_4_InputPayload
	| date_type_1_InputPayload
	| number_type_2_InputPayload
	| single_select_type_3_InputPayload
	| multi_select_type_12_InputPayload;


/**
 * Route to add or edit new block to the student profile
 */
app.post('/profile/add/', upload.any(), async (req, res) => {
	try {
		if (!req.files) {
			req.files = []
		}

		authenticatedUsersOnly(req);
		let payload: PayloadType = req.body;


		let canAccessThisRecord = false;

		let user_id = payload.student_id;
		if (req.user?.access_role === 'ADMIN') {
			canAccessThisRecord = true;
		} else if (req.user?.user_id.toString() === user_id) {
			canAccessThisRecord = true;
		}


		if (!canAccessThisRecord) {
			throw new Error("You don't have sufficient permissions to edit this record")
		}

		let attribute_id = payload.attribute_id;
		let block_index = payload.block_index;
		let student_id = payload.student_id;
		let org_id = req.user?.org_id;

		if (!attribute_id || !student_id) {
			throw Error("attribute_id and student_id are mandatory fields");
		}

		let performed_operation;
		if (!block_index) {
			performed_operation = 'ADD_BLOCK';
			payload.block_index = types.Uuid.random().toString();
		} else {
			performed_operation = 'EDIT_BLOCK';
			payload.block_index = types.Uuid.fromString(block_index).toString()
		}


		let attribute_type: SupportedLEGOsTypes = payload.attribute_type;

		const validator = legoDataValidators[attribute_type];
		if (!validator) {
			throw new Error(`Invalid LEGO type (attribute_type) ${attribute_type}`)
		}
		await validator.validate(payload);


		// check if the block actually exist and see if proof is mandatory
		const blockDefinitions = await dbClient.execute(`SELECT * FROM student_profile_definition
		WHERE org_id=? AND attribute_id=?`, [org_id, attribute_id]);

		if (blockDefinitions.rowLength !== 1) {
			throw new Error(`Invalid attribute id ${attribute_id}. Block doesn't exist`)
		}
		let blockDefinition = blockDefinitions.rows[0] as unknown as StudentProfileDefinition;


		if (blockDefinition.attribute_type !== attribute_type) {
			throw new Error(`Invalid attribute_type ${attribute_type} with attribute_id ${attribute_id}`)
		}

		const requireProof = blockDefinition.requires_proof;

		let attribute_id_with_block_index = `${attribute_id}${STUDENT_PROFILE_BLOCK_ID_INDEX_DELIM}${payload.block_index}`


		// checking if any proof for the block is sent
		const file = (req.files as any[]).find(e => e.fieldname === 'block_proof_data');
		if (!file && requireProof) {
			throw new Error("It's mandatory to upload the proof for this block")
		}
		let proof_file_url = (file ? file.filename : null);

		let resData = {}

		if (payload.attribute_type === 'resume_type_11') {
			const file = (req.files as any[]).find(e => e.fieldname === 'resume_file_data');
			if (!file) {
				throw new Error("No resume file found")
			}

			let resume_file_url = file.filename;

			// executing the query
			let query = `UPDATE student_profile
			SET resume_type_11_map[?]={file_name: ?, resume_file_url: ?}
			WHERE user_id = ? AND org_id=?`
			await dbClient.execute(query, [
				attribute_id_with_block_index,
				payload.file_name,
				resume_file_url,
				user_id,
				org_id
			])

			// setting the response data for the client
			const tmp: resume_type_11_DataBlock = {
				file_name: payload.file_name,
				resume_file_url: resume_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;
		} else if (payload.attribute_type === 'phone_number_type_4') {
			let query = `UPDATE student_profile
				SET phone_number_type_4_map[?]={country_code: ?, ph_number: ?, proof_file_url: ?}
				WHERE user_id = ? AND org_id=?`

			await dbClient.execute(query, [
				attribute_id_with_block_index,
				payload.country_code,
				payload.ph_number,
				proof_file_url,
				user_id,
				org_id
			])

			const tmp: phone_number_type_4_DataBlock = {
				country_code: payload.country_code,
				ph_number: payload.ph_number,
				proof_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;
		} else if (payload.attribute_type === 'email_type_6') {
			let query = `UPDATE student_profile
				SET email_type_6_map[?]={value: ?, proof_file_url: ?}
				WHERE user_id = ? AND org_id=?`

			await dbClient.execute(query, [
				attribute_id_with_block_index,
				payload.value,
				proof_file_url,
				user_id,
				org_id
			])
			// setting the response data for the client
			const tmp: email_type_6_DataBlock = {
				value: payload.value,
				proof_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;
		} else if (payload.attribute_type === 'date_type_1') {
			let query = `UPDATE student_profile
				SET date_type_1_map[?]={value: ?, proof_file_url: ?}
				WHERE user_id = ? AND org_id=?`

			await dbClient.execute(query, [
				attribute_id_with_block_index,
				payload.value,
				proof_file_url,
				user_id,
				org_id
			], { prepare: true })
			// setting the response data for the client
			const tmp: date_type_1_DataBlock = {
				value: payload.value,
				proof_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;
		} else if (payload.attribute_type === 'number_type_2') {
			let query = `UPDATE student_profile
				SET number_type_2_map[?]={value: ?, proof_file_url: ?}
				WHERE user_id = ? AND org_id=?`

			await dbClient.execute(query, [
				attribute_id_with_block_index,
				payload.value,
				proof_file_url,
				user_id,
				org_id
			], { prepare: true })
			// setting the response data for the client
			const tmp: number_type_2_DataBlock = {
				value: payload.value,
				proof_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;
		} else if (payload.attribute_type === 'single_select_type_3') {

			// checking that the value sent is within the limits
			let parsedValue = parseInt(payload.value);
			if (parsedValue > blockDefinition.options.length && parsedValue < 0) {
				throw new Error(`Invalid index you are trying to add. Range should be [0,${blockDefinition.options.length - 1}]`)
			}

			let query = `UPDATE student_profile
				SET single_select_3_type_map[?]={value: ?, proof_file_url: ?}
				WHERE user_id = ? AND org_id=?`

			await dbClient.execute(query, [
				attribute_id_with_block_index,
				payload.value,
				proof_file_url,
				user_id,
				org_id
			], { prepare: true })
			// setting the response data for the client
			const tmp: single_select_type_3_DataBlock = {
				value: payload.value,
				proof_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;
		} else if (payload.attribute_type === 'multi_select_type_12') {

			// checking that the value sent is within the limits
			let valueArray = JSON.parse(payload.value);
			if(!Array.isArray(valueArray)){
				throw new Error("Invalid value payload. It should be an array.")
			}

			valueArray.forEach(e => {
				let parsedValue = parseInt(e);
				if (parsedValue > blockDefinition.options.length && parsedValue < 0) {
					throw new Error(`Invalid index you are trying to add. Range should be [0,${blockDefinition.options.length - 1}]`)
				}
			})

			let query = `UPDATE student_profile
				SET multi_select_type_12_map[?]={value: ?, proof_file_url: ?}
				WHERE user_id = ? AND org_id=?`

			await dbClient.execute(query, [
				attribute_id_with_block_index,
				valueArray,
				proof_file_url,
				user_id,
				org_id
			], { prepare: true })
			// setting the response data for the client
			const tmp: multi_select_type_12_DataBlock = {
				value: valueArray,
				proof_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;

		} else if (payload.attribute_type === 'address_type_5') {
			let query = `UPDATE student_profile
				SET address_type_5_map[?]={country: ?, pincode: ?, state: ?, district: ?, city: ?, address_line: ?, proof_file_url:?}
				WHERE user_id = ? AND org_id=?`

			await dbClient.execute(query, [
				attribute_id_with_block_index,
				payload.country,
				payload.pincode,
				payload.state,
				payload.district,
				payload.city,
				payload.address_line,
				proof_file_url,
				user_id,
				org_id
			], { prepare: true })

			// setting the response data for the client
			const tmp: address_type_5_DataBlock = {
				city: payload.city,
				country: payload.country,
				district: payload.district,
				pincode: payload.pincode,
				state: payload.state,
				address_line: payload.address_line,
				proof_file_url: proof_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;

		} else if (payload.attribute_type === 'current_course_type_7') {
			let query = `UPDATE student_profile
				SET current_course_type_7_map[?]={course_end_date: ?, course_start_date: ?, percent_score: ?, program: ?, institute_roll: ?, specialization: ?, description: ?,  proof_file_url:?}
				WHERE user_id = ? AND org_id=?`


			await dbClient.execute(query, [
				attribute_id_with_block_index,
				payload.course_end_date,
				payload.course_start_date,
				payload.percent_score,
				payload.program,
				payload.institute_roll,
				payload.specialization,
				payload.description,
				proof_file_url,
				user_id,
				org_id
			], { prepare: true })

			const tmp: current_course_type_7_DataBlock = {
				course_end_date: payload.course_end_date,
				course_start_date: payload.course_start_date,
				percent_score: payload.percent_score,
				program: payload.program,
				institute_roll: payload.institute_roll,
				specialization: payload.specialization,
				description: payload.description,
				proof_file_url: proof_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;

		} else if (payload.attribute_type === 'education_type_8') {
			let query = `UPDATE student_profile
				SET education_type_8_map[?]={school: ?, program: ?, board: ?, education_type: ?, percent_score: ?, course_start_date: ?, course_end_date:?,  proof_file_url:?}
				WHERE user_id = ? AND org_id=?`

			await dbClient.execute(query, [
				attribute_id_with_block_index,
				payload.school,
				payload.program,
				payload.board,
				payload.education_type,
				payload.percent_score,
				payload.course_start_date,
				payload.course_end_date,
				proof_file_url,
				user_id,
				org_id
			], { prepare: true })

			const tmp: education_type_8_DataBlock = {
				board: payload.board,
				course_end_date: payload.course_end_date,
				course_start_date: payload.course_start_date,
				education_type: payload.education_type,
				percent_score: payload.percent_score,
				program: payload.program,
				school: payload.school,
				description: payload.description,
				proof_file_url: proof_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;


		} else if (payload.attribute_type === 'project_type_10') {


			let query = `UPDATE student_profile
				SET project_type_10_map[?]={project_name: ?, start_date:?, end_date:?, project_url:?, description:?,  proof_file_url:?}
				WHERE user_id = ? AND org_id=?`

			await dbClient.execute(query, [
				attribute_id_with_block_index,
				payload.project_name,
				payload.start_date,
				payload.end_date,
				payload.project_url,
				payload.description,
				proof_file_url,
				user_id,
				org_id
			], { prepare: true })

			const tmp: project_type_10_DataBlock = {
				description: payload.description,
				project_name: payload.project_name,
				project_url: payload.project_url,
				end_date: payload.end_date,
				start_date: payload.start_date,
				proof_file_url: proof_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;

		} else if (payload.attribute_type === 'work_experience_type_9') {
			const file = (req.files as any[]).find(e => e.fieldname === 'block_proof_data');


			if (!file && requireProof) {
				throw new Error("It's mandatory to upload the proof for this block")
			}

			let proof_file_url = file.filename;

			let query = `UPDATE student_profile
				SET work_experience_type_9_map[?]={company_name:?, job_title:?, location:?, position_type:?,job_start_date:?, job_end_date:?, details:?,  proof_file_url:?}
				WHERE user_id = ? AND org_id=?`

			await dbClient.execute(query, [
				attribute_id_with_block_index,
				payload.company_name,
				payload.job_title,
				payload.location,
				payload.position_type,
				payload.job_start_date,
				payload.job_end_date,
				payload.details,
				proof_file_url,
				user_id,
				org_id
			], { prepare: true })

			const tmp: work_experience_type_9_DataBlock = {
				company_name: payload.company_name,
				details: payload.details,
				job_end_date: payload.job_end_date,
				job_start_date: payload.job_start_date,
				job_title: payload.job_title,
				location: payload.location,
				position_type: payload.position_type,
				proof_file_url: proof_file_url,
				verification_info: dummyVerificationInfo
			}
			resData = tmp;

		} else {
			throw Error("LEGO type not supported yet")
		}



		return res.send({
			error: false,
			performed_operation,
			block_index: payload.block_index,
			data: resData
		})


	} catch (err) {
		return res.send({
			error: true,
			message: err.message
		})
	}
})



// we are keeping this [user_id] (and not email) as param so that admin can also see the profiles
// else we just could have tried to get the userid from [req.user] and then send the data
// Since user_id is a surrogate key, so it's actually nice that nobody would mind that on the addressbar (they might if we used email)
app.get('/profile/:user_id', async (req, res) => {
	// only for users who have a student profile
	try {
		authenticatedUsersOnly(req);

		let { user_id } = req.params;

		let canAccessThisRecord = false;
		if (req.user?.access_role === 'ADMIN') {
			canAccessThisRecord = true;
		} else if (req.user?.user_id.toString() === user_id) {
			canAccessThisRecord = true;
		}

		if (!canAccessThisRecord) {
			throw new Error("You don't have sufficient permissions to view this record")
		}

		let org_id = req.user?.org_id;

		// since I have put org_id here. this will ensure that no two tenants can see each other data
		let response = await dbClient.execute(`SELECT * FROM student_profile
		WHERE org_id=? AND user_id=?`, [org_id, user_id]);

		if (response.rowLength !== 1) {
			throw new Error("Profile doesn't exists or you are not authorised");
		}

		let data = response.rows[0];

		let finalResponse = {}
		let basicData = {
			first_name: data.first_name,
			last_name: data.last_name,
			email_address: data.email_address,
		}


		allSupportedLEGOs.forEach(e => {
			let key = `${e}_map`;
			let current = formatLEGOData(data[key], e);
			finalResponse = {
				...finalResponse, ...{
					...current,
				}
			};
		})


		return res.send({
			error: false,
			data: finalResponse,
			basic: basicData
		})
	} catch (err) {
		return res.send({
			error: true,
			message: err.message
		})

	}
});




export default app;
