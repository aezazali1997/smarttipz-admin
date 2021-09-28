/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { Plus } from 'assets/SVGs';
import axiosInstance from '../../APIs/axiosInstance';
import { Button, Searchbar, Spinner, Modal, AdminForm } from '../../components';
import { CreateAdminValidationSchema, OptionalAdminSchema } from 'utils/validation_shema';


const initials = {
    name: '',
    email: '',
    password: '',
}

const Dashboard = () => {

    const color = "light";
    const [users, setUsers] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [modalTitle, setModalTitle] = useState('Create Admin');
    const [initialValues, setInitialValues] = useState(initials);

    useEffect(() => {
        enableLoading();
        axiosInstance.getAllUsers().then(({ data: { data: { users } } }) => {
            setUsers(users);
            disableLoading();
        }).catch((e) => {
            console.log('API Error: ', e);
            disableLoading();
        })
    }, [])

    useEffect(() => { }, [users, initialValues]);


    const enableLoading = () => {
        setIsLoading(true);
    }
    const disableLoading = () => {
        setIsLoading(false);
    }

    const ToggleCreateModal = () => {
        setInitialValues(initials);
        setModalTitle('Create Admin');
        setShowModal(!showModal);
    }

    const ToggleEditModal = (name, email) => {
        setInitialValues({
            name, email, password: ''
        });
        setModalTitle('Edit Admin');
        setShowModal(!showModal);
    }


    const ToggleAccessModal = () => {
        setModalTitle('Access View');
        setShowModal(!showModal);
    }



    const _OnDelete = (id) => {
        console.log('ID to delete: ', id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
                cancelButton: 'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // axiosInstance.deleteTestimonial(data?.id).then(({ data: { message } }) => {
                // 	Swal.fire({
                // 		text: message,
                // 		icon: 'success',
                // 		timer: 3000,
                // 		showCancelButton: false,
                // 		showConfirmButton: false
                // 	})
                // 	let copyOriginal = [...testimonial];
                // 	let updatedArray = copyOriginal.filter(item => item.id !== data?.id ? item : '');
                // 	setTestimonial(updatedArray);
                // })
                // 	.catch(e => {
                // 		Swal.fire({
                // 			text: e.response.data.message,
                // 			icon: 'error',
                // 			timer: 3000,
                // 			showCancelButton: false,
                // 			showConfirmButton: false
                // 		})
                // 	})
            }
        })
    }


    const _OnSubmit = (values, setSubmitting) => {
        setSubmitting(true);
        console.log('values: ', values);
        setSubmitting(false);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: (modalTitle === 'Create Admin' ? CreateAdminValidationSchema : OptionalAdminSchema),
        validateOnBlur: true,
        onSubmit: (values, { setSubmitting }) => {
            _OnSubmit(values, setSubmitting)
        },

    });


    return (
        <div className="bg-white py-5 px-3 space-y-3">
            <div className="flex w-full">
                <Searchbar />
            </div>
            {
                loading ? (
                    <div className="flex w-full justify-center">
                        <span className="flex flex-col items-center">
                            <Spinner />
                            <p className="text-sm text-gray-400"> Fetching Admins</p>
                        </span>
                    </div>
                )
                    :
                    <div
                        className={
                            "relative flex flex-col min-w-0 break-words w-full admin-table rounded-lg"}
                    >
                        {/* <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg " +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Card Tables
                            </h3>
                        </div>
                    </div>
                </div> */}
                        <div className="block w-full overflow-x-auto">
                            {/* Projects table */}
                            <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    <tr>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        >
                                            Business Name
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        >
                                            Business Number
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        >
                                            Business Website
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        >
                                            Business Website
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        >
                                            Business Email
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2">
                                    {
                                        users.map(({ name, email, picture, id }, index) => (
                                            <tr key={index}>
                                                <td className="border-t-0 w-max space-x-3 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-4 text-left flex items-center">
                                                    {/* <img
                                                        src={picture}
                                                        className="h-12 w-12 bg-white rounded-full border"
                                                        alt="..."
                                                    /> */}
                                                    <span
                                                        className={
                                                            "font-bold text-blueGray-600"
                                                        }
                                                    >
                                                        {name}
                                                    </span>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {email}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-circle text-orange-500 mr-2"></i>
                                                    {'******'}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                                                    <div onClick={() => ToggleAccessModal()} className="flex hover:underline hover:font-semibold text-md cursor-pointer text-purple-600">
                                                        View
                                                    </div>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div className="flex justify-between w-full space-x-2">
                                                        <Button
                                                            // onSubmit={ToggleCreateModal}
                                                            type="button"
                                                            childrens={'Verify'}
                                                            classNames={"px-3 py-2 flex justify-center items-center text-white text-sm btn rounded-md"}
                                                        />
                                                        <Button
                                                            // onSubmit={ToggleCreateModal}
                                                            type="button"
                                                            childrens={'Delete'}
                                                            classNames={"px-3 py-2 flex justify-center items-center text-white text-sm btn rounded-md"}
                                                        />

                                                    </div>
                                                </td>
                                                {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                <TableDropdown />
                            </td> */}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
            {
                showModal && (
                    modalTitle === 'Access View' ?
                        <Modal
                            _Toggle={ToggleAccessModal}
                            title={modalTitle}
                            body={(
                                <div className="flex w-full justify-center items-center">
                                    <div className="grid grid-cols-2 gap-6">
                                        <label className="flex items-center w-full">
                                            <input type="radio" className="form-radio" name="accountType" value="personal" />
                                            <span className="ml-2">Admin</span>
                                        </label>
                                        <label className="flex items-center w-full">
                                            <input type="radio" className="form-radio" name="accountType" value="busines" />
                                            <span className="ml-2">Business Verification</span>
                                        </label>
                                        <label className="flex items-center w-full">
                                            <input type="radio" className="form-radio" name="accountType" value="personal" />
                                            <span className="ml-2">Manage Users</span>
                                        </label>
                                        <label className="flex items-center w-full">
                                            <input type="radio" className="form-radio" name="accountType" value="busines" />
                                            <span className="ml-2">Content Management</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                            footer={(
                                <>
                                    <button
                                        onClick={ToggleAccessModal}
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <Button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                        childrens={'Done'}
                                        loading={formik.isSubmitting}
                                    />

                                </>
                            )}
                        />
                        :
                        <form onSubmit={formik.handleSubmit}>
                            <Modal
                                _Toggle={modalTitle === 'CreateAdmin' ? ToggleCreateModal : ToggleEditModal}
                                title={modalTitle}
                                body={(
                                    <>
                                        <AdminForm
                                            formik={formik}
                                            showPassword={showPassword}
                                            setShowPassword={setShowPassword}
                                        />
                                    </>
                                )}
                                footer={(
                                    <>
                                        <button
                                            onClick={modalTitle === 'CreateAdmin' ? ToggleCreateModal : ToggleEditModal}
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <Button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                            childrens={modalTitle === 'Create Admin' ? 'Submit' : 'Save'}
                                            loading={formik.isSubmitting}

                                        />

                                    </>
                                )}
                            />
                        </form>

                )
            }
        </div>
    )
}

export default Dashboard;
