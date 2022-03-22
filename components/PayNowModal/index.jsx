import React from 'react'
import Modal from '../Modal'
import {Button} from 'components'
const PayNowModal = ({toggleModal,modalTitle,amount,submitPayNow,isPaying,error,setError}) => {
  return (
    <Modal
      _Toggle={toggleModal}
      title={modalTitle}
      body={
        <>
          <div className="flex h-full flex-col relative space-y-5 w-full ">
            <span className="text-xl text-center">Are you sure to pay $ {amount?.toFixed(2)} ?</span>
            <span className='text-red-700 text-center font-md'>{error}</span>
            
          
          </div>
        </>
      }
      footer={
        <>
          <button
            onClick={()=>{toggleModal()
            setError('')}}
            type="button"
            className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
            <Button
            type="button"
            onSubmit={submitPayNow}
            className={`w-full inline-flex justify-center rounded-md border-none px-4 py-2 ${error!=='' ? 'btn-disable' : 'btn'} text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
            childrens={'Pay Now'}
            loading={isPaying}
            disable={error!==''}
            // 
          />
        </>
      }
    />
  );
}

export default PayNowModal;