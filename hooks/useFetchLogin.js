import React, { useEffect, useState } from 'react'
import cookie from 'js-cookie';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import axiosInstance from '../APIs/axiosInstance';
import { LoginSchema } from 'utils/validation_shema';



const UseFetchLogin = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
    }, [showAlert])

    const toggleAlert = () => {
        setShowAlert(false);
    }

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const initialValues = {
        email: '',
        password: '',
        checked: false
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: LoginSchema,
        validateOnBlur: true,
        onSubmit: ({ email, password }, { setSubmitting, setStatus }) => {
            enableLoading();
            setTimeout(() => {
                const data = { email, password }
                axiosInstance.login(data)
                    .then(({ data: { data: { username, token, image, id }, message } }) => {
                        disableLoading();
                        setError(false);
                        setStatus(message);
                        setShowAlert(true);
                        cookie.set('token', token);
                        cookie.set('username', username);
                        localStorage.setItem('image', image);
                        localStorage.setItem('id', id);
                        router.push('/dashboard/admin');
                    })
                    .catch((e) => {
                        console.log(e.response.status);
                        setError(true)
                        // setSubmitting(false);
                        setStatus(e.response.data.message);
                        setShowAlert(true);
                        disableLoading();

                    });
            }, 1000);

        },

    });


    return { toggleAlert, showPassword, setShowPassword, showAlert, formik, loading, error };
}

export default UseFetchLogin;
