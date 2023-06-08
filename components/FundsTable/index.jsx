import React, { useState, useEffect } from "react";
import {
  Badge,
  Spinner,
  BankDetails,
  FundsCheckBox,
  RequestedBy,
} from "components";

import moment from "moment";

import axiosInstance from "APIs/axiosInstance";

const FundsTable = ({
  allRequests,
  setRequests,
  setSumToPay,
  sumToPay,
  setPayingAccounts,
  payingAccounts,
  balance,
  fetch,
  loading
}) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [bankDetails, setBankDetails] = useState(null);

  const [showBankDetails, setShowBankDetails] = useState(false);



  return (
    <>
      {loading ? (
        <div className="flex absolute spinner">
          {" "}
          <Spinner />
        </div>
      ) : (
        <div className="block relative  w-full overflow-auto ">
          <table className="items-center w-full bg-transparent border-collapse funds-mgt-table">
            <thead className="table-head">
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Date
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Requested by
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Requested Amount
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  SmartTipz Fee
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Remaining Amount Payable
                </th>

                {/* <th
                  className={
                    " px-8 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Bank Details
                </th> */}
                <th
                  className={
                    " px-8 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Select
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2">
              {allRequests &&
                allRequests.length > 0 &&
                allRequests.map(
                  (
                    { id, amount, status, createdAt, BankDetail, User },
                    index
                  ) => (
                    <tr key={index} className={"admin-table"}>
                      <td className="space-x-2 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        <Badge
                          color={status ? "bg-green-400" : "bg-red-400"}
                          childrens={status ? "Paid" : "Pending"}
                        />
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {moment(createdAt).format("DD MMM YYYY")}
                      </td>
                      <td className="border-t-0 w-max space-x-3  align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-4 text-left flex items-center">
                        <RequestedBy
                          email={User.email}
                          balance={User.totalTipsAmount}
                        />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                        $ {amount.toFixed(2)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                        $ {amount.toFixed(2)} * 2.1% ={" "}
                        {((amount.toFixed(2) * 2.1) / 100).toFixed(2)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                        ${" "}
                        {(amount - (amount.toFixed(2) * 2.1) / 100).toFixed(2)}
                      </td>

                      {/* <td className="border-t-0 px-6 flex justify-center items-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                        <BankDetails bankdetails={BankDetail} />
                      </td> */}
                      <td className="border-t-0 text-center border-l-0 border-r-0 text-xs whitespace-nowrap">
                        <FundsCheckBox
                          val={id}
                          status={status}
                          setSumToPay={setSumToPay}
                          setRequests={setRequests}
                          allRequests={allRequests}
                          setPayingAccounts={setPayingAccounts}
                          payingAccounts={payingAccounts}
                          sumToPay={sumToPay}
                          balance={balance}
                        />
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>

          {/* for generating excel sheet */}
          <table
            className=" hidden items-center w-full bg-transparent border-collapse funds-mgt-table"
            id="withdraw-table"
          >
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Date
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Requested by
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Requested Amount
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  SmartTipz Fee
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Remaining Amount Payable
                </th>

                {/* <th
                  className={
                    " px-8 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Account Title
                </th> */}
                {/* <th
                  className={
                    " px-8 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  IBAN Number
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y-2">
              {allRequests &&
                allRequests.length > 0 &&
                allRequests.map(
                  (
                    { id, amount, status, createdAt, BankDetail, User },
                    index
                  ) => (
                    <tr key={index} className={"admin-table"}>
                      <td className="space-x-2 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        <Badge
                          color={status ? "bg-green-400" : "bg-red-400"}
                          childrens={status ? "Paid" : "Pending"}
                        />
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {moment(createdAt).format("DD MMM YYYY")}
                      </td>
                      <td className="border-t-0 w-max space-x-3  align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-4 text-left flex items-center">
                        <RequestedBy
                          email={User.email}
                          balance={User.totalTipsAmount}
                        />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                        $ {amount.toFixed(2)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                        $ {amount.toFixed(2)} * 2.1% ={" "}
                        {((amount.toFixed(2) * 2.1) / 100).toFixed(2)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                        ${" "}
                        {(amount - (amount.toFixed(2) * 2.1) / 100).toFixed(2)}
                      </td>

                      {/* <td className="border-t-0 px-6 flex justify-center items-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                        {BankDetail.accountTitle}
                      </td>
                      <td className="border-t-0 text-center border-l-0 border-r-0 text-xs whitespace-nowrap">
                        {BankDetail.iban}
                      </td> */}
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default FundsTable;
