import Image from "next/image";
import Link from "next/link";

// logo ui for AuthLayout
const UniportLogo = () => {
	return (<div className="flex items-center justify-center">
		<div className="flex items-center">
			<Link href='/'>
				<div className='cursor-pointer'>
					<Image src="/logo.svg" height={40} width={150} />
				</div>
			</Link>
		</div>
	</div>)
}

export default UniportLogo;
