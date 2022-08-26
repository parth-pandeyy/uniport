import { Formik, Form, Field, ErrorMessage } from 'formik';

// A helper component to render the forms with dynamic fields.
// Currently supports only <input/> fields
const UniversalForm = ({ initialValues, formFieldsValidationSchema, handleSubmit, formFields }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formFieldsValidationSchema}
            onSubmit={handleSubmit}
        >

            <Form className='text-black' autoComplete='off'>

                {formFields.map((e, indx) => {
                    return (
                        <div className="mb-4" key={indx}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={e.id}>
                                {e.label}
                            </label>
                            <Field name={e.id} type={e.type}
                                id={e.id}
                                autoComplete='off'
                                placeholder={e.placeholder}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                            <p className="text-red-500 text-xs mt-1">
                                <ErrorMessage name={e.id} />
                            </p>
                        </div>
                    )
                })}

                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </div>
            </Form>
        </Formik>
    )
}

export default UniversalForm;