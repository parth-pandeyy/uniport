import dayjs from "dayjs";



export const VerifiedActionTimeTag = ({ timestamp }) => (
	<div className={`bg-red-100 text-red-500  tag-style`}>
		{dayjs(timestamp).format('DD/MM | HH:mm')}
	</div>
)
