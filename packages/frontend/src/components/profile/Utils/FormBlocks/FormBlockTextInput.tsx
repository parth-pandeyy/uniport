import { ErrorMessage, Field } from "formik"

// must be used inside Formik
export const FormBlockTextInput = ({ placeholder, id, label }) => {
	return (
		<div className="mb-4">
			<div className='grid grid-cols-2 items-center my-2'>
				<label className="block text-gray-700 text-sm font-bold" htmlFor={id}>
					{label}
				</label>
				<Field
					id={id}
					type='text'
					name={id}
					placeholder={placeholder}
					required={true}
					className='shadow appearance-none border rounded text-sm w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				/>
				<p className="text-red-500 text-xs mt-1">
					<ErrorMessage name={id} />
				</p>
			</div>
		</div>
	)
}
