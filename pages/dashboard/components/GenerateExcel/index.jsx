import React from 'react'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'
const GenerateExcel = () => {
  return (
    <div className='absolute bottom-10 lg:left-64 ml-3 left-5'>
    <ReactHtmlTableToExcel className="btn  py-2 px-4 rounded-md text-white text-md text-bold text-lg" table='withdraw-table' filename='WithDraws-History' sheet="Sheet" buttonText="Export" />
    </div>
  )
}

export default GenerateExcel