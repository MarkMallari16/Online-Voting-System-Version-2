import React, { useState } from "react";
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
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
  Alert,
  Textarea,
} from "@material-tailwind/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import DeleteModal from "@/Components/DeleteModal";
import InfoIcon from "@/Components/InfoIcon";
import ExcelExport from "@/Components/ExcelExport";




const TABLE_HEAD = ["Partylist ID", "Partylist Name", "Partylist Description", "Action"];



export function PartylistTable({ partylists, partylistsPerPage }) {
  console.log(partylistsPerPage);
  const { data, setData, post, processing } = useForm({
    name: '',
    description: ''
  });

  const [partylist, setPartylist] = useState(partylists);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(null);

  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [message, setMessage] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(partylistsPerPage.current_page);

  const indexOfLastPage = currentPage * partylistsPerPage.per_page;
  const indexOfFirstPage = indexOfLastPage - partylistsPerPage.per_page;

  const currentPartylists = partylists.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = partylistsPerPage.last_page;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  const handleNextPage = () => {
    if (currentPage < totalPages){
      setCurrentPage(currentPage + 1);
    }
  }

  const handleAddOpen = () => {
    setOpenAddModal(!openAddModal);
    setData({ name: '', description: '' });

  };
  //modal update
  const handleUpdateOpen = (id) => {
    setOpenUpdateModal(!openUpdateModal);
    setId(id);
    // Set the initial value of the input field to the current position name
    const partylistToUpdate = partylists.find(partylist => partylist.id === id);
    console.log("partylist to update:", partylistToUpdate); // Add this line for debugging

    if (partylistToUpdate) {
      setData({ name: partylistToUpdate.name, description: partylistToUpdate.description });
    }
  };

  function addSubmit(e) {

    e.preventDefault()
    post('/partylists')
    setOpenAddModal(false)
    setMessage('Partylist successfully added')
    setIsSuccessMessage(true);

    window.location.reload();
  }

  function updateSubmit(e) {
    e.preventDefault();
    Inertia.put(`/partylists/${id}`, data);
    setOpenUpdateModal(false)
    setMessage('Partylist successfully updated')
    setIsSuccessMessage(true);

    window.location.reload();
  }

  const handleDeleteOpen = (id) => {
    setDeleteModal(!openDeleteModal)
    setId(id);
    console.log(id);
    console.log(openDeleteModal);
  };

  const handleDeletePartylists = (partylistId) => {
    console.log(partylistId);
    try {
      // Send a DELETE request to delete the partylists
      Inertia.delete(`/partylists/${partylistId}`);

      // Update the partylists state by filtering out the deleted partylists
      setPartylist(prevPartylists => prevPartylists.filter(partylist => partylist.id !== partylistId));

      setMessage(`Partylist successfully deleted`);
      setIsSuccessMessage(true);
      // Close the delete modal
      setDeleteModal(false);

      window.location.reload();
    } catch (error) {
      console.error('Failed to delete partylist:', error);
    }
  };

  const handleSearch = ((event) => {
    setSearchQuery(event.target.value);
  })
  return (
    <div>
      <div className="mb-3">
        {isSuccessMessage && <Alert icon={<InfoIcon />} color="green">{message}</Alert>}
      </div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Partylist
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Partylist
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

              <Button className="flex items-center gap-3 bg-blue-500" size="sm" onClick={handleAddOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                  <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                </svg>
                Add partylist
              </Button>
            </div>
            <Dialog open={openAddModal} handler={handleAddOpen}>
              <DialogHeader>Add Partylist</DialogHeader>
              <DialogBody>
                <div>
                  <form onSubmit={addSubmit}>
                    <div>
                      <InputLabel htmlFor="partylistName" value="Enter Partylist Name" />

                      <TextInput
                        id="partylistName"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
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
                        color="blue"
                        label="Enter Partylist Description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        required

                      />
                      <InputError className="mt-2" />
                    </div>
                    <DialogFooter>
                      <Button variant="text" color="red" onClick={handleAddOpen} className="mr-1">
                        <span>Cancel</span>
                      </Button>
                      <Button variant="gradient" color="blue" type="submit" >
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>
                  </form>
                </div>
              </DialogBody>
            </Dialog>

            <Dialog open={openUpdateModal} handler={handleUpdateOpen}>
              <DialogHeader>Update Partylist {data.name}</DialogHeader>

              <DialogBody>
                <div>
                  <form onSubmit={updateSubmit}>
                    <div>
                      <InputLabel htmlFor="partylistName" value="Enter Partylist Name" />

                      <TextInput
                        id="partylistName"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
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
                        onChange={(e) => setData('description', e.target.value)}
                        required
                        isFocused
                        autoComplete="description"
                      />
                      <InputError className="mt-2" />
                    </div>
                    <DialogFooter>
                      <Button variant="text" color="red" onClick={handleUpdateOpen} className="mr-1">
                        <span>Cancel</span>
                      </Button>
                      <Button variant="gradient" color="blue" type="submit" >
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>
                  </form>
                </div>
              </DialogBody>
            </Dialog>
          </div>
          <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
            <div className='flex justify-start gap-2'>
              <div className='border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>


              </div>
              <ExcelExport data={partylists} fileName="partylists" />
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={handleSearch}

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
            {currentPartylists.length > 0 ? (
              <tbody>
                {currentPartylists
                  .filter(partylist => partylist.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(
                    ({ id, name, description }, index) => {
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

                          <td className={classes}>
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
                              <Tooltip content="Edit Partylist">
                                <IconButton variant="text" className="bg-amber-700 text-white" onClick={() => handleUpdateOpen(id)}>
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>

                              </Tooltip>

                              <Tooltip content="Delete Partylist">
                                <IconButton variant="text" className="bg-red-700 text-white" onClick={() => handleDeleteOpen(id)}>
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

                {
                  (currentPartylists
                    .filter(partylist =>
                      partylist.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center py-4 text-gray-500">
                          No partylist found
                        </td>
                      </tr>
                    ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No partylist found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button variant="outlined" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </CardFooter>
        <DeleteModal
          open={openDeleteModal}
          handleDeleteOpen={handleDeleteOpen}
          handleDeleteData={handleDeletePartylists}
          id={id}
          dataName='Partylist' />
      </Card>
    </div>


  );
}