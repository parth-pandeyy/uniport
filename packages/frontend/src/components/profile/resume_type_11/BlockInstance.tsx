import Image from 'next/image';
import { LINK_TO_OPEN_FILE } from '../../../config/routes-config';
import { VerificationInfo } from '../Utils/VerificationInfo';




export const ResumeBlock = ({ block_index, data, is_blocked, openDialogToEditOrAddBlock }) => {
	let { file_name, resume_file_url, verification_info } = data
	return (
		<div className='flex flex-col text-sm  py-1 border-b'>

			<div className='flex justify-between items-center gap-4 md:gap-0 md:grid md:grid-cols-2'>
				<div className='flex-shrink'>
					<Image src={require('../../../assets/images/resume.svg')} width={70} height={70} />
				</div>
				<div className='flex flex-col flex-grow'>
					<div>{file_name}</div>
					<a href={LINK_TO_OPEN_FILE(resume_file_url)} target='_blank' className='text-blue-500  underline' >Resume Link</a>
				</div>
			</div>

			<div className='flex justify-end gap-3 pt-2'>
				<VerificationInfo
					verification_info={verification_info}
				/>
				{/* editing is possible only if it's not blocked */}
				{!is_blocked ? <div className='tag-style bg-blue-100 text-blue-500 flex align-middle gap-1 cursor-pointer' onClick={() => openDialogToEditOrAddBlock(block_index)}>
					<Image src={require('../../../assets/images/edit.svg')} alt='paper-clip' width='10' height='10' />
					Edit
				</div> : null}
			</div >
		</div >
	)
}




