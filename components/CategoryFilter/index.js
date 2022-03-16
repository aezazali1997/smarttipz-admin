import { Button } from "components";
import React from "react";

const Index = ({
  handleActiveTab,
  Active,
  tabs = ["Unverified", "Verified", "All"],
}) => {
  return (
    <div className="flex relative w-auto">
      <Button
        onSubmit={() => handleActiveTab(tabs[0])}
        type="button"
        childrens={tabs[0]}
        classNames={`${Active(tabs[0])}
                absolute left-12 md:left-28 px-3 py-2 w-32 md:w-36 flex justify-center items-center
                border text-sm border-purple-600 rounded-lg active-btn`}
      />
      <Button
        onSubmit={() => handleActiveTab(tabs[1])}
        type="button"
        childrens={tabs[1]}
        classNames={`${Active(tabs[1])} 
                border z-10 border-purple-600 px-3 py-2 w-20 md:w-36 flex justify-center 
                items-center text-sm rounded-lg active-btn`}
      />
      <Button
        onSubmit={() => handleActiveTab(tabs[2])}
        type="button"
        childrens={tabs[2]}
        classNames={`${Active(tabs[2])}
                border border-purple-600 absolute right-12 md:right-28 px-3 py-2 w-32 md:w-36 flex justify-center items-center
                text-sm rounded-lg active-btn`}
      />
    </div>
  );
};

export default Index;
