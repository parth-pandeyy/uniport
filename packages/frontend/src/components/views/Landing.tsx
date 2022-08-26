import HeadMeta from '../HeadMeta/HeadMeta';
import NoAuthNavbar from '../NonAuthNavbar/NonAuthNavbar';
import Image from 'next/image';


const Landing = () => {
	return (
		<>
			<HeadMeta title={"Uniport | Home"} />
			<NoAuthNavbar />
			<div className='ui-landing main-container px-10 lg:px-24'>
				<div className='flex flex-col items-center md:grid md:grid-cols-2 mx-auto pt-12 md:pt-0 gap-7 h-full max-w-5xl pb-32'>
					<div className='text-center items-center md:text-left md:items-start flex flex-col justify-center gap-5 font-bold leading-snug text-gray-700 pb-10'>
						<div className='lg:text-3xl text-2xl'>
							A fully customizable <span className='text-yellow-500'>port</span>al for the <span className='text-yellow-500'>uni</span>versities to manage campus recruitments seamlessly.
						</div>
						<div className='flex gap-6'>
							<div className='rounded-xl py-2 px-5 text-base tracking-wider cursor-pointer bg-indigo-500 hover:bg-indigo-700   text-white'>Join Now</div>
							{/* <div className='rounded-full py-2 px-5 uppercase text-base font-bold tracking-wider cursor-pointer bg-green-500 hover:bg-green-700   text-white'>Join with Invite</div> */}
						</div>
					</div>
					<div className='flex items-center justify-center'>
						<Image src={require('../../assets/images/landing.svg')} height='350' width='450' />
					</div>
				</div>
			</div>
		</>
	)

}

export default Landing;

