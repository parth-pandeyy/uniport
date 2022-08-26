import { resume_type_11_DataBlock, resume_type_11_InputPayload, work_experience_type_9_DataBlock, work_experience_type_9_InputPayload } from "@uniport/common";
import create from "zustand";


// stores the student profile of any 1 user
// facilitates editing, adding new block to profile operations seamless

type StudentProfileBlockInstance = {
	[key in string]: any
}

type StudentProfileBlocks = {
	[key in string]: StudentProfileBlockInstance
}



type AddStudentProfileDataPayload = {
	attribute_id: string,
	block_index: string,
	// setting the type definitions here is
	data: any
}

type Store = {
	studentProfile: StudentProfileBlocks,
	addOrEditStudentProfileBlockInstance: (payload: AddStudentProfileDataPayload) => void,
	setStudentProfile: (payload: StudentProfileBlocks) => void,
}


// local store to store the student profile(s)
// i.e. (open or closed)
export const useStudentProfileStore = create<Store>(set => ({
	studentProfile: {} as StudentProfileBlocks,
	addOrEditStudentProfileBlockInstance: (payload) => set((state) => {
		let updatedProfile = state.studentProfile;
		if (!updatedProfile[payload.attribute_id]) {
			updatedProfile[payload.attribute_id] = {}
		}
		updatedProfile[payload.attribute_id][payload.block_index] = payload.data
		return ({
			studentProfile: updatedProfile
		})
	}),
	setStudentProfile: (data) => set(state => ({ studentProfile: data }))
})
);

