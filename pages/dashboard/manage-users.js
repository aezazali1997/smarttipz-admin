/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { Plus } from 'assets/SVGs';
import axiosInstance from '../../APIs/axiosInstance';
import { Button, Searchbar, Spinner, Modal, AdminForm } from '../../components';
import { CreateAdminValidationSchema, OptionalAdminSchema } from 'utils/validation_shema';
import useDebounce from 'utils/Debounce';

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
    const [search, setSearch] = useState('');
    const debouncedSearchTerm = useDebounce(search, 1000);

    const FetchPersonalUsers = async (search) => {
        enableLoading();
        try {
            const { data: { data: { users } } } = await axiosInstance.getAllPersonalUsers(search)
            setUsers(users);
            disableLoading();
        }
        catch (e) {
            console.log('API Error: ', e);
            disableLoading();
        }
    }


    useEffect(() => {
        FetchPersonalUsers(search);
    }, [])

    useEffect(() => {
        // if (debouncedSearchTerm) {
        FetchPersonalUsers(debouncedSearchTerm);
        // }
    }, [debouncedSearchTerm])

    useEffect(() => { }, [users, initialValues]);


    const enableLoading = () => {
        setIsLoading(true);
    }
    const disableLoading = () => {
        setIsLoading(false);
    }

    const ToggleEditModal = (id, name, email) => {
        setInitialValues({
            id, name, email, password: ''
        });
        setModalTitle('Edit Personal User');
        setShowModal(!showModal);
    }

    const SwalDeleteModal = (text, confirmBtnText, onConfirmAction) => {
        Swal.fire({
            title: 'Are you sure?',
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: confirmBtnText,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'w-full inline-flex justify-center rounded-md border-none px-4 py-2 primary-btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
                cancelButton: 'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm',
            }

        }).then((result) => {
            if (result.isConfirmed) {
                onConfirmAction();
            }
        })
    }



    const _OnDelete = (id) => {
        axiosInstance.deletePersonalUser(id).then(({ data: { message } }) => {
            Swal.fire({
                text: message,
                icon: 'success',
                timer: 3000,
                showCancelButton: false,
                showConfirmButton: false
            })
            let copyOriginal = [...users];
            let updatedArray = copyOriginal.filter(item => item.id !== id && item);
            setUsers(updatedArray);
        })
            .catch(({ response: { data: { message } } }) => {
                Swal.fire({
                    text: message,
                    icon: 'error',
                    timer: 3000,
                    showCancelButton: false,
                    showConfirmButton: false
                })
            })
    }

    const _HandleDelete = (id) => {
        console.log('ID to delete: ', id);
        SwalDeleteModal("You won't be able to revert this!", "Delete", () => _OnDelete(id))
    }


    const _OnEditPersonalUser = (values, setSubmitting) => {
        setSubmitting(true);
        console.log('values: ', values);
        axiosInstance.editPersonalUser(values).then(({ data: { message, data } }) => {
            Swal.fire({
                text: message,
                icon: 'success',
                timer: 3000,
                showConfirmButton: false,
                showCancelButton: false
            })
            const copyOriginalArray = [...users];
            const updatedData = copyOriginalArray.map(user => {
                if (user.id !== values.id) return user;
                else {
                    user.name = values.name
                    user.email = values.email
                    return user;
                }
            })
            console.log({ updatedData });
            setUsers(updatedData);
            ToggleEditModal();
            setSubmitting(false);
        }).catch(({ response: { data: { message } } }) => {
            Swal.fire({
                text: message,
                icon: 'error',
                timer: 3000,
                showConfirmButton: false,
                showCancelButton: false
            })
            setSubmitting(false);
        })
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: (OptionalAdminSchema),
        validateOnBlur: true,
        onSubmit: (values, { setSubmitting }) => {
            _OnEditPersonalUser(values, setSubmitting)
        },
    });



    return (
        <div className="bg-white py-5 px-3 space-y-3 h-screen">
            <div className="flex w-full">
                <Searchbar search={search} onChange={setSearch} />
            </div>
            {
                loading ? (
                    <div className="flex w-full h-4/5 justify-center items-center">
                        <span className="flex flex-col items-center">
                            <Spinner />
                            {/* <p className="text-sm text-gray-400"> Fetching Admins</p> */}
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
                                            Name
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        >
                                            Username
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        >
                                            Email
                                        </th>

                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        >
                                            Phone Number
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        >
                                            Actions
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
                                        users.map(({ name, email, id, username, phoneNumber }, index) => (
                                            <tr key={index}>
                                                <td className="border-t-0 w-max space-x-3 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-4 text-left flex items-center">
                                                    <span
                                                        className={
                                                            "font-bold text-blueGray-600"
                                                        }
                                                    >
                                                        {name}
                                                    </span>
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-circle text-orange-500 mr-2"></i>
                                                    {username}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {email}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                                                    <div className="flex  text-xs cursor-pointer ">
                                                        {phoneNumber}
                                                    </div>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div className="flex justify-start w-full ">
                                                        {/* <p onClick={() => ToggleEditModal(id, name, email)} className="flex items-center cursor-pointer">
                                                            <svg className="w-5 h-5 icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                            </svg>
                                                        </p> */}
                                                        <p onClick={() => _HandleDelete(id)} className="flex items-center cursor-pointer">
                                                            <svg className="w-5 h-5 icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </p>
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
                    <form onSubmit={formik.handleSubmit}>
                        <Modal
                            _Toggle={ToggleEditModal}
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
                                        onClick={ToggleEditModal}
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <Button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 primary-btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                        childrens={'Save'}
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
