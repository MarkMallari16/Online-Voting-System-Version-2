import React from "react";
import { CSVLink } from "react-csv";
import { SiMicrosoftexcel } from "react-icons/si";
const ExcelExport = ({ data, fileName,...className }) => {
    return (
        <div className={`dark:bg-[#121212] dark:text-gray-50 cursor-pointer flex gap-2 text-black border-1 bg-white border-gray-200  px-2 py-2 rounded-md ring-1 ring-inset ring-gray-300 ${className}`}>
            <div>
                <SiMicrosoftexcel className="dark:text-gray-50 text-xl text-gray-900" />
            </div>

            <CSVLink data={data} filename={`${fileName}_data.csv`}>Export to Excel</CSVLink>
        </div>
    );
};

export default ExcelExport;
