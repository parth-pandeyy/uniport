import { useQuery } from '@apollo/client';
import { useSideNavStore } from '../../global-stores/useSideNavStore';
import { FETCH_CURRENT_USER } from '../../graphql/FetchCurrentUser';
import { FETCH_SIDE_BAR_ITEMS } from '../../graphql/FetchSideBarItems';
import { useRouter } from 'next/router';
import { CampaignsMenu } from './CampaignsMenu';
import { AdditionalOptions } from './AdditionalOptions';
import { CampaignOptions } from './CampaignOptions';
import { SideMenuWrapper } from './SideMenuWrapper';


// ! This is only for authenticated users. (enforced by Layout)
const SideNavigationBar = () => {
	const router = useRouter();
	const { camp_id } = router.query;

	const isSideNavOpen = useSideNavStore(state => state.status)

	// if we are here then we are authenticated
	const { data: user } = useQuery(FETCH_CURRENT_USER);
	const accessRole = user.getUserDetails.access_role as string;

	const { data, loading } = useQuery(FETCH_SIDE_BAR_ITEMS);


	if (loading) {
		return (
			<SideMenuWrapper isSideNavOpen={isSideNavOpen}>
				Loading...
			</SideMenuWrapper>
		)
	}

	let campaigns = data.getMyCampaigns; // this is an array



	// campaings are defined
	// TODO: Fix the styling of active route of campaigns
	return (
		<>
			<SideMenuWrapper isSideNavOpen={isSideNavOpen}>

				{/* campaigns list */}
				{campaigns ? <CampaignsMenu
					campaigns={campaigns}
					accessRole={accessRole}
				/> : null}


				{/* campaign options */}
				<CampaignOptions
					camp_id={camp_id}
					accessRole={accessRole}
				/>

				{/* additional options */}
				<AdditionalOptions
					accessRole={accessRole}
				/>
			</SideMenuWrapper>
		</>

	)
}

export default SideNavigationBar;

