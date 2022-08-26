import Image from "next/image";
import { NotVerifiedTag } from "./NotVerifiedTag";
import { VerifiedActionTimeTag } from "./VerifiedActionTimeTag";
import { VerifiedTag } from "./VerifiedTag";



// ! Adding flex container is the caller responsibility
export const VerificationInfo = ({ verification_info }) => (
	<div>
		{verification_info.is_verified ? <>
			<VerifiedTag />
			<VerifiedActionTimeTag timestamp={verification_info.verify_action_timestamp} />
		</> : <NotVerifiedTag />}
	</div>
)
