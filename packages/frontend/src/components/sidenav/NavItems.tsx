import { useRouter } from "next/router"
import Link from "next/link"

export const NavItems = ({ items, globalStyle }) => {
	return (
		<>
			{items.map((e, indx) => {
				return (
					<div key={indx}>
						<NavItem
							relative_url={e.relative_url}
							label={e.label}
						/>
					</div>
				)
			})}
		</>
	)
}




export const NavItem = ({ relative_url, label }: { relative_url: string, label: string }) => {
	const router = useRouter();
	const activeRoute = router.pathname;
	return (
		<Link href={relative_url}>
			<div className={`rounded-lg my-2 mx-1 py-1 px-3 cursor-pointer flex items-center mt-1 ${activeRoute === relative_url ? 'bg-custom-btn-color-bg-active' : 'hover:bg-custom-btn-color-bg-hover'}`}>
				{label}
			</div>
		</Link>
	)
}
