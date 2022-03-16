import React from "react";
import Swal from "sweetalert2";
import Modal from '../Modal'
const BankDetailModal = ({toggleModal,modalTitle,bankDetails}) => {
  
  return (
    <Modal
      _Toggle={toggleModal}
      title={modalTitle}
      body={
        <>
          <div className="flex h-full flex-col relative space-y-5 w-full ">
            <div className="flex justify-between mt-5" >
            <span className="text-md font-bold">Account Title</span>
            <span>{bankDetails.accountTitle}</span>
            </div>
            <div className="flex justify-between mt-5" >
            <span className="text-md font-bold">IBAN Number</span>

            <span>{bankDetails.iban}</span>
            </div>
          
          </div>
        </>
      }
      footer={
        <>
          <button
            onClick={()=>toggleModal()}
            type="button"
            className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </>
      }
    />
  );
};
export default BankDetailModal;
