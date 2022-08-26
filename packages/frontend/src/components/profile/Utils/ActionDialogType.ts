import { Dispatch, SetStateAction } from "react";


export type ActionDialogType<T> = {
	setOpen: Dispatch<SetStateAction<boolean>>,
	open: boolean,
	initialValues: T,
	handleSubmit: any,
	errorMessage: string,
	waitingForServerResponse: boolean,
	successMessage: string,
	// for heading of the action dialog
	label: string
}
