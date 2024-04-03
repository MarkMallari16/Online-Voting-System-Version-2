import React from "react";
import { CSVLink } from "react-csv";
import { SiMicrosoftexcel } from "react-icons/si";
const ExcelExport = ({ data, fileName }) => {
    return (
        <div className="cursor-pointer flex gap-4  text-black border-1 bg-gray-200 border-gray-200  px-2 py-2 rounded-md">
            <div>
                <SiMicrosoftexcel className="text-xl" />
            </div>

            <CSVLink data={data} filename={`${fileName}_data.csv`}>Export to Excel</CSVLink>
        </div>
    );
};

export default ExcelExport;
