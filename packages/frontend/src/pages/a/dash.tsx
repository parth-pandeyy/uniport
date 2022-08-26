import HeadMeta from "../../components/HeadMeta/HeadMeta";
import Layout from "../../components/AuthLayout/Layout";
import withAuth from "../../HOC/withAuth";


const AdminDash = () => {
	return (
		<div>
			<HeadMeta title='Uniport | Admin Dashboard' />
			<Layout>
				<div className='p-10'>
					{/* Content goes here */}
				</div>
			</Layout>
		</div>

	)
}

export default withAuth(AdminDash);
