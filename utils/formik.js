import { useFormik } from 'formik';


export const Formik = ({ initialValues, _OnSubmit, validationSchema }) => {
    return useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: validationSchema,
        validateOnBlur: true,
        onSubmit: (res, { setSubmitting, setStatus }) => {
            _OnSubmit(res);
        }
    });
}