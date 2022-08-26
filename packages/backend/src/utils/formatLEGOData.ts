import { STUDENT_PROFILE_BLOCK_ID_INDEX_DELIM } from "../config/constants";


// ! [debug_block_type] is redundant. Since block determination is done by student definitions and not by this.
// But we are keeping it for type definitions
export const formatLEGOData = (data: { [key: string]: any }, debug_block_type: string) => {
	if (!data) return {};
	let formattedData: any = {}

	Object.entries(data).forEach(e => {
		let [attribute_id, block_index] = e[0].split(STUDENT_PROFILE_BLOCK_ID_INDEX_DELIM);
		let data = e[1];

		if (!data.verification_info) {
			data.verification_info = {
				is_verified: false,
				verified_by: null,
				verify_action_timestamp: null
			}
		}

		if (!formattedData[attribute_id]) {
			formattedData[attribute_id] = {}
		}

		formattedData[attribute_id][block_index] = {
			...data,
			debug_block_type
		}
	})

	return formattedData;
}
