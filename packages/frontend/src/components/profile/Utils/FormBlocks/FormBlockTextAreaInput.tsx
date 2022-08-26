import { ErrorMessage, Field } from "formik"

// must be used inside Formik
export const FormBlockTextAreaInput = ({ placeholder, id, label }) => {
	return (
		<div className="mb-4">
			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
				{label}
			</label>
			<Field name={id}
				type='textarea'
				id={id}
				as='textarea'
				autoComplete='off'
				rows={4}
				placeholder={placeholder}
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			/>
			<p className="text-red-500 text-xs mt-1">
				<ErrorMessage name={id} />
			</p>
		</div>


	)
}

