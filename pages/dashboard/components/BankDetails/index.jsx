import React, { useState } from "react";
import BankDetailModal from "../BankDetailModal";
import { Button } from "components";
const BankDetails = ({ bankdetails }) => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const toggleShowBank = () => {
    setShowBankDetails(!showBankDetails);
  };
  return (
    <>
      <Button
        onSubmit={() => toggleShowBank()}
        type="button"
        // disable={isBlocked}
        childrens={"View"}
    classNames={`px-1 py-1 flex w-20 justify-center items-center hover:underline cursor-pointer text-sm color-app 
																	
                                  `}
      />

      {showBankDetails && (
        <BankDetailModal
          modalTitle="Bank Details View"
          toggleModal={toggleShowBank}
          bankDetails={bankdetails}
        />
      )}
    </>
  );
};

export default BankDetails;
