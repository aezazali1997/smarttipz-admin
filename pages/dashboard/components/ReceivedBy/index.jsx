import React,{useState} from "react";
import {PreviewEye} from 'assets/SVGs';
import WalletModal from '../WalletModal'
const ReceivedBy = ({email}) => {
  const [showReceivedModal,setShowReceivedModal]=useState(false);
  const toggleReceiverModal = () => {
    setShowReceivedModal(!showReceivedModal)
  }
  return (
    <>
      {" "}
      <span
        className="flex items-center cursor-pointer mr-2"
        onClick={() => toggleReceiverModal()}
      >
        <PreviewEye classNames={"text w-5 h-5"} />
      </span>
      {email}
      {
        showReceivedModal && <WalletModal toggleModal={toggleReceiverModal} modalTitle="Receiver Wallet" />
      }
    </>
  );
};

export default ReceivedBy;
