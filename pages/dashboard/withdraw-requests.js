/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
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
import { TopUp, WithDraw, Wallet } from "assets/SVGs";
import { TopUpModal, WithDrawModal } from "components/Modals";
import {
  FundsTable,
  FundsCheckBox,
  PayNow,
  RequestedBy,
  ReceivedBy,
} from "./components/index";

import { customArray } from "./customArray";

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
  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalTitle, setModalTitle] = useState("Create Admin");
  const [initialValues, setInitialValues] = useState(initials);
  const [activeCategory, setActiveCategory] = useState("All");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [sumToPay, setSumToPay] = useState(0);
  const [payingAccounts, setPayingAccounts] = useState([]);

  const [search, setSearch] = useState("");
  const [balance, setBalance] = useState(0);

  const [topUp, setTopUp] = useState(0);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [toppingUp, setToppingUp] = useState(false);

  const [withDraw, setWithDraw] = useState(0);
  const [isWithDrawing, setIsWithDrawing] = useState(false);
  const [showWithDrawModal, setShowWithDrawModal] = useState(false);
  // const []

  const toggleWithDrawModal = () => {
    setShowWithDrawModal(!showWithDrawModal);
  };

  const toggleTopUpModal = () => {
    setShowTopUpModal(!showTopUpModal);
  };

  const withDrawFunds = async () => {
    let id = localStorage.getItem("userId");
    setIsWithDrawing(true);
    try {
      let {
        data: { totalTipsAmount },
      } = await axiosInstance.withDrawProfile(withDraw, id);
      setBalance(totalTipsAmount);
    } catch (error) {}
    setIsWithDrawing(false);
    toggleWithDrawModal();
  };

  const topUpSubmit = async () => {
    let id = localStorage.getItem("userId");
    setToppingUp(true);
    try {
      let {
        data: { totalTipsAmount },
      } = await axiosInstance.topUpProfile(topUp, id);
      setBalance(totalTipsAmount);
    } catch (error) {}
    setToppingUp(false);
    toggleTopUpModal();
  };

  const debouncedSearchTerm = useDebounce(search, 1000);

  const FetchBusinessVerificationUsers = async (search) => {
    enableLoading();
    try {
      const {
        data: {
          data: { users },
        },
      } = await axiosInstance.getAllBusinessUsers(search);
      // console.log("users", users);
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
  }, [1]);

  useEffect(() => {
    // if (debouncedSearchTerm) {
    FetchBusinessVerificationUsers(debouncedSearchTerm);
    // }
    return () => {
      setUsers("");
      setAllUsers([]);
    };
  }, [debouncedSearchTerm]);

  // useEffect(() => {}, [users, initialValues, activeCategory]);

  const enableLoading = () => {
    setIsLoading(true);
  };

  const disableLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const adminId = localStorage.getItem("userId");

    fetchBalance(adminId);

    return () => setBalance(0);
  }, [1]);

  const fetchBalance = async (adminId) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.getBalance(adminId);
      setBalance(data);
    } catch (error) {}
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

  // const SwalDeleteModal = (text, confirmBtnText, onConfirmAction) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     icon: "question",
  //     html: `<p class='text-red-600'>${text}</p>`,
  //     showCancelButton: true,
  //     confirmButtonText: confirmBtnText,
  //     buttonsStyling: false,
  //     customClass: {
  //       confirmButton:
  //         "w-full inline-flex justify-center rounded-md border-none px-4 py-2 primary-btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm",
  //       cancelButton:
  //         "mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       onConfirmAction();
  //     }
  //   });
  // };

  // const _OnDelete = (id) => {
  //   axiosInstance
  //     .deleteBusinessUser(id)
  //     .then(({ data: { message } }) => {
  //       Swal.fire({
  //         text: message,
  //         icon: "success",
  //         timer: 3000,
  //         showCancelButton: false,
  //         showConfirmButton: false,
  //         html: true,
  //       });
  //       let copyOriginal = [...users];
  //       let updatedArray = copyOriginal.filter(
  //         (item) => item.id !== id && item
  //       );
  //       setUsers(updatedArray);
  //     })
  //     .catch(
  //       ({
  //         response: {
  //           data: { message },
  //         },
  //       }) => {
  //         Swal.fire({
  //           text: message,
  //           icon: "error",
  //           timer: 3000,
  //           showCancelButton: false,
  //           showConfirmButton: false,
  //         });
  //       }
  //     );
  // };

  // const _HandleDelete = (id) => {
  //   console.log("ID to delete: ", id);
  //   SwalDeleteModal("You won't be able to revert this!", "Delete", () =>
  //     _OnDelete(id)
  //   );
  // };

  // const _OnBlock = (id, isBlocked) => {
  //   axiosInstance
  //     .blockBusinessUser({ id, isBlocked })
  //     .then(({ data: { data, message } }) => {
  //       Swal.fire({
  //         text: message,
  //         icon: "success",
  //         timer: 3000,
  //         showCancelButton: false,
  //         showConfirmButton: false,
  //       });
  //       let copyOriginal = [...users];
  //       let updatedArray = copyOriginal.map((user) => {
  //         if (user.id !== id) return user;
  //         else {
  //           user.isBlocked = !isBlocked;
  //           return user;
  //         }
  //       });
  //       setUsers(updatedArray);
  //     });
  // };

  // const _HandleBlock = (id, isBlocked) => {
  //   SwalDeleteModal("", isBlocked ? "Unblock" : "Block", () =>
  //     _OnBlock(id, isBlocked)
  //   );
  // };

  // const _Onverify = (id) => {
  //   axiosInstance.verifyBusinessUser({ id }).then(({ data: { message } }) => {
  //     Swal.fire({
  //       text: message,
  //       icon: "success",
  //       timer: 3000,
  //       showCancelButton: false,
  //       showConfirmButton: false,
  //     });
  //     let copyOriginal = [...users];
  //     let updatedArray = copyOriginal.map((user) => {
  //       if (user.id !== id) return user;
  //       else {
  //         user.isApproved = true;
  //         return user;
  //       }
  //     });
  //     setUsers(updatedArray);
  //   });
  // };

  // const _HandleVerify = (id) => {
  //   SwalDeleteModal("You want to verify this user", "Verify", () =>
  //     _Onverify(id)
  //   );
  //   debugger;
  // };

  // const _OnEditVerifiedUser = (values, setSubmitting) => {
  //   setSubmitting(true);
  //   values.phoneNumber = phone;
  //   // console.log('values: ', values);
  //   axiosInstance
  //     .editVerifiedBusinessUser(values)
  //     .then(({ data: { message, data } }) => {
  //       Swal.fire({
  //         text: message,
  //         icon: "success",
  //         timer: 3000,
  //         showConfirmButton: false,
  //         showCancelButton: false,
  //       });
  //       const copyOriginalArray = [...users];
  //       const updatedData = copyOriginalArray.map((user) => {
  //         if (user.id !== values.id) return user;
  //         else {
  //           user.name = values.name;
  //           user.email = values.email;
  //           user.phoneNumber = phone;
  //           user.Business.link = values.website;
  //           return user;
  //         }
  //       });
  //       console.log({ updatedData });
  //       setUsers(updatedData);
  //       ToggleEditModal();
  //       setSubmitting(false);
  //     })
  //     .catch(
  //       ({
  //         response: {
  //           data: { message },
  //         },
  //       }) => {
  //         Swal.fire({
  //           text: message,
  //           icon: "error",
  //           timer: 3000,
  //           showConfirmButton: false,
  //           showCancelButton: false,
  //         });
  //         setSubmitting(false);
  //       }
  //     );
  // };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: OptionalBusinessVerificationSchema,
    validateOnBlur: true,
    onSubmit: (values, { setSubmitting }) => {
      _OnEditVerifiedUser(values, setSubmitting);
    },
  });
  const handleFundsTab = (category) => {
    let filtered = [];
    if (category === "Paid") {
      filtered = allRequests.filter((request) => request.status === true);
      setRequests(filtered);
    } else if (category === "Pending") {
      console.log("pending");
      filtered = allRequests.filter((request) => request.status === false);
      setRequests(filtered);
    } else {
      setRequests(allRequests);
    }
    setActiveCategory(category);
    setSumToPay(0);
  };

  const handleActiveTab = (category) => {
    // console.log('category: ', category);
    let filtered = [];
    if (category === "verified") {
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

  // const _OnPhoneNoChange = (value) => {
  //   setPhone(value);
  // };

  // const toggleReciverModal = () => {
  //   Swal.fire({
  //     text: "hello",
  //     showCancelButton: false,
  //     showConfirmButton: false,
  //     html: "<p>hheheheheh </p>",
  //     // iconHtml:''
  //   });
  // };
  // const toggleSenderModal = () => {};

  // const _PreviewProfile = async (username) => {
  //   router.push(`/dashboard/business-verification/preview/${username}`);
  // };

  // const sendFunds = (id) => {
  //   console.log("user id", id);
  // };

  return (
    <div className={`bg-white py-5 px-3 space-y-3 h-screen`}>
      <Helmet>
        <title>Withdraw | Smart Tipz Admin Panel</title>
      </Helmet>

      <div className="flex w-full bg-white top-0">
        <Searchbar search={search} onChange={setSearch} placeholder="Search" />
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
            "flex flex-col min-w-0 break-words w-full admin-table rounded-lg"
          }
        >
          {/* section ends here */}
          <div className="flex flex-col lg:items-end items-center w-full">
            <div className="flex flex-col lg:flex-row justify-between lg:my-2  lg:space-x-2 order-2">
              <button
                onClick={() => toggleTopUpModal()}
                className="px-2 py-2 flex justify-center items-center text-white text-md rounded-md btn my-1 w-full"
              >
                <TopUp />
                Top up
              </button>

              <button
                onClick={() => toggleWithDrawModal()}
                className="px-2 py-2 flex justify-center  items-center text-white text-md rounded-md btn my-1 w-full"
              >
                <WithDraw />
                Withdraw
              </button>
            </div>
            <div className="flex flex-col justify-center items-center lg:flex-row">
              <div>
                <Wallet />
              </div>
              <div>
                {!(balance === null) ? (
                  <span className="lg:text-4xl lg:font-bold text-2xl my-1 lg:my-0 block bg-transparent">
                    $ {balance.toFixed(2)}
                  </span>
                ) : (
                  <Skeleton
                    height="h-10"
                    width="w-32"
                    bgColor="bg-gray-100"
                    round="rounded"
                    display="block"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center items-center mb-5 py-3 px-3">
            <CategoryFilter
              Active={Active}
              handleActiveTab={handleFundsTab}
              tabs={["Pending", "Paid", "All"]}
            />
          </div>

          <FundsTable
            allRequests={requests}
            setAllRequests={setAllRequests}
            setRequests={setRequests}
            setSumToPay={setSumToPay}
            sumToPay={sumToPay}
            setPayingAccounts={setPayingAccounts}
            payingAccounts={payingAccounts}
            balance={balance}
          />

          <PayNow
            sumToPay={sumToPay}
            payingAccounts={payingAccounts}
            allRequests={requests}
            setAllRequests={setAllRequests}
            setRequests={setRequests}
            setBalance={setBalance}
            balance={balance}
            activeCategory={activeCategory}
          />
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
      <AnimatePresence>
        {showTopUpModal && (
          <TopUpModal
            topUpSubmit={topUpSubmit}
            handleTopUpChange={setTopUp}
            loading={toppingUp}
            toggleTopUpModal={toggleTopUpModal}
            amount={topUp}
            modalTitle={"Top up"}
          />
        )}
        {showWithDrawModal && (
          <WithDrawModal
            withDrawSubmit={withDrawFunds}
            handleWithDrawChange={setWithDraw}
            loading={isWithDrawing}
            toggleWithDrawModal={toggleWithDrawModal}
            amount={withDraw}
            modalTitle={"Withdraw"}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
