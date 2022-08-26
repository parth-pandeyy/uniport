import { RegisterAdminInput } from '../';
import * as yup from 'yup';
import { onlyAlphaBets } from './RegisterWithInvite';




// for backend
export const registerAdminInputValidationSchema: yup.SchemaOf<RegisterAdminInput> = yup.object().shape({
	first_name: onlyAlphaBets,
	last_name: onlyAlphaBets,
	email_address: yup.string().required().email(),
	password: yup.string().required().min(5),
	org_name: yup.string().required(),
})




// for frontend
export type RegisterAdminInputForm = RegisterAdminInput & {
	password_confirm: string;
}

export const registerAdminInputFormValidationSchema: yup.SchemaOf<RegisterAdminInputForm> = registerAdminInputValidationSchema.shape({
	password_confirm: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords are different').required('Please confirm the password'),
})


