import React from "react";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
const GenerateExcel = ({ active }) => {
  return (
    <div data-test-id="generate-excel">
      <ReactHtmlTableToExcel
        className="btn  md:py-2 md:px-4 py-1 px-2 rounded-md text-white  text-md text-bold md:text-lg"
        table="withdraw-table"
        filename={`${active}-'WithDraw-History'`}
        sheet="Sheet"
        buttonText="Export"
      />
    </div>
  );
};

export default GenerateExcel;
