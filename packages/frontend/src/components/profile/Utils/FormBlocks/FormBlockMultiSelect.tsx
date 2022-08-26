import { useField } from "formik"
import Select from 'react-select';
import { Option } from "react-select/src/filters";

export const FormBlockMultiSelect = ({ id, label, options }: {
	id: string,
	label: string,
	options: { value: string, label: string }[]
}) => {
	const [field, meta, helpers] = useField({ type: 'text', name: id })
	const { setValue } = helpers;
	const { error, touched } = meta;

	const getValue = () => {
		if (options) {
			return options.filter(option => field.value.indexOf(option.value) >= 0)
		} else {
			return []
		}
	};

	return (
		<div className="mb-4">
			<div className='grid grid-cols-2 items-center my-2'>
				<label className="block text-gray-700 text-sm font-bold" htmlFor={id}>
					{label}
				</label>
				<Select
					name={id}
					onChange={(option) => {
						setValue((option as Option[]).map((item: Option) => item.value))
					}}
					isMulti={true}
					value={getValue()}
					multiple={true}
					className='shadow border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					options={options.map((e, indx) => (
						{
							value: e.value,
							label: e.label
						}
					))}
				/>

				{error &&
					touched &&
					<p className="text-red-500 text-xs mt-1">
						{error}
					</p>}
			</div>
		</div>
	)
}
