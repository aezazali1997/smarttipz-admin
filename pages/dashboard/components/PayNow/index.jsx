import axiosInstance from "APIs/axiosInstance";
import React, { useState } from "react";
import PayNowModal from "../PayNowModal";
const PayNow = ({
  sumToPay,
  payingAccounts,
  allRequests,
  setAllRequests,
  setRequests,
  setBalance,
  balance,
  activeCategory
}) => {
  let bal=balance
  const [showPayModal, setShowPayModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");

  const toggleModal = () => {
    setShowPayModal(!showPayModal);
  };

  const submitPayNow = async () => {

    if (bal < sumToPay) {
      setError("Requested amount exceeded your balance");
      return;
    }
    let payload = {
      amount: sumToPay,
      accounts: payingAccounts,
    };
    setIsPaying(true);
    let {
      data: {
        data: { withDrawRequests, balance },
      },
    } = await axiosInstance.adminPay(payload);
    if(activeCategory==='All')
    {
      
    setRequests(withDrawRequests);

    }
    else if (activeCategory==='Pending'){
      console.log('pending');
    setRequests(withDrawRequests.filter((request) => request.status === false))

    }
    setAllRequests(withDrawRequests)
    
    setBalance(balance);
    setIsPaying(false);
    toggleModal();
  };

  return (
    <div className="absolute bottom-10 right-10 lg:right-5">
      <button
        disabled={sumToPay <= 0}
        onClick={() => {
          toggleModal();
        }}
        className={`${
          sumToPay <= 0 ? "btn-disable" : "btn"
        }  px-4 text-lg py-2 rounded-md text-white `}
      >
        Pay Now{" "}
      </button>
      {showPayModal && (
        <PayNowModal
          modalTitle={"Pay Now"}
          toggleModal={toggleModal}
          showPayModal={showPayModal}
          amount={sumToPay}
          submitPayNow={submitPayNow}
          isPaying={isPaying}
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
};

export default PayNow;
