import React from 'react'
import { CSVLink } from "react-csv";
const ExcelExport = ({ data, fileName }) => {
    return (
        <CSVLink data={data} filename={`${fileName}_data.csv`}>Export to Excel</CSVLink>
    )
}

export default ExcelExport