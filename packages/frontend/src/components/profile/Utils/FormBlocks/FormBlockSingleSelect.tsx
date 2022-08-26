import { useField } from "formik"


export const FormBlockSingleSelect = ({ id, label, options }: {
	id: string,
	label: string,
	options: { value: string, label: string }[]
}) => {
	const [field, meta, helpers] = useField({ type: 'text', name: id })
	const { setValue } = helpers;
	const { error, touched } = meta;

	return (
		<div className="mb-4">
			<div className='grid grid-cols-2 items-center my-2'>
				<label className="block text-gray-700 text-sm font-bold" htmlFor={id}>
					{label}
				</label>
				<select
					name={id}
					onChange={(event) => {
						setValue(event.target.value)
					}}
					value={field.value}
					className='shadow border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				>
					<option value='' label='Select an option' />
					{options.map((e, indx) => (
						<option key={indx} value={e.value} label={e.label} />
					))}
				</select>

				{error &&
					touched &&
					<p className="text-red-500 text-xs mt-1">
						{error}
					</p>}
			</div>
		</div>
	)
}
