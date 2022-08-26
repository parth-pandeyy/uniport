import { ADD_A_JOB_PROFILE, VIEW_CAMP_ALL_PROFILES } from "../../config/routes-config"
import { NavItems } from "./NavItems"

// renders all the campaign options
export const CampaignOptions = ({ camp_id, accessRole }) => {
	// defines the campaign options
	const campaignOptions = {
		"ADMIN": [
			{
				label: "All profiles",
				relative_url: VIEW_CAMP_ALL_PROFILES(camp_id as string, accessRole),
			},
			{
				label: "Add a company",
				relative_url: '#',
			},
			{
				label: "Add a job profile",
				relative_url: ADD_A_JOB_PROFILE(camp_id as string),
			},
		], "STUDENT": [
			{
				label: "Applied Profiles",
				relative_url: "/s/camp/:id/appliedprofiles",
			},
			{
				label: "All profiles",
				relative_url: VIEW_CAMP_ALL_PROFILES(camp_id as string, accessRole),
			},
		]
	}


	return (
		<div>
			{campaignOptions[accessRole] && campaignOptions[accessRole].length ?
				<>
					<div className='py-1 px-3 my-2 mx-1 text-sm uppercase font-bold'>
						Campaign Options
					</div>
					<NavItems items={campaignOptions[accessRole]} globalStyle='' />
					<hr className='border-t-gray-400' />
				</>
				: null}
		</div>
	)
}
