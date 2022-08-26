import * as yup from 'yup';
import { RegisterWithValidInviteInput } from '../types/graphql';


export const onlyAlphaBets = yup.string().min(2, 'Too Short!')
	.max(50, 'Too Long!').required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ");


// for backend
export const registerWithValidInviteInputValidationSchema: yup.SchemaOf<RegisterWithValidInviteInput> = yup.object().shape({
	first_name: onlyAlphaBets,
	last_name: onlyAlphaBets,
	email_address: yup.string().required().email(),
	password: yup.string().required().min(5),
})




// for frontend
export type RegisterWithValidInviteInputForm = RegisterWithValidInviteInput & {
	password_confirm: string;
}

export const registerWithValidInviteInputFormValidationSchema: yup.SchemaOf<RegisterWithValidInviteInputForm> = registerWithValidInviteInputValidationSchema.shape({
	password_confirm: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords are different').required('Please confirm the password'),
})


