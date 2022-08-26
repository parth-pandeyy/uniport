import { project_type_10_DataBlock } from '@uniport/common';
import Image from 'next/image';
import { LINK_TO_OPEN_FILE } from '../../../config/routes-config';
import { VerificationInfo } from '../Utils/VerificationInfo';




export const ProjectType10Block = ({ block_index, data, is_blocked, openDialogToEditOrAddBlock }) => {
	let { verification_info, proof_file_url, project_name, project_url, start_date, end_date } = data as project_type_10_DataBlock;
	return (
		<div className='flex flex-col text-sm  py-1 border-b'>
			<div className='flex justify-between items-center gap-4 md:gap-0 md:grid md:grid-cols-2'>
				<div className='flex-shrink'>
					<Image src={require('../../../assets/images/project.svg')} width={70} height={70} />
				</div>
				<div className='flex flex-col flex-grow'>
					<div>{project_name}</div>
					{project_url && <div className='flex'>
						<a href={project_url} target='_blank' className='text-blue-500  underline' >Project Link</a>
					</div>}
					<div className='flex text-gray-500'>
						<div className='flex gap-2'>
							<div>{start_date}</div>
							-
							<div>{end_date}</div>
						</div>
					</div>
				</div>

			</div>

			<div className='flex justify-end gap-3 pt-2'>
				<VerificationInfo
					verification_info={verification_info}
				/>
				{/* editing is possible only if it's not blocked */}
				{proof_file_url ?
					<a href={LINK_TO_OPEN_FILE(proof_file_url)} target='_blank'>
						<div className='tag-style bg-pink-100 text-pink-500 flex align-middle gap-1 cursor-pointer'>
							<Image src={require('../../../assets/images/eye.svg')} alt='paper-clip' width='10' height='10' />
							Attachments
						</div>
					</a>
					: null}

				{!is_blocked ? <div className='tag-style bg-blue-100 text-blue-500 flex align-middle gap-1 cursor-pointer' onClick={() => openDialogToEditOrAddBlock(block_index)}>
					<Image src={require('../../../assets/images/edit.svg')} alt='paper-clip' width='10' height='10' />
					Edit
				</div> : null}
			</div >
		</div >
	)
}




