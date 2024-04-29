import React from "react";
import { CSVLink } from "react-csv";
import { SiMicrosoftexcel } from "react-icons/si";
const ExcelExport = ({ data, fileName }) => {
    return (
        <div className="cursor-pointer flex gap-2 text-black border-1 bg-white border-gray-200  px-2 py-2 rounded-md ring-1 ring-inset ring-gray-300">
            <div>
                <SiMicrosoftexcel className="text-xl " />
            </div>

            <CSVLink data={data} filename={`${fileName}_data.csv`}>Export to Excel</CSVLink>
        </div>
    );
};

export default ExcelExport;
