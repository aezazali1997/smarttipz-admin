/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import axiosInstance from 'APIs/axiosInstance';
import { Button, Searchbar, Spinner, Modal, AdminForm, CategoryFilter } from 'components';
import { CreateAdminValidationSchema, OptionalAdminSchema } from 'utils/validation_shema';
import { useRouter } from 'next/router';

const initials = {
    name: '',
    email: '',
    password: '',
}

const Dashboard = () => {

    // const router = useRouter();
    // const { asPath, query } = router;
    // const { active } = query;
    // console.log(`${query}, ${active}`)

    const color = "light";
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [modalTitle, setModalTitle] = useState('Create Admin');
    const [initialValues, setInitialValues] = useState(initials);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        // if (active) {
        enableLoading();
        axiosInstance.getAllUsers().then(({ data: { data: { users } } }) => {
            setAllUsers(users)
            setUsers(users);
            disableLoading();
        }).catch((e) => {
            console.log('API Error: ', e.message);
            Swal.fire({
                text: "Something went wrong with server, refresh page",
                icon: 'info',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 4000
            });
            disableLoading();
        })
        // }
    }, [])

    useEffect(() => { }, [users, initialValues, activeCategory]);


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

    let Active = (path) => {
        console.log(path)
        return activeCategory === path ?
            'background text-white' : 'text bg-white'
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
                confirmButton: 'w-full inline-flex justify-center rounded-md border-none px-4 py-2 primary-btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
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


    const handleActiveTab = (category) => {
        console.log('category: ', category);
        let filtered = [];
        if (category === 'verified') {
            filtered = allUsers.filter(user => user.isApproved === true && user);
            setUsers(filtered);
        }
        else if (category === 'unverified') {
            filtered = allUsers.filter(user => user.isApproved === false && user)
            setUsers(filtered);
        }
        else {
            setUsers(allUsers);
        }
        setActiveCategory(category);
    }


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
                        {/* <div className="flex rounded-t px-4 py-3 border-0 mb-10 justify-center">
                            <div className="flex items-center w-full">
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
                        <div className="flex w-full justify-center items-center mb-5 py-3 px-3">
                            <CategoryFilter
                                Active={Active}
                                handleActiveTab={handleActiveTab}
                            />
                        </div>
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
                                        users.map(({ name, email, isApproved, id }, index) => (
                                            <tr key={index} className={isApproved ? 'admin-table' : 'unverified'}>
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
                                                    MarkX@yahoo.com
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                                                    {
                                                        isApproved ?
                                                            <div className="flex justify-around w-full space-x-2">
                                                                <p onClick={() => ToggleEditModal(name, email)} className="flex items-center cursor-pointer">
                                                                    <svg className="w-5 h-5 icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                                    </svg>
                                                                </p>
                                                                <p onClick={() => _OnDelete(id)} className="flex items-center cursor-pointer">
                                                                    <svg className="w-5 h-5 icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                    </svg>
                                                                </p>
                                                            </div>
                                                            :
                                                            <div className="flex justify-around w-full space-x-3">
                                                                <Button
                                                                    // onSubmit={ToggleCreateModal}
                                                                    type="button"
                                                                    childrens={'Verify'}
                                                                    classNames={"px-3 py-2 flex w-28 justify-center items-center text-white text-sm primary-btn rounded-md"}
                                                                />
                                                                <Button
                                                                    // onSubmit={ToggleCreateModal}
                                                                    type="button"
                                                                    childrens={'Block'}
                                                                    classNames={"px-3 py-2 w-28 flex justify-center items-center text-white text-sm danger-btn rounded-md"}
                                                                />
                                                            </div>
                                                    }
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
                                        className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 primary-btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
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
                                            className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 primary-btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
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
