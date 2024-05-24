import React, { useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";

import { CiImageOn } from "react-icons/ci";
import {
  Card,
  CardHeader,

  Typography,
  Button,
  CardBody,

  CardFooter,

  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,

} from "@material-tailwind/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import DeleteModal from "@/Components/DeleteModal";

import ExcelExport from "@/Components/ExcelExport";
import toast from 'react-hot-toast';
import CustomToast from "@/Components/CustomToast";
import PaginationInTable from "@/Components/PaginationInTable";
import SearchInput from "@/Components/SearchInput";

const TABLE_HEAD = ["Partylist ID", "Partylist Logo", "Partylist Name", "Partylist Description", "Action"];

export function PartylistTable({ partylists, partylistsPerPage, voters }) {

  const { election } = usePage().props;

  const { errors } = usePage().props


  const { data, setData, post, delete: destroy, progress, processing, reset } = useForm();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(null);

  const [isSuccessMessage, setIsSuccessMessage] = useState(false);


  const [searchQuery, setSearchQuery] = useState("");

  const handleAddOpen = () => {
    setOpenAddModal(!openAddModal);

  };
  //modal update
  const handleUpdateOpen = (id) => {
    setOpenUpdateModal(!openUpdateModal);
    setId(id);
    // Set the initial value of the input field to the current position name
    const partylistToUpdate = partylists.find(partylist => partylist.id === id);

    if (partylistToUpdate) {
      setData({ name: partylistToUpdate.name, description: partylistToUpdate.description, partylist_logo: partylistToUpdate.partylist_logo });
    } else {
      setData({ name: '', description: '', partylist_logo: '' })
    }
  };

  function addSubmit(e) {
    e.preventDefault()
    post(route('partylist.store', data), {
      onSuccess: () => {
        setOpenAddModal(false);
        toast.success("Partylist successfully added");
        setIsSuccessMessage(true);


        reset();

      },
      onError: () => {

        setOpenAddModal(true);
      },
      preserveScroll: true,
    })
  }

  function updateSubmit(e) {
    e.preventDefault();

    post(route('partylist.update', { id: id }, data), {
      onSuccess: () => {
        setOpenUpdateModal(false)
        setIsSuccessMessage(true);
        toast.success("Partylist successfully updated");
        reset();
      },
      onError: () => {

      },
      preserveScroll: true
    });

  }

  const handleDeleteOpen = (partylistId) => {
    setDeleteModal(!openDeleteModal)
    setId(partylistId);
  };

  const handleDeletePartylists = (partylistId) => {

    destroy(route('partylist.destroy', { id: partylistId }), {
      preserveScroll: true
    });
    setIsSuccessMessage(true);

    setDeleteModal(false);
    toast.success("Partylist deleted successfully");
  };

  return (
    <div>
      <div >
        {isSuccessMessage && <CustomToast />}
      </div>

      <div>
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8 ">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Partylist
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all Partylist
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button className="flex items-center gap-3 bg-blue-500 " size="sm" onClick={handleAddOpen} disabled={processing || election.status === "Active"}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                  </svg>
                  Add partylist
                </Button>
              </div>

              {/*Add Modal */}
              <Dialog open={openAddModal} handler={handleAddOpen}>
                <form onSubmit={addSubmit}>
                  <DialogHeader>Add Partylist</DialogHeader>

                  <DialogBody>
                    <div>

                      <div>
                        <InputLabel htmlFor="partylistName" value="Partylist Name" />

                        <TextInput
                          id="partylistName"
                          className="mt-1 block w-full"
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}

                          isFocused
                          autoComplete="name"
                          placeholder="Enter partylist name"
                        />
                        <InputError className="mt-2" message={errors.name} />
                      </div>
                      <div className="mt-4">
                        <InputLabel htmlFor="partylistDescription" value="Enter Partylist Description" />
                        <textarea
                          id="partylistDescription"
                          className="mt-1 block w-full rounded-md resize-none h-40"
                          color="blue"
                          label="Enter Partylist Description"
                          value={data.description}
                          onChange={(e) => setData('description', e.target.value)}

                          placeholder="Enter partylist description"
                        />
                        <InputError className="mt-2" message={errors.description} />
                      </div>
                      <div className="mt-4">
                        <InputLabel htmlFor="partylistLogo" value="Enter Partylist Logo" />
                        <input
                          name="partylist_logo"
                          onChange={(e) => setData('partylist_logo', e.target.files[0])}
                          className="mt-2 relative block w-full cursor-pointer  flex-auto rounded ring-1 ring-inset ring-gray-300 px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-gray-900 file:cursor-pointer file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                          type="file"
                          id="formFile"
                        />

                        {progress && (
                          <progress value={progress.percentage} max="100" className="mt-3 text-blue-500 bg-blue-500 rounded-md">
                            {progress.percentage}%
                          </progress>
                        )}

                        <InputError className="mt-2" message={errors.partylist_logo} />
                      </div>
                    </div>
                  </DialogBody>

                  <DialogFooter>
                    <Button variant="text" color="red" onClick={handleAddOpen} className="mr-1">
                      <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="blue" type="submit" disabled={processing} >
                      <span>Confirm</span>
                    </Button>
                  </DialogFooter>
                </form>
              </Dialog>
              {/*Update Modal */}
              <Dialog open={openUpdateModal} handler={handleUpdateOpen}>
                <DialogHeader>Update Partylist</DialogHeader>
                <form onSubmit={updateSubmit} encType="multipart/form-data">
                  <DialogBody>
                    <div>
                      <div>
                        <InputLabel htmlFor="partylistName" value="Enter Partylist Name" />

                        <TextInput
                          id="partylistName"
                          className="mt-1 block w-full"
                          value={data.name}
                          onChange={(e) => setData({ ...data, name: e.target.value })}
                          required
                          isFocused
                          autoComplete="name"
                        />
                        <InputError className="mt-2" />
                      </div>

                      <div className="mt-4">
                        <InputLabel htmlFor="partylistDescription" value="Enter Partylist Description" />
                        <textarea
                          id="partylistDescription"
                          className="mt-1 block w-full rounded-md resize-none h-40"
                          value={data.description}
                          onChange={(e) => setData({ ...data, description: e.target.value })}
                          required
                          isFocused
                          autoComplete="description"
                        />
                        <InputError className="mt-2" message={errors.description} />
                      </div>
                      <div className="mt-4">
                        <InputLabel htmlFor="partylistLogo" value="Enter Partylist Logo" />


                        <input
                          name="partylist_logo"
                          onChange={((e) => setData({ ...data, partylist_logo: e.target.files[0] }))}
                          className="mt-2 relative block w-full cursor-pointer  flex-auto rounded ring-1 ring-inset ring-gray-300 px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-gray-900 file:cursor-pointer file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                          type="file"
                          id="formFile"
                        />

                        {progress && (
                          <progress value={progress.percentage} max="100" className="mt-3 text-blue-500 bg-blue-500 rounded-md">
                            {progress.percentage}%
                          </progress>
                        )}
                        <InputError className="mt-2" message={errors.partylist_logo} />
                      </div>


                    </div>
                  </DialogBody>
                  <DialogFooter>
                    <Button variant="text" color="red" onClick={handleUpdateOpen} className="mr-1">
                      <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="blue" type="submit" disabled={processing}>
                      <span>Confirm</span>
                    </Button>
                  </DialogFooter>
                </form>
              </Dialog>
            </div>
            <div className="flex flex-col items-center justify-end gap-2 md:flex-row me-3 mb-1">
              <div className='flex justify-start gap-2'>
                <div className='border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md hidden'>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                  </svg>
                </div>
                <ExcelExport data={partylists} fileName="partylists" />
              </div>
              <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
              {partylistsPerPage.data.length === 0 || partylistsPerPage.data.filter(partylist =>
                partylist.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center py-4 ">
                      No partylist found
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {partylistsPerPage.data
                    .filter(partylist => partylist.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(
                      ({ id, partylist_logo, name, description }, index) => {
                        const isLast = index === partylists.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={name}>
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
                              <div className="flex items-center gap-3 text-center">

                                <div className="flex flex-col justify-center items-center">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {partylist_logo ? <img src={`storage/${partylist_logo}`} alt="Partylist Logo" className="max-w-20 rounded-md" /> : (
                                      <div className="mx-auto">
                                        <CiImageOn className="ms-5 text-4xl" />
                                      </div>
                                    )
                                    }
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
                                  {name}
                                </Typography>

                              </div>
                            </td>

                            <td className={`${classes} w-96`}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {description}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <div className="flex gap-2">
                                <Tooltip content="Edit Partylist" >
                                  <IconButton variant="text" className="bg-amber-700 text-white" onClick={() => handleUpdateOpen(id)} disabled={election.status === "Active"}>
                                    <PencilIcon className="h-5 w-5" />
                                  </IconButton>

                                </Tooltip>

                                <Tooltip content="Delete Partylist">
                                  <IconButton variant="text" className="bg-red-700 text-white" onClick={() => handleDeleteOpen(id)} disabled={election.status === "Active"}>
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
              )}
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <PaginationInTable dataPerPage={partylistsPerPage} />
          </CardFooter>
          <DeleteModal
            open={openDeleteModal}
            handleDeleteOpen={handleDeleteOpen}
            handleDeleteData={handleDeletePartylists}
            id={id}
            dataName='Partylist' />
        </Card>
      </div>
    </div >


  );
}