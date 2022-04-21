/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import {
  Searchbar,
  Spinner,
  CategoryFilter,
  FundsTable,
  PayNow,
  GenerateExcel,
  UserAccount,
} from "components";
import { OptionalBusinessVerificationSchema } from "utils/validation_shema";
import useDebounce from "utils/Debounce";

import axiosInstance from "APIs/axiosInstance";
import { TopUpModal, WithDrawModal } from "components/Modals";

const initials = {
  name: "",
  email: "",
  password: "",
};

const Dashboard = () => {
  const router = useRouter();

  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);

  const [loading, setIsLoading] = useState(true);
  // const [showModal, setShowModal] = useState(false);
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
  const [fetchingReq,setFetchingReq]=useState(false);

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
  useEffect(() => {
    getWithDrawRequests();
    return () => {
      setAllRequests([]);
      setRequests([]);
      setIsLoading(false);
    };
  }, []);

  const fetchBalance = async (adminId) => {
    enableLoading();
    try {
      const {
        data: { data },
      } = await axiosInstance.getBalance(adminId);
      setBalance(data);
      disableLoading();
    } catch (error) {}
  };

  let Active = (path) => {
    return activeCategory === path
      ? "background text-white z-20"
      : "text bg-white";
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

  const getWithDrawRequests = async () => {
setFetchingReq(true);
    try {
      const res = await axiosInstance.getWithDrawRequests(search);
        const { data } = res.data;
        setAllRequests(data);
        setRequests(data);
    } catch (error) {
      console.log("error", error.message);
      // console.log(error.message);
    }
      setFetchingReq(false);
  };

  return (
    <div
      className={`bg-white md:py-5 px-3 flex flex-col justify-between wrapper`}
    >
      <Helmet>
        <title>WithDraw</title>
      </Helmet>
      <div className=" request-container">
        <div className="flex w-full  bg-white search-bar">
          <Searchbar
            search={search}
            onChange={setSearch}
            placeholder="Search"
            fetch={getWithDrawRequests}
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div
            className={
              "flex flex-col min-w-0 break-words w-full admin-table rounded-lg overflow-auto custom-flex-basis"
            }
          >
            <UserAccount
              balance={balance}
              toggleTopUpModal={toggleTopUpModal}
              toggleWithDrawModal={toggleWithDrawModal}
            />
            <div className="flex w-full justify-center items-center mb-5 py-3 px-3">
              <CategoryFilter
                Active={Active}
                handleActiveTab={handleFundsTab}
                tabs={["Pending", "Paid", "All"]}
              />
            </div>

            <FundsTable
              allRequests={requests}
              setRequests={setRequests}
              setSumToPay={setSumToPay}
              sumToPay={sumToPay}
              setPayingAccounts={setPayingAccounts}
              payingAccounts={payingAccounts}
              balance={balance}
              fetch={getWithDrawRequests}
              loading={fetchingReq}
            />
          </div>
        )}
      </div>
      {!loading && allRequests.length > 0 && (
        <div className="flex justify-between bottom-container">
          <GenerateExcel active={activeCategory} />
          <PayNow
            sumToPay={sumToPay}
            setSumToPay={setSumToPay}
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
