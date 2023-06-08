import React from "react";

const Spinner = () => {
  return (
    <div className="w-full absolute spinner ">
      <span className="flex flex-col items-center">
        <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
      </span>
    </div>
  );
};

export default Spinner;
