import { useFormik } from 'formik';
// import { useS3Upload } from 'next-s3-upload';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import axiosInstance from '../APIs/axiosInstance';
import { AccountInfoValidationSchema } from '../utils/validation_shema';


const initialValues = {
    old: '',
    new: '',
    confirm: ''
}



const UseFetchSetting = () => {

    const [accountLoading, setAccountLoading] = useState(false);
   

   
    const [updated, setUpdated] = useState(false);
   
  

    const enableAccountLoading = () => {
        setAccountLoading(true);
    };

    const disableAccountLoading = () => {
        setAccountLoading(false);
    };

    


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: AccountInfoValidationSchema,
        onSubmit: (values, { setSubmitting, setStatus, resetForm }) => {
            enableAccountLoading();
            setTimeout(() => {
                const data = { oldPassword: values.old, newPassword: values.new }
                axiosInstance.changePassword(data)
                    .then(({ data: { message } }) => {
                        swal({
                            text: message,
                            timer: 3000,
                            icon: 'success',
                            dangerMode: true,
                            buttons: false
                        })
                        resetForm(initialValues);
                        disableAccountLoading();
                        setUpdated(true);
                    })
                    .catch(e => {
                        console.log("error in api: ", e.response.data.message);
                        swal({
                            text: e.response.data.message,
                            timer: 3000,
                            icon: 'error',
                            dangerMode: true,
                            buttons: false
                        })
                        disableAccountLoading();
                    })
            }, 1000);
        },
    });

    return {
        accountLoading, formik
        // personalInfo, personalLoading, businessCard, countryCode,
        // imageUrl, _Update, _OnChange, _DeleteImg, handleFileChange, FileInput, openFileDialog,
        // _ChangeCountryCode, onChangeBusinessWebsite
    }
}

export default UseFetchSetting;
