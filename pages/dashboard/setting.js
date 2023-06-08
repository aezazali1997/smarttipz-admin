/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Helmet } from "react-helmet";

import { getInputClasses } from "utils/helpers";
import { UseFetchSetting } from "hooks";
import { AccountSetting } from "components";

const Setting = () => {
  const {
    accountLoading,
    formik,
    
  } = UseFetchSetting();

  return (
    <div className="flex flex-col h-full w-full p-3 sm:p-5 ">
      {/*SEO Support*/}
      <Helmet>
        <title>Setting | Smart Tipz Admin Panel</title>
      </Helmet>
      {/*SEO Support End */}

      <div className="flex flex-col-reverse lg:flex-row w-full">
        {/* section starts here*/}

        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col sm:flex-row mt-10 w-full sm:divide-x-2">
            <div className="flex flex-col w-full lg:w-1/2 space-y-2 sm:px-3">
              <div className="flex flex-col w-full"></div>
              <div className={"flex flex-col w-full space-y-2"}>
                <AccountSetting
                  accountLoading={accountLoading}
                  formik={formik}
                  getInputClasses={getInputClasses}
                />
              </div>
             
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Setting;
