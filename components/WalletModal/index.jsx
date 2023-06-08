import React from "react";
import Modal from '../Modal'
import {Wallet} from 'assets/SVGs'
const WalletModal = ({toggleModal,modalTitle,balance}) => {
  
  
  
  return (
    <Modal
      _Toggle={toggleModal}
      title={modalTitle}
      body={
        <>
          <div className="flex h-full flex-col relative space-y-5 w-full justify-center items-center">
            <span className="flex flex-col justify-center items-center space-y-3">
            <Wallet />
            </span>
            <h1 className="text-2xl font-bold">$ {balance}</h1>
          
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
export default WalletModal;
