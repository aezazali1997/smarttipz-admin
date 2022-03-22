import React, { useState } from "react";
import { PreviewEye } from "assets/SVGs";
import WalletModal from "../WalletModal";
const RequestedBy = ({ email,balance }) => {
  const [showSenderModal, setShowSenderModal] = useState(false);

  const toggleSenderModal = () => {
    setShowSenderModal(!showSenderModal);
  };

  return (
    <>
      <span
        className="flex items-center cursor-pointer"
        onClick={() => toggleSenderModal()}
      >
        <PreviewEye classNames={"text w-5 h-5"} />
      </span>
      <span className={"font-bold text-blueGray-600"}>{email}</span>
      {showSenderModal && (
        <WalletModal
          toggleModal={toggleSenderModal}
          modalTitle="Wallet"
          balance={balance}
        />
      )}
    </>
  );
};

export default RequestedBy;
