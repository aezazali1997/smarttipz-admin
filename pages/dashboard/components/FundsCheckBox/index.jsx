import React, { useEffect, useState } from "react";

const FundsCheckBox = ({
  val,
  status,
  setPayingAccounts,
  payingAccounts,
  allRequests,
  setSumToPay,
  sumToPay,
  balance
}) => {
  useEffect(()=>{
     setChecked(false)
  },[balance])
  const [checked, setChecked] = useState(false);

  const onSelectionChange = (e) => {
    let accounts = [...payingAccounts];
    if (e.target.checked) {
      setChecked(true);
      accounts.push(Number(e.target.value));
      allRequests.forEach((request) => {
        if (request.id == e.target.value) {
          setSumToPay(
            sumToPay +
              (Number(request.amount) - Number(request.amount) * (2.1 / 100))
          );
        }
      });
      setPayingAccounts(accounts);
    } else {
      setChecked(false);
      let arrAcs = removeElement([...payingAccounts], Number(e.target.value));
      setPayingAccounts(arrAcs);
      allRequests.forEach((request) => {
        if (request.id == e.target.value) {
          setSumToPay(
            sumToPay -
              (Number(request.amount) - Number(request.amount) * (2.1 / 100))
          );
        }
      });
    }
  };

  return (
    <>
      <input
        className={`${status ? "cursor-default" : "cursor-pointer"}`}
        type="checkbox"
        value={val}
        onChange={onSelectionChange}
        disabled={status}
        checked={checked}
      />
    </>
  );
};

export default FundsCheckBox;
