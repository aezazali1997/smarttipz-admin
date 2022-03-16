/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import {
  Button,
  Searchbar,
  Spinner,
  Modal,
  AdminForm,
  CategoryFilter,
  Badge,
} from "components";
import {
  CreateAdminValidationSchema,
  OptionalBusinessVerificationSchema,
} from "utils/validation_shema";
import useDebounce from "utils/Debounce";
import { PreviewEye } from "assets/SVGs";
import axiosInstance from "APIs/axiosInstance";
// import Profile from './preview/[username]profile';

const initials = {
  name: "",
  email: "",
  password: "",
};

const Dashboard = () => {
  const router = useRouter();
  const color = "light";
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalTitle, setModalTitle] = useState("Create Admin");
  const [initialValues, setInitialValues] = useState(initials);
  const [activeCategory, setActiveCategory] = useState("All");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1000);

  const FetchBusinessVerificationUsers = async (search) => {
    enableLoading();
    try {
      const {
        data: {
          data: { users },
        },
      } = await axiosInstance.getAllBusinessUsers(search);
      console.log("users", users);
      setAllUsers(users);
      setUsers(users);
      disableLoading();
    } catch (e) {
      console.log("API Error: ", e);
      Swal.fire({
        text: e,
        icon: "info",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 4000,
      });
      disableLoading();
    }
  };

  useEffect(() => {
    FetchBusinessVerificationUsers(search);
  }, []);

  useEffect(() => {
    // if (debouncedSearchTerm) {
    FetchBusinessVerificationUsers(debouncedSearchTerm);
    // }
  }, [debouncedSearchTerm]);

  useEffect(() => {}, [users, initialValues, activeCategory]);

  const enableLoading = () => {
    setIsLoading(true);
  };

  const disableLoading = () => {
    setIsLoading(false);
  };

  const ToggleEditModal = (id, name, email, phoneNumber, link) => {
    setInitialValues({
      id,
      name,
      email,
      password: "",
      website: link,
    });
    setPhone(phoneNumber);
    setWebsite(link);
    setModalTitle("Edit Business User");
    setShowPassword(false);
    setShowModal(!showModal);
  };

  let Active = (path) => {
    return activeCategory === path
      ? "background text-white z-20"
      : "text bg-white";
  };

  const SwalDeleteModal = (text, confirmBtnText, onConfirmAction) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      html: `<p class='text-red-600'>${text}</p>`,
      showCancelButton: true,
      confirmButtonText: confirmBtnText,
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "w-full inline-flex justify-center rounded-md border-none px-4 py-2 primary-btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm",
        cancelButton:
          "mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirmAction();
      }
    });
  };

  const _OnDelete = (id) => {
    axiosInstance
      .deleteBusinessUser(id)
      .then(({ data: { message } }) => {
        Swal.fire({
          text: message,
          icon: "success",
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
          html: true,
        });
        let copyOriginal = [...users];
        let updatedArray = copyOriginal.filter(
          (item) => item.id !== id && item
        );
        setUsers(updatedArray);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          Swal.fire({
            text: message,
            icon: "error",
            timer: 3000,
            showCancelButton: false,
            showConfirmButton: false,
          });
        }
      );
  };

  const _HandleDelete = (id) => {
    console.log("ID to delete: ", id);
    SwalDeleteModal("You won't be able to revert this!", "Delete", () =>
      _OnDelete(id)
    );
  };

  const _OnBlock = (id, isBlocked) => {
    axiosInstance
      .blockBusinessUser({ id, isBlocked })
      .then(({ data: { data, message } }) => {
        Swal.fire({
          text: message,
          icon: "success",
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
        });
        let copyOriginal = [...users];
        let updatedArray = copyOriginal.map((user) => {
          if (user.id !== id) return user;
          else {
            user.isBlocked = !isBlocked;
            return user;
          }
        });
        setUsers(updatedArray);
      });
  };

  const _HandleBlock = (id, isBlocked) => {
    SwalDeleteModal("", isBlocked ? "Unblock" : "Block", () =>
      _OnBlock(id, isBlocked)
    );
  };

  const _Onverify = (id) => {
    axiosInstance.verifyBusinessUser({ id }).then(({ data: { message } }) => {
      Swal.fire({
        text: message,
        icon: "success",
        timer: 3000,
        showCancelButton: false,
        showConfirmButton: false,
      });
      let copyOriginal = [...users];
      let updatedArray = copyOriginal.map((user) => {
        if (user.id !== id) return user;
        else {
          user.isApproved = true;
          return user;
        }
      });
      setUsers(updatedArray);
    });
  };

  const _HandleVerify = (id) => {
    SwalDeleteModal("You want to verify this user", "Verify", () =>
      _Onverify(id)
    );
  };

  const _OnEditVerifiedUser = (values, setSubmitting) => {
    setSubmitting(true);
    values.phoneNumber = phone;
    // console.log('values: ', values);
    axiosInstance
      .editVerifiedBusinessUser(values)
      .then(({ data: { message, data } }) => {
        Swal.fire({
          text: message,
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          showCancelButton: false,
        });
        const copyOriginalArray = [...users];
        const updatedData = copyOriginalArray.map((user) => {
          if (user.id !== values.id) return user;
          else {
            user.name = values.name;
            user.email = values.email;
            user.phoneNumber = phone;
            user.Business.link = values.website;
            return user;
          }
        });
        console.log({ updatedData });
        setUsers(updatedData);
        ToggleEditModal();
        setSubmitting(false);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          Swal.fire({
            text: message,
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
            showCancelButton: false,
          });
          setSubmitting(false);
        }
      );
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: OptionalBusinessVerificationSchema,
    validateOnBlur: true,
    onSubmit: (values, { setSubmitting }) => {
      _OnEditVerifiedUser(values, setSubmitting);
    },
  });

  const handleActiveTab = (category) => {
    let filtered = [];
    if (category === "Verified") {
      filtered = allUsers.filter((user) => user.isApproved === true && user);
      setUsers(filtered);
    } else if (category === "Unverified") {
      filtered = allUsers.filter((user) => user.isApproved === false && user);
      setUsers(filtered);
    } else {
      setUsers(allUsers);
    }
    setActiveCategory(category);
  };

  const _OnPhoneNoChange = (value) => {
    setPhone(value);
  };

  const _PreviewProfile = async (username) => {
    router.push(`/dashboard/business-verification/preview/${username}`);
  };

  return (
    <div className={`bg-white py-5 px-3 space-y-3 h-screen`}>
      <Helmet>
        <title>Bussiness Varification | Smart Tipz Admin Panel</title>
      </Helmet>
      <div className="flex w-full bg-white sticky top-0">
        <Searchbar search={search} onChange={setSearch} />
      </div>
      {loading ? (
        <div className="flex w-full h-4/5 justify-center items-center">
          <span className="flex flex-col items-center">
            <Spinner />
            {/* <p className="text-sm text-gray-400"> Fetching Admins</p> */}
          </span>
        </div>
      ) : (
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full admin-table rounded-lg"
          }
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
            <CategoryFilter Active={Active} handleActiveTab={handleActiveTab} />
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Status
                  </th>
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
                      " px-8 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2">
                {users.map(
                  (
                    {
                      name,
                      email,
                      isApproved,
                      id,
                      phoneNumber,
                      isBlocked,
                      Business,
                      username,
                    },
                    index
                  ) => (
                    <tr key={index} className={"admin-table"}>
                      <td className="space-x-2 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Badge
                          color={
                            isBlocked
                              ? "bg-red-400"
                              : isApproved
                              ? "bg-green-400"
                              : "bg-yellow-300"
                          }
                          childrens={
                            isBlocked
                              ? "Blocked"
                              : isApproved
                              ? "Verified"
                              : "Unverified"
                          }
                        />
                      </td>
                      <td className="border-t-0 w-max space-x-3 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-4 text-left flex items-center">
                        {/* <img
                                                        src={picture}
                                                        className="h-12 w-12 bg-white rounded-full border"
                                                        alt="..."
                                                    /> */}
                        <span className={"font-bold text-blueGray-600"}>
                          {name}
                        </span>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {phoneNumber}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {Business?.link}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                        {email}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                        {isApproved ? (
                          <div className="flex justify-around w-full space-x-2">
                            <span
                              className="flex items-center cursor-pointer"
                              onClick={() => _PreviewProfile(username)}
                            >
                              <PreviewEye classNames={"text w-5 h-5"} />
                            </span>

                            <p
                              onClick={() =>
                                ToggleEditModal(
                                  id,
                                  name,
                                  email,
                                  phoneNumber,
                                  Business?.link,
                                  Business?.id
                                )
                              }
                              className="flex items-center cursor-pointer"
                            >
                              <svg
                                className="w-5 h-5 icon"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path
                                  fillRule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </p>
                            <p
                              onClick={() => _HandleDelete(id)}
                              className="flex items-center cursor-pointer"
                            >
                              <svg
                                className="w-5 h-5 icon"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </p>
                            <Button
                              onSubmit={() => _HandleBlock(id, isBlocked)}
                              type="button"
                              childrens={isBlocked ? "Unblock" : "Block"}
                              classNames={
                                "px-1 py-1 w-20 flex justify-center items-center hover:underline cursor-pointer text-sm text-danger rounded-md"
                              }
                            />
                          </div>
                        ) : (
                          <div className="flex justify-around w-full space-x-2">
                            <span
                              className="flex items-center cursor-pointer"
                              onClick={() => _PreviewProfile(username)}
                            >
                              <PreviewEye classNames={"text w-5 h-5"} />
                            </span>

                            <Button
                              onSubmit={() => _HandleVerify(id)}
                              type="button"
                              disable={isBlocked}
                              childrens={"Verify"}
                              classNames={`px-1 py-1 flex w-20 justify-center items-center hover:underline cursor-pointer text-sm 
																	${isBlocked ? "disable-text" : "text"}  rounded-md`}
                            />

                            <Button
                              onSubmit={() => _HandleBlock(id, isBlocked)}
                              type="button"
                              childrens={isBlocked ? "Unblock" : "Block"}
                              classNames={
                                "px-1 py-1 w-20 flex justify-center items-center hover:underline cursor-pointer text-sm text-danger rounded-md"
                              }
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <form onSubmit={formik.handleSubmit}>
          <Modal
            _Toggle={ToggleEditModal}
            title={modalTitle}
            body={
              <>
                <AdminForm
                  formik={formik}
                  businessUser={true}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  _OnPhoneNoChange={_OnPhoneNoChange}
                  phoneNumber={phone}
                />
              </>
            }
            footer={
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
                  childrens={"Save"}
                  loading={formik.isSubmitting}
                />
              </>
            }
          />
        </form>
      )}
    </div>
  );
};

export default Dashboard;
