import { PDFDownloadLink } from '@react-pdf/renderer'
import React from 'react'
import { CSVLink } from 'react-csv'

const ExportButtons = ({ data, fileName, PDFFileDesign }) => {
    return (
        <div className="flex justify-start gap-2">
            <div className="flex items-center gap-2 cursor-pointer border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                    </svg>
                </div>
                <PDFDownloadLink
                    document={<PDFFileDesign data={data}/>}
                    fileName={`${fileName}.csv`}
                >
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Download PDF'
                    }
                </PDFDownloadLink>
            </div>
            <div className="flex items-center bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md cursor-pointer gap-2">
                <CSVLink data={data} filename="user_data.csv">
                    Export to CSV
                </CSVLink>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                </svg>
                Export to CSV
            </div>
            <div className="flex gap-2 cursor-pointer border-1 text-black px-2 py-2 rounded-md"></div>
        </div>
    )
}

export default ExportButtons