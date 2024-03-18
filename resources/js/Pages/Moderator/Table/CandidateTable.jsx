
import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select, Option,
  Textarea

} from "@material-tailwind/react";
import DefaultProfile from '../../../../../public/profile_photos/1707753026.png';
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Logo from "@/assets/cover.jpg";
import { useForm } from '@inertiajs/inertia-react';

const TABLE_HEAD = ["Candidate ID", "Profile", "First Name", "Last Name", "Partylist", "Position", "Manifesto", "Action"];

const TABLE_ROWS = [
  {
    id: 1,
    firstName: "John",
    lastName: "Cruz",
    partylist: "Sandigan",
    position: "President",
    manifesto: "Once in a blue moon"
  },

];

export function CandidateTable() {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const { data, setData, post, errors } = useForm({
    image_url: null,
    firstName: '',
    lastName: '',
    position: '',
    manifesto: '',

  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post('/candidates'); // Send form data to the backend
      setOpen(false);
      // Reset the form fields
      setData({
        firstName: '',
        middleName: '',
        lastName: '',
        partylist: '',
        position: '',
        manifesto: '',
      });
    } catch (error) {
      console.error("Failed to create candidate:", error);
    }
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Candidate
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Candidate
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

            <Button className="flex items-center gap-3 bg-blue-500" size="sm" onClick={handleOpen}>
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
              Add candidate
            </Button>


            {/**Add Position*/}

            <Dialog size="xl" open={open} handler={handleOpen} className="overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <DialogHeader>Add Candidate</DialogHeader>
                <DialogBody>
                  <div>
                    <div className="mb-2">
                      <InputLabel htmlFor="candidateProfile" value="Candidate Profile" className="mb-4" />
                      <div className="mb-2">
                        <Avatar src={Logo} alt="avatar" size="xxl" withBorder={true} className="p-0.5" />
                      </div>
                      <div>
                        <label htmlFor="candidateImage" class="relative cursor-pointer bg-gray-300 rounded-md font-medium py-2 px-4 mb-2 inline-flex items-center">
                          <span class="mr-2">Choose a file</span>
                          <input type="file" id="candidateImage" name="candidateImage" class="hidden" onChange={(e) => {
                            const file = e.target.files[0];
                            const formData = new FormData();
                            formData.append('candidateImage', file);
                          }} />
                        </label>

                        <InputError className="mt-2" />
                      </div>
                    </div>
                    <div className="md:flex md:flex-wrap md:gap-2">
                      <div className="flex-1">
                        <InputLabel htmlFor="firstName" value="Enter Candidate First Name" />

                        <TextInput
                          id="firstName"
                          className="mt-1 block w-full"
                          name="firstName"
                          value={data.firstName || ''}

                          onChange={handleChange}
                          required
                          autoFocus
                        />

                        <InputError className="mt-2" />
                      </div>

                      <div className="flex-1">
                        <InputLabel htmlFor="lastName" value="Enter Candidate Middle Name" />

                        <TextInput
                          id="middleName"
                          className="mt-1 block w-full"
                          value={data.middleName || ''}
                          name="middleName"
                          onChange={handleChange}
                          required
                          autoFocus
                          autoComplete="middleName"
                        />

                        <InputError className="mt-2" />
                      </div>

                      <div className="flex-1">
                        <InputLabel htmlFor="lastName" value="Enter Candidate Last Name" />

                        <TextInput
                          id="lastName"
                          className="mt-1 block w-full"
                          name="lastName"
                          value={data.lastName || ''}
                          onChange={handleChange}
                          required
                          autoFocus
                          autoComplete="lastName"
                        />

                        <InputError className="mt-2" />
                      </div>
                    </div>




                    <div className="mt-4">

                      <Select
                        id="positions"
                        label="Select Partylist"
                        value={data.partylist}
                        onChange={handleChange}
                        name="position"
                      >
                        <Option>Sandigan</Option>
                      </Select>

                      <InputError className="mt-2" />
                    </div>

                    <div className="mt-4">

                      <Select
                        id="positions"
                        label="Select Candidate Position"
                        value={data.position}
                        onChange={handleChange}
                        name="position"
                      >
                        <Option>President</Option>
                        <Option>Vice President</Option>
                      </Select>

                      <InputError className="mt-2" />
                    </div>
                    <div className="mt-4">

                      <Textarea
                        position="manifesto"
                        size="lg"
                        label="Enter manifesto"
                        value={data.manifesto}
                        onChange={handleChange}
                        name="manifesto"
                      />
                      <InputError className="mt-2" />
                    </div>

                  </div>
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="blue" type="submit">
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </form>
            </Dialog>

          </div>
        </div>
        <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
          <div className='flex justify-start gap-2'>
            <div className='border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md'>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>


            </div>
            <div className='border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6.905 9.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V18a.75.75 0 0 0 1.5 0v-4.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
              </svg>

            </div>
          </div>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ id, firstName, lastName, partylist, position, manifesto }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">

                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {id}
                          </Typography>

                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Avatar src={DefaultProfile} />
                        </Typography>

                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {firstName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {lastName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {partylist}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {position}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {manifesto}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2">
                        <Tooltip content="Edit Candidate">
                          <IconButton variant="text" className="bg-amber-700 text-white">
                            <PencilIcon className="h-5 w-5" />
                          </IconButton>

                        </Tooltip>

                        <Tooltip content="Delete Candidate">
                          <IconButton variant="text" className="bg-red-700 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>

                          </IconButton>

                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>

    </Card >


  );
}