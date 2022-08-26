
// wrapper for side navbar ui
// Small screen: Fullpage

// Large screen: Sidenav
export const SideMenuWrapper = ({ children, isSideNavOpen }) => {
	return (
			<div className={`text-sm z-30 absolute inset-y-0  w-52  bg-side-nav-color text-custom-grey overflow-y-scroll rounded-br-md transform  ${isSideNavOpen ? null : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
				<nav className="py-10">
					{children}
				</nav>
			</div>
	);
}
