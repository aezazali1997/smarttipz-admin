import React from "react";
import { TopUp, WithDraw, Wallet } from "assets/SVGs";

const UserAccount = ({ balance, toggleTopUpModal, toggleWithDrawModal }) => {
  return (
    <div className="flex flex-col space-y-2 lg:items-end items-center w-full pt-2">
      <div className="flex flex-row lg:w-auto w-full justify-between px-1 sm:justify-evenly lg:my-2  lg:space-x-2 order-2 btns-container mb-2 h-20 -mt-24">
        <button
          onClick={() => toggleTopUpModal()}
          className=" flex justify-center items-center text-white text-md rounded-md btn h-10 md:h-12 my-1 w-auto md:px-2 md:py-2 px-1 py-1"
        >
          <TopUp />
          Top up
        </button>

        <button
          onClick={() => toggleWithDrawModal()}
          className="md:px-2 md:py-2 px-1 py-1 flex justify-center  items-center text-white text-md rounded-md btn h-10 md:h-12 my-1 w-auto"
        >
          <WithDraw />
          Withdraw
        </button>
      </div>
      <div className="flex flex-col justify-center items-center lg:flex-row">
        <div>
          <Wallet />
        </div>
        <div>
          {!(balance === null) ? (
            <span className="lg:text-4xl lg:font-bold text-2xl my-1 lg:my-0 block bg-transparent">
              $ {balance.toFixed(2)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
