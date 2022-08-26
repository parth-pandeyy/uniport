
// Page to show the rendered profile of the student in view mode
// Any non-blocked field (by university admin) can be edited using a modal

import HeadMeta from "../../../../components/HeadMeta/HeadMeta";
import Layout from "../../../../components/AuthLayout/Layout";
import { ResumePilot } from "../../../../components/profile/resume_type_11/Pilot";
import { useQuery } from "@apollo/client";
import { GET_STUDENT_PROFILE_DEFINITIONS } from "../../../../graphql/GetStudentProfileDefinitions";
import { SupportedLEGOsTypes } from "@uniport/common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FETCH_STUDENT_PROFILE_DATA_ENDPOINT } from "../../../../config/routes-config";
import { FETCH_CURRENT_USER } from "../../../../graphql/FetchCurrentUser";
import { useStudentProfileStore } from "../../../../global-stores/useStudentProfiles";
import { WorkExperienceType9Pilot } from "../../../../components/profile/work_experience_type_9/Pilot";
import { ProjectType10Pilot } from "../../../../components/profile/project_type_10/Pilot";
import { EducationType8Pilot } from "../../../../components/profile/education_type_8/Pilot";
import { CurrentCourseType7Pilot } from "../../../../components/profile/current_course_type_7/Pilot";
import { AddressType5Pilot } from "../../../../components/profile/address_type_5/Pilot";
import { EmailType6Pilot } from "../../../../components/profile/email_type_6/Pilot";
import { PhoneNumberType4Pilot } from "../../../../components/profile/phone_number_type_4/Pilot";
import { DateType1Pilot } from "../../../../components/profile/date_type_1/Pilot";
import { NumberType2Pilot } from "../../../../components/profile/number_type_2/Pilot";
import { SingleSelectType3Pilot } from "../../../../components/profile/single_select_type_3/Pilot";
import { MultiSelectType12Pilot } from "../../../../components/profile/multi_select_type_12/Pilot";





const StudentProfile = () => {
	// fetch from server
	// *Note: The keys of the [studentData] will be same as keys of [studentProfileSchemaMeta]

	let { data, loading, error } = useQuery(GET_STUDENT_PROFILE_DEFINITIONS);

	const [loadingStudentData, setloadingStudentData] = useState(true)
	const [studentDataFetchError, setstudentDataFetchError] = useState(null);

	const studentProfile = useStudentProfileStore(state => state.studentProfile);
	const setStudentProfile = useStudentProfileStore(state => state.setStudentProfile);

	const [basicData, setBasicData] = useState(null);

	const router = useRouter()
	let student_id = router.query.student_id as string;

	useEffect(() => {
		const getStudentProfileDataBlocks = async (student_id) => {
			try {
				const url = `${FETCH_STUDENT_PROFILE_DATA_ENDPOINT}/${student_id}`;
				let res = await fetch(url, {
					cache: 'no-cache',
					credentials: 'include',
				})
				let jsonData = await res.json();
				if (jsonData['error']) {
					throw Error(jsonData['message'])
				}

				setStudentProfile(jsonData['data']);
				// TODO: set the [basicData] to zustang state
				setBasicData(jsonData['basic']);

				setloadingStudentData(false);
			} catch (err) {
				setstudentDataFetchError(err.message);
				setloadingStudentData(false);
			}

		}

		if (student_id) {
			getStudentProfileDataBlocks(student_id);
		}

	}, [student_id])



	return (
		<>
			<HeadMeta title='Uniport | Student Profile' />
			<Layout>
				<div className='px-3 max-w-2xl my-10 w-full mx-auto'>
					<div>

						<div className='text-2xl font-bold leading-normal mt-0 mb-3 text-purple-800'>
							Student Profile
						</div>


						{error || studentDataFetchError ?
							<div className='my-3 text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 flex items-center p-4 rounded-md'>
								{error ? error.message : null}
								{error && studentDataFetchError ? <br /> : null}
								{studentDataFetchError ? studentDataFetchError : null}
							</div> : null}
						{loading || loadingStudentData ?
							<div className='my-3 text-sm text-left text-blue-600 bg-blue-500 bg-opacity-10 border border-blue-400 flex items-center p-4 rounded-md'>
								Loading...
							</div> : null}

						{/* render only if there is no loading, no errors */}
						{data && !loadingStudentData && (!error && !studentDataFetchError) && < div >

							<div className="bg-white px-4 py-4 flex my-2 rounded-lg shadow flex-col gap-2">
								<div >
									<h2 className="text-base font-bold text-gray-700 my-0"></h2>
								</div>
								<div className='grid grid-cols-2'>
									<div className='text-sm font-bold mt-2'>
										First Name
									</div>
									<div className='text-gray-500 text-sm mt-2'>
										{basicData.first_name}
									</div>
									<div className='text-sm font-bold mt-2'>
										Last Name
									</div>
									<div className='text-gray-500 text-sm mt-2'>
										{basicData.last_name}
									</div>
									<div className='text-sm font-bold mt-2'>
										Email Address
									</div>
									<div className='text-gray-500 text-sm mt-2'>
										{basicData.email_address}
									</div>
								</div>
							</div>
							<RenderLEGOs
								getStudentProfileDefinitions={data.getStudentProfileDefinitions}
								studentProfileDataBlocks={studentProfile} />
						</div>}
					</div>
				</div>
			</Layout>
		</>
	)
}



