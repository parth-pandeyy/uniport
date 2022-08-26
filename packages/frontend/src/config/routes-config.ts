

// just after registration is complete we shall route to this
export const ADMIN_PRIMARY_DASHBOARD = '/a/dash';
// when we don't know if we should push to /a/ or /s/
export const BRIGE_DASHBOARD = '/dash';


export const CREATE_NEW_CAMPAIGN = '/a/camp/new';


export const MANAGE_CAMP = (campaign_id: string) => `/a/camp/${campaign_id}/manage`;
export const VIEW_CAMP_DASH = (campaign_id: string) => CAMPAIGN_DASHBOARD(campaign_id, 'STUDENT');

export const MANAGE_STUDENT_PROFILE_DEFINITIONS = '/a/student-profile-definitions';


// student first screen
export const STUDENT_CAMP_CHOOSE_ROUTE = '/s/camp'

export const VIEW_CAMP_ALL_PROFILES = (campaign_id: string, accessRole: string) => {
	// TODO: Change it and add link in dash/
	return `/camp/profile/details`
	if (accessRole === 'ADMIN') {
		return `/a/camp/${campaign_id}/allprofiles`;
	} else {
		return `/s/camp/${campaign_id}/allprofiles`;
	}
};


// for now we don't have posts page so using [VIEW_CAMP_ALL_PROFILES] route
export const CAMPAIGN_DASHBOARD = (campaign_id: string, accessRole: string) => VIEW_CAMP_ALL_PROFILES(campaign_id, accessRole)



// Actually it's not a route config thing. Just placed it here cuz I am lazy.
export const STUDENT_PROFILE_ROUTE = (student_id: string) => `/s/profile/${student_id}`;


// don;t add trailing slash.
export const FETCH_STUDENT_PROFILE_DATA_ENDPOINT = 'http://localhost:4201/s/profile'

// ensure that [payload] contains [student_id]
// add [block_index] too if you want to edit
export const ADD_STUDENT_PROFILE_BLOCK = async (payload: any) => {
	console.log("PUSHING", payload);
	let formData = new FormData();
	for (let key in payload) {
		formData.append(key, payload[key])
	}

	let res = await fetch(`http://localhost:4201/s/profile/add`, {
		method: 'POST',
		credentials: 'include',
		body: formData
	})

	let json = await res.json();

	return json
}


export const ALL_COMPANIES_ROUTE = `/a/companies/all`;


export const ADD_A_JOB_PROFILE = (camp_id: string) => `/a/camp/${camp_id}/addprofile`


export const LINK_TO_OPEN_FILE = (resource_id: string) => `http://localhost:4201/serve/${resource_id}`;
