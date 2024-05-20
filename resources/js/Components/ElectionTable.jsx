import { Card, Typography } from "@material-tailwind/react";



export function ElectionTable({ electionPerPage }) {
  const TABLE_HEAD = ["Election ID", "Election Title", "Election Start Date", "Election End Date", "Status"];
  const colorStatus = {
    'Completed': 'bg-green-300 text-white text-green-900',
    'Active': 'bg-blue-300 text-blue-900',
    'Inactive': 'bg-gray-300 text-gray-900'
  }

  const getColorStatus = (status) => {
    return colorStatus[status] || 'bg-gray-500';
  }
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {electionPerPage.data.map(({ id, title, start_date, end_date, status }, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {id}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {title}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {start_date}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {end_date}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className={`text-center font-normal ${getColorStatus(status)} px-2  lg:px-1 py-3 me-5 rounded-md font-bold `}>
                  {status}
                </Typography>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}