// plural h. XD
const RenderLEGOs = ({ getStudentProfileDefinitions, studentProfileDataBlocks }) => {
	return (
		<div>
			{getStudentProfileDefinitions.map((e, indx) => {
				let { attribute_id, attribute_type }: { attribute_id: string, attribute_type: SupportedLEGOsTypes } = e;

				let data: { [key in string]: any } = studentProfileDataBlocks[attribute_id] ?? {};

				if (attribute_type === 'resume_type_11') {
					return (
						<ResumePilot
							key={indx}
							meta={e}
						/>
					)
				} else if (attribute_type === 'phone_number_type_4') {
					return (
						<PhoneNumberType4Pilot
							key={indx}
							meta={e}
						/>
					)
				} else if (attribute_type === 'date_type_1') {
					return (
						<DateType1Pilot
							key={indx}
							meta={e}
						/>
					)
				} else if (attribute_type === 'number_type_2') {
					return (
						<NumberType2Pilot
							key={indx}
							meta={e}
						/>
					)
				} else if (attribute_type === 'single_select_type_3') {
					return (
						<SingleSelectType3Pilot
							key={indx}
							meta={e}
						/>
					)
				} else if (attribute_type === 'multi_select_type_12') {
					return (
						<MultiSelectType12Pilot
							key={indx}
							meta={e}
						/>
					)
				} else if (attribute_type === 'email_type_6') {
					return (
						<EmailType6Pilot
							key={indx}
							meta={e}
						/>
					)
				} else if (attribute_type === 'address_type_5') {
					return (
						<AddressType5Pilot
							key={indx}
							meta={e}
						/>
					)

				} else if (attribute_type === 'current_course_type_7') {
					return (
						<CurrentCourseType7Pilot
							key={indx}
							meta={e}
						/>
					)

				} else if (attribute_type === 'education_type_8') {
					return (
						<EducationType8Pilot
							key={indx}
							meta={e}
						/>
					)
				} else if (attribute_type === 'project_type_10') {
					return (
						<ProjectType10Pilot
							key={indx}
							meta={e}
						/>
					)
				} else if (attribute_type === 'work_experience_type_9') {
					return (
						<WorkExperienceType9Pilot
							meta={e}
							key={indx}
						/>
					)
				}
				return <div>
					{JSON.stringify(e)}
					{JSON.stringify(data)}
				</div>;
			})}
		</div>
	)
}


export default StudentProfile;
