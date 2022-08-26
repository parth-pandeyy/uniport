import { ErrorMessage, useField } from "formik";



export const FormBlockFileInput = ({ id, label }) => {
	const [field, meta, helpers] = useField({ type: 'file', name: id, });
	const { setValue } = helpers;

	return (
		<div className="mb-4">
			<div className='grid grid-cols-2 items-center my-2'>
				<label className="block text-gray-700 text-sm font-bold" htmlFor={id}>
					{label}
				</label>
				<input
					id={id}
					type='file'
					name={id}
					accept='application/pdf'
					onChange={(event) => setValue(event.currentTarget.files[0])}
					className='shadow appearance-none border rounded text-sm w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				/>
				<p className="text-red-500 text-xs mt-1">
					<ErrorMessage name={id} />
				</p>
			</div>
		</div>
	)
}
