/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Plus } from "assets/SVGs";
import axiosInstance from "../../APIs/axiosInstance";
import { Button, Searchbar, Spinner, Modal, AdminForm } from "../../components";
import {
  CreateAdminValidationSchema,
  OptionalAdminSchema,
} from "utils/validation_shema";
import useDebounce from "utils/Debounce";
import { OpenEye } from "assets/SVGs";
import { Helmet } from "react-helmet";

const initials = {
  name: "",
  email: "",
  password: "",
};

const Dashboard = () => {
  const color = "light";
  const [users, setUsers] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalTitle, setModalTitle] = useState("Create Admin");
  const [initialValues, setInitialValues] = useState(initials);
  const [access, setAccess] = useState([]);
  const [selected, setSelected] = useState("");
  const [selctedAccess, setSelectedAccess] = useState(false);
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const debouncedSearchTerm = useDebounce(search, 1000);

  const Permissions = [
    "Admin",
    "Manage Users",
    "Business Verification",
    "Content Management",
    "Withdraw Requests",
  ];

  const FetchAllAdmins = async (search = "") => {
    enableLoading();
    try {
      const {
        data: {
          data: { admins },
        },
      } = await axiosInstance.getAllAdmins(search);
      // console.log(admins);
      setUsers(admins);
      disableLoading();
    } catch (e) {
      console.log("API Error: ", e);
      disableLoading();
    }
  };

  useEffect(() => {
    FetchAllAdmins(search);
    return () => setUsers([]);
  }, []);

  useEffect(() => {}, [users, initialValues]);

  const enableLoading = () => {
    setIsLoading(true);

  };
  const disableLoading = () => {
    setIsLoading(false);
  };

  const ToggleCreateModal = () => {
    console.log("in create modal");
    setInitialValues(initials);
    setAccess([
      {
        name: "admin",
        value: false,
      },
      {
        name: "manageUsers",
        value: false,
      },
      {
        name: "businessVerification",
        value: false,
      },
      {
        name: "contentManagement",
        value: false,
      },
    ]);
    setModalTitle("Create Admin");
    setShowPassword(false);
    setShowModal(!showModal);
  };

  const ToggleEditModal = (id, name, email) => {
    setInitialValues({
      id,
      name,
      email,
      password: "",
    });
    setModalTitle("Edit Admin");
    setShowPassword(false);
    setShowModal(!showModal);
  };

  const OpenAccessModal = (id, permissions, role) => {
    console.log(`id: ${id}, permissions: ${JSON.stringify(permissions)}`);
    setAccess(permissions);
    setSelected(id);
    setModalTitle("Access View");
    setShowModal(!showModal);
  };
  const _CloseAccessModal = () => {
    setShowModal(!showModal);
  };

  const handleAccessChange = (e) => {
    const { checked, name, value } = e.target;
    let copyArray = [...access];
    copyArray.forEach((permission) => {
      if (permission.name === value) {
        permission.value = checked;
      }
    });
    copyArray.every((permission) => {
      if (permission.value === true) {
        setSelectedAccess(true);
        return false;
      } else {
        setSelectedAccess(false);
        return true;
      }
    });
    console.log({ copyArray });
    modalTitle === "Create Admin"
      ? setAccess(copyArray)
      : setInitialValues(copyArray);
  };

  const _OnAccess = () => {
    setIsSubmitting(true);
    console.log("permissions: ", access, selected);
    const payload = {
      permissions: access,
    };
    axiosInstance
      .setAdminAccess(selected, payload)
      .then(({ data: { message } }) => {
        Swal.fire({
          text: message,
          icon: "success",
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
        });
        const copyArray = [...users];
        const updatedUsers = copyArray.map((user) => {
          if (user.id !== selected) return user;
          else {
            user.permissions = access;
            return user;
          }
        });
        localStorage.setItem("permissions", JSON.stringify(access));
        setUsers(updatedUsers);
        _CloseAccessModal();
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
    setIsSubmitting(false);
  };

  const _OnDelete = (id) => {
    console.log("ID to delete: ", id);
    Swal.fire({
      title: "Are you sure?",
      html: `<p class='text-red-600'>You won't be able to revert this!</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "w-full inline-flex justify-center rounded-md border-none px-4 py-2 primary-btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm",
        cancelButton:
          "mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .deleteAdmin(id)
          .then(({ data: { message } }) => {
            Swal.fire({
              text: message,
              icon: "success",
              timer: 3000,
              showCancelButton: false,
              showConfirmButton: false,
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
      }
    });
  };

  const _OnSubmit = (values, setSubmitting) => {
    setIsSubmitting(true);
    // setSubmitting(true);
    values.permissions = access;
    console.log("values: ", values);
    axiosInstance
      .createAdmin(values)
      .then(({ data: { message, data } }) => {
        Swal.fire({
          text: message,
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          showCancelButton: false,
        });
        const copyOriginalArray = [...users];
        setUsers([...copyOriginalArray, values]);
        setSubmitting(false);
        setInitialValues(initials);
        ToggleCreateModal();
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
    setIsSubmitting(false);
  };

  const _OnEdit = (values, setSubmitting) => {
    setSubmitting(true);
    console.log("values: ", values);
    axiosInstance
      .editAdmin(values)
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
    validationSchema:
      modalTitle === "Create Admin"
        ? CreateAdminValidationSchema
        : OptionalAdminSchema,
    validateOnBlur: true,
    onSubmit: (values, { setSubmitting }) => {
      console.log("before: ", values);
      {
        modalTitle === "Create Admin"
          ? _OnSubmit(values, setSubmitting)
          : _OnEdit(values, setSubmitting);
      }
    },
  });

  return (
    <div className="px-3 py-5 space-y-3 bg-white ">
      <Helmet>
        <title>Admin | SmartTipz Admin</title>
      </Helmet>
      <div className="top-0 z-10 flex w-full bg-white">
        <Searchbar
          search={search}
          onChange={setSearch}
          fetch={FetchAllAdmins}
        />
      </div>
      <div className="flex justify-end w-full">
        <Button
          onSubmit={ToggleCreateModal}
          type="button"
          childrens={
            <>
              <Plus /> Create
            </>
          }
          classNames={
            "px-3 py-2 flex justify-center items-center text-white text-sm primary-btn rounded-md"
          }
        />
      </div>
      {loading ? (
        <Spinner />
      ) : isEmpty(users) ? (
        <div className="flex items-center justify-center w-full">
          <p className="text-gray-500"> No Admins Yet</p>
        </div>
      ) : (
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full admin-table rounded-lg"
          }
        >
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
                    Password
                  </th>
                  <th
                    className={
                      "  px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Access
                  </th>
                  <th
                    className={
                      " text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold  " +
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
                {users.map(
                  ({ name, email, picture, id, role, permissions }, index) => (
                    <tr key={index}>
                      <td className="flex items-center p-4 px-6 space-x-3 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 w-max whitespace-wrap">
                        <span className={"font-bold text-blueGray-600"}>
                          {name}
                        </span>
                      </td>
                      <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                        {email}
                      </td>
                      {role != "superadmin" && (
                        <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                          <i className="mr-2 text-orange-500 fas fa-circle"></i>
                          {"******"}
                        </td>
                      )}

                      {role != "superadmin" &&
                        ((localStorage.getItem("role") !== "superadmin" &&
                          role !== "superadmin") ||
                          localStorage.getItem("role") === "superadmin") && (
                          <>
                            <td className="p-4 px-6 align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                              <div
                                onClick={() =>
                                  OpenAccessModal(id, permissions, role)
                                }
                                className="flex text-purple-600 cursor-pointer hover:underline hover:font-semibold text-md"
                              >
                                View
                              </div>
                            </td>
                            <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                              <div className="flex justify-between w-full space-x-2">
                                <p
                                  onClick={() =>
                                    ToggleEditModal(id, name, email)
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
                                  {/* setting super admin email to my personal */}
                                {email !== "superadmin@smarttipz.com" && (
                                  <p
                                    onClick={() => _OnDelete(id)}
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
                                )}
                              </div>
                            </td>
                          </>
                        )}

                      {/* <td>
                       <hr />
                     </td> */}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showModal &&
        (modalTitle === "Access View" ? (
          <Modal
            _Toggle={_CloseAccessModal}
            title={modalTitle}
            body={
              <div className="flex items-center justify-center w-full">
                <div className="grid grid-cols-2 gap-6">
                  {access.map(({ name, value }, index) => (
                    <div key={index}>
                      <label className="inline-flex items-center">
                        <input
                          name={name}
                          type="checkbox"
                          checked={value}
                          value={name}
                          className="form-checkbox"
                          onChange={(e) => handleAccessChange(e)}
                        />
                        <span className="ml-2">{Permissions[index]}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            }
            footer={
              <>
                <button
                  onClick={_CloseAccessModal}
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium hover:underline text sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
                <Button
                  onSubmit={_OnAccess}
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border-none rounded-md primary-btn focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  childrens={"Done"}
                  loading={isSubmitting}
                />
              </>
            }
          />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Modal
              _Toggle={
                modalTitle === "Create Admin"
                  ? ToggleCreateModal
                  : ToggleEditModal
              }
              title={modalTitle}
              body={
                <div className="flex flex-col w-full">
                  <AdminForm
                    formik={formik}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                  {modalTitle === "Create Admin" && (
                    <>
                      <p className="mb-4 font-semibold text-md">Access</p>
                      <div className="flex items-center justify-center w-full">
                        <div className="grid grid-cols-2 gap-6">
                          {access.map(({ name, value }, index) => (
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name={name}
                                  type="checkbox"
                                  checked={value}
                                  value={name}
                                  className="form-checkbox"
                                  onChange={(e) => handleAccessChange(e)}
                                />
                                <span className="ml-2">
                                  {Permissions[index]}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  {!selctedAccess && modalTitle === "Create Admin" && (
                    <p className="mt-2 text-sm font-normal text-center text-danger">
                      Select atleast one role
                    </p>
                  )}
                </div>
              }
              footer={
                <>
                  <button
                    onClick={
                      modalTitle === "Create Admin"
                        ? ToggleCreateModal
                        : ToggleEditModal
                    }
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium hover:underline text sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    disabled={
                      modalTitle === "Create Admin" ? !selctedAccess : false
                    }
                    className={`w-full inline-flex justify-center rounded-md border-none px-4 py-2
                       ${
                         modalTitle === "Create Admin"
                           ? selctedAccess
                             ? "primary-btn"
                             : "btn-disable"
                           : "primary-btn"
                       }
                      text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
                    childrens={
                      modalTitle === "Create Admin" ? "Submit" : "Save"
                    }
                    loading={formik.isSubmitting}
                  />
                </>
              }
            />
          </form>
        ))}
    </div>
  );
};

export default Dashboard;
