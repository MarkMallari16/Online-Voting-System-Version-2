import React, { useState } from "react";
import {

    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";

import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
<<<<<<< HEAD
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
<<<<<<< HEAD

=======
import DefaultCandidatePicture from "../../../../../public/profile_photos/default_profile.png";
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933

import { useForm, router, usePage } from "@inertiajs/react";
=======

import { useForm, usePage } from "@inertiajs/react";
>>>>>>> c3a0e03082ee157ebe23e0553389d8dac406e292
import DeleteModal from "@/Components/DeleteModal";
import ExcelExport from "@/Components/ExcelExport";
<<<<<<< HEAD
import toast from "react-hot-toast";
import CustomToast from "@/Components/CustomToast";
import PaginationInTable from "@/Components/PaginationInTable";
import SearchInput from "@/Components/SearchInput";
import DefaultCandidatePicture from '../../../../../public/storage/images/default_profile.png';
import AvatarComponent from "@/Components/AvatarComponent";
<<<<<<< HEAD


=======
import InfoIcon from "@/Components/InfoIcon";
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933

=======
import AddCandidateModal from "@/Components/AddCandidateModal";
import UpdateCandidateModal from "@/Components/UpdateCandidateModal";
>>>>>>> c3a0e03082ee157ebe23e0553389d8dac406e292

export function CandidateTable({ partylist_list, position_list, candidates, candidatesPerPage }) {
    const TABLE_HEAD = [
        "Candidate ID",
        "Profile",
        "First Name",
        "Middle Name",
        "Last Name",
        "Partylist",
        "Position",
        "Candidate Platform",
        "Action",
    ];

    const { election } = usePage().props;
    const { errors } = usePage().props;
    const [open, setOpen] = useState(false);
    const [openUpdateModal, setUpdateModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [id, setId] = useState(null);


    const [candidateProfile, setCandidateProfile] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    const { data, setData, post, delete: destroy, reset, processing, clearErrors } = useForm();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("candidate_profile", file);
        setCandidateProfile(file);
        setData(
            "candidate_profile",
            file
        );
    };

    //for add modal
    const handleOpen = () => {
        setOpen(!open)
    };

    //for update modal
    const handleUpdateOpen = (id) => {
        setUpdateModal(!openUpdateModal);

        // Find the candidate to update
        const candidateToUpdate = candidates.find(
            (candidate) => candidate.id === id

        );

        setId(id);

        if (candidateToUpdate) {
            // Set the initial form data based on the candidate's information
            setData({
                first_name: candidateToUpdate.first_name,
                middle_name: candidateToUpdate.middle_name,
                last_name: candidateToUpdate.last_name,
                partylist_id: candidateToUpdate.partylist_id,
                position_id: candidateToUpdate.position_id,
                manifesto: candidateToUpdate.manifesto,
                candidate_profile: `storage/${candidateToUpdate.candidate_profile}`,
            });

        } else {
            reset();
        }

    };
    //for delete modal
    const handleDeleteOpen = (id) => {

        setDeleteModal(!openDeleteModal);
        setId(id);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await post(route("candidate.store"), data); // Await the post request
            setOpen(false);

<<<<<<< HEAD
            // Reset form data and state for partylist and position
            setData({
                first_name: "",
                middle_name: "",
                last_name: "",
                partylist_id: null,
                position_id: null,
                manifesto: "",
                candidate_profile: null,
            });
            setMessage(`Candidate successfully added`);
            setIsSuccessMessage(true);
=======
        post(route("candidate.store", data), {
            onSuccess: () => {
                setOpen(false);
                setIsSuccessMessage(true);
                reset()
                clearErrors();
                toast.success("Candidate successfully created");
            },
            onError: () => {
                setOpen(true);
>>>>>>> a5d97759504b06652679829a51d708a4355848c1

<<<<<<< HEAD
            },
            preserveScroll: true
        });
=======
        } catch (error) {
            console.error("Error submitting form:", error);
        }
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
    };



    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send PUT request to update candidate data
            await post(route('candidate.update', { id: id }, data), {
                onSuccess: () => {

                    // Close the update modal
                    setUpdateModal(false);
                    // Reset form data and state for candidate
                    reset();

                    setIsSuccessMessage(true);
                    // Display success message
                    toast.success("Candidate successfully updated");
                },
                onError: () => {
                    setUpdateModal(true);
                },
                preserveScroll: true
            });

        } catch (error) {
            console.error("Failed to update candidate:", error);

        }
    };

    const handleDeleteCandidate = (candidateId) => {

        destroy(route('candidate.destroy', { id: candidateId }), {
            onSuccess: () => {
                setIsSuccessMessage(true);
                toast.success("Candidate successfully deleted");
                setDeleteModal(false);
            },
            onError: () => {
                setIsSuccessMessage(true);
                toast.error(errors[0])
                setDeleteModal(false);
            },
            preserveScroll: true,
        }
        );

    };
    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

<<<<<<< HEAD
<<<<<<< HEAD

=======
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
=======
    const exportCandidatesExcel = candidatesPerPage.data.map((candidate) => {
        return {
            'Election Name': candidate?.election?.title,
            'Candidate ID': candidate.id,
            'Candidate Name': `${candidate.first_name} ${candidate.middle_name ? candidate.middle_name : ''} ${candidate.last_name}`,
            'Candidate Partylist': candidate.partylist.name,
            'Candidate Position': candidate.position.name,
            'Candidate Platform': candidate.manifesto,
        }
    })
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
    return (
        <div>
            {isSuccessMessage && (
                <CustomToast />
            )}
            <Card className="h-full w-full">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Candidate
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                See information about all Candidate
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button
                                className="flex items-center gap-3 bg-blue-500"
                                size="sm"
                                onClick={handleOpen}
                                disabled={election.status === "Active"}
                            >
                                <UserPlusIcon
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                />
                                Add candidate
                            </Button>


<<<<<<< HEAD
                            <Dialog
                                size="xl"
                                open={open}
                                handler={handleOpen}
                                className="overflow-y-auto md:h-[95vh] "
                            >
                                <form onSubmit={handleSubmit}>
                                    <DialogHeader>Add Candidate</DialogHeader>
                                    <hr />
                                    <DialogBody>
                                        <div>
                                            <div className="mb-2">
                                                <InputLabel
                                                    htmlFor="candidateProfile"
                                                    value="Candidate Profile"
                                                    className="mb-4"
                                                />
                                                <div className="flex items-center gap-3">
                                                    <div className="mb-2">
<<<<<<< HEAD
                                                        {candidateProfile ? (
                                                            <Avatar
                                                                src={URL.createObjectURL(candidateProfile)}
                                                                alt="Candidate Avatar"
                                                                size="xxl"
                                                                withBorder={true}
                                                                color="blue"
                                                                className="p-0.5"
                                                            />
                                                        ) : (
                                                            <Avatar
                                                                src={DefaultCandidatePicture}
                                                                alt="Default Candidate Avatar"
                                                                size="xxl"
                                                                withBorder={true}
                                                                color="blue"
                                                                className="p-0.5"
                                                            />
                                                        )}
=======
                                                        <Avatar
                                                            src={candidateProfile ? URL.createObjectURL(candidateProfile) : DefaultProfileComponent}
                                                            alt="Candidate Avatar"
                                                            size="xxl"
                                                            withBorder={true}
                                                            color="blue"
                                                            className="p-0.5"
                                                        />
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="candidateImage"
                                                            className="relative cursor-pointer bg-gray-300 rounded-md font-medium py-2 px-4 mb-2 inline-flex items-center"
                                                        >
                                                            <span className="mr-2">
                                                                Choose a file
                                                            </span>
                                                            <input
                                                                type="file"
                                                                id="candidateImage"
                                                                name="candidate_profile"
                                                                className="hidden"
                                                                onChange={handleFileUpload}
                                                            />
                                                        </label>


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:flex md:flex-wrap md:gap-2">
                                                <div className="flex-1">
                                                    <InputLabel
                                                        htmlFor="firstName"
                                                        value="Candidate First Name"
                                                    />

                                                    <TextInput
                                                        id="firstName"
                                                        className="mt-1 block w-full"
                                                        name="first_name"
                                                        value={
                                                            data.first_name ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "first_name",
                                                                e.target.value
                                                            )
                                                        }

                                                        autoFocus
                                                        autoComplete="firstName"
                                                        placeholder="Enter Candidate First Name"
                                                    />

                                                    <InputError className="mt-2" message={errors.first_name} />
                                                </div>

                                                <div className="flex-1">
                                                    <InputLabel
                                                        htmlFor="middle_name"
                                                        value=" Candidate Middle Name (optional)"
                                                    />

                                                    <TextInput
                                                        id="middleName"
                                                        className="mt-1 block w-full"
                                                        value={
                                                            data.middle_name ||
                                                            ""
                                                        }
                                                        name="middle_name"
                                                        onChange={(e) =>
                                                            setData(
                                                                "middle_name",
                                                                e.target.value
                                                            )
                                                        }

                                                        autoFocus
                                                        autoComplete="middleName"
                                                        placeholder="Enter Candidate Middle Name"
                                                    />

                                                    <InputError className="mt-2" message={errors.middle_name} />
                                                </div>

                                                <div className="flex-1">
                                                    <InputLabel
                                                        htmlFor="lastName"
                                                        value="Candidate Last Name"
                                                    />

                                                    <TextInput
                                                        id="lastName"
                                                        className="mt-1 block w-full"
                                                        name="last_name"
                                                        value={
                                                            data.last_name || ""
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "last_name",
                                                                e.target.value
                                                            )
                                                        }

                                                        autoFocus
                                                        autoComplete="lastName"
                                                        placeholder="Enter Candidate last Name"
                                                    />

                                                    <InputError className="mt-2" message={errors.last_name} />
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <Select
                                                    label="Select Partylist"
                                                    value={data.partylist_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "partylist_id",
                                                            e
                                                        )
                                                    }
                                                    name="partylist"
                                                >
                                                    {partylist_list?.map(
                                                        (list) => (
                                                            <Option
                                                                key={list.id}
                                                                value={list.id}
                                                            >
                                                                {list?.name}
                                                            </Option>
                                                        )
                                                    )}
                                                </Select>

                                                <InputError className="mt-2" message={errors.partylist_id} />
                                            </div>

                                            <div className="mt-4">
                                                <Select
                                                    label="Select Position"
                                                    value={data.position_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "position_id",
                                                            e
                                                        )
                                                    }
                                                    name="position"
                                                >
                                                    {position_list?.map(
                                                        (list) => (
                                                            <Option
                                                                key={list.id}
                                                                value={list.id}
                                                            >
                                                                {list.name}
                                                            </Option>
                                                        )
                                                    )}
                                                </Select>

                                                <InputError className="mt-2" message={errors.position_id} />
                                            </div>
                                            <div className="mt-2">
                                                <InputLabel
                                                    htmlFor="lastName"
                                                    value="Candidate Platform"
                                                />
                                                <textarea
                                                    className="w-full rounded-md resize-none h-40 mt-1"

                                                    size="lg"
                                                    label="Enter Candidate Platform"
                                                    value={data.manifesto}
                                                    onChange={(e) =>
                                                        setData(
                                                            "manifesto",
                                                            e.target.value
                                                        )
                                                    }
                                                    name="manifesto"
                                                    placeholder="Enter candidate platform"
                                                />
                                                <InputError message={errors.manifesto} />
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
                                        <Button
                                            variant="gradient"
                                            color="blue"
                                            type="submit"
                                            disabled={processing}>
                                            <span>Confirm</span>
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Dialog>

                            {/*Update Candidate */}

                            <Dialog
                                size="xl"
                                open={openUpdateModal}
                                handler={handleUpdateOpen}
                                className="overflow-y-auto"
                            >
                                <form onSubmit={handleUpdateSubmit}>
                                    <DialogHeader>
                                        Update Candidate
                                    </DialogHeader>
                                    <DialogBody>
                                        <div>
                                            <div className="mb-2">
                                                <InputLabel
                                                    htmlFor="candidateUpdateProfile"
                                                    value="Update Candidate Profile"
                                                    className="mb-4"
                                                />
                                                <div className="flex items-center gap-3">
                                                    <div className="mb-2">
                                                        <Avatar
                                                            src={data.candidate_profile instanceof File ? URL.createObjectURL(data.candidate_profile) : (data.candidate_profile ? data.candidate_profile : DefaultCandidatePicture)}
                                                            alt="Candidate Avatar"
                                                            size="xxl"
                                                            color="blue"
                                                            withBorder={true}
                                                            className="p-0.5"
                                                        />

                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="candidateImage"
                                                            className="relative cursor-pointer bg-gray-300 rounded-md font-medium py-2 px-4 mb-2 inline-flex items-center"
                                                        >
                                                            <span className="mr-2">
                                                                Choose a file
                                                            </span>
                                                            <input
                                                                type="file"
                                                                id="candidateImage"
                                                                name="candidate_profile"
                                                                className="hidden"
                                                                onChange={(e) => setData({ ...data, candidate_profile: e.target.files[0] })}
                                                            />
                                                        </label>


                                                    </div>

                                                </div>
                                                <InputError className="mt-1" message={errors.candidate_profile} />
                                            </div>

                                            <div className="md:flex md:flex-wrap md:gap-2">
                                                <div className="flex-1">
                                                    <InputLabel
                                                        htmlFor="firstName"
                                                        value="Enter Candidate First Name"
                                                    />

                                                    <TextInput
                                                        id="firstName"
                                                        className="mt-1 block w-full"
                                                        name="first_name"
                                                        value={
                                                            data.first_name ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "first_name",
                                                                e.target.value
                                                            )
                                                        }

                                                        autoFocus
                                                        autoComplete="firstName"
                                                    />

                                                    <InputError className="mt-2" />
                                                </div>

                                                <div className="flex-1">
                                                    <InputLabel
                                                        htmlFor="middleName"
                                                        value="Enter Candidate Middle Name (optional)"
                                                    />

                                                    <TextInput
                                                        id="middleName"
                                                        className="mt-1 block w-full"
                                                        value={
                                                            data.middle_name ||
                                                            ""
                                                        }
                                                        name="middle_name"
                                                        onChange={(e) =>
                                                            setData(
                                                                "middle_name",
                                                                e.target.value
                                                            )
                                                        }

                                                        autoFocus
                                                        autoComplete="middleName"
                                                    />

                                                    <InputError className="mt-2" />
                                                </div>

                                                <div className="flex-1">
                                                    <InputLabel
                                                        htmlFor="lastName"
                                                        value="Enter Candidate Last Name"
                                                    />

                                                    <TextInput
                                                        id="lastName"
                                                        className="mt-1 block w-full"
                                                        name="last_name"
                                                        value={
                                                            data.last_name || ""
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "last_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                        autoFocus
                                                        autoComplete="lastName"
                                                    />

                                                    <InputError className="mt-2" />
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <Select
                                                    label="Select Partylist"
                                                    value={data.partylist_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "partylist_id",
                                                            e
                                                        )
                                                    }
                                                    name="partylist"
                                                >
                                                    {partylist_list?.map(
                                                        (list) => (
                                                            <Option
                                                                key={list.id}
                                                                value={list.id}
                                                            >
                                                                {list?.name}
                                                            </Option>
                                                        )
                                                    )}
                                                </Select>

                                                <InputError className="mt-2" />
                                            </div>

                                            <div className="mt-4">

                                                <Select
                                                    label="Select Position"
                                                    value={data.position_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "position_id",
                                                            e
                                                        )
                                                    }
                                                    name="position"
                                                >
                                                    {position_list?.map(
                                                        (list) => (
                                                            <Option
                                                                key={list.id}
                                                                value={list.id}
                                                            >
                                                                {list.name}
                                                            </Option>
                                                        )
                                                    )}

                                                </Select>

                                                <InputError className="mt-2" />
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="lastName"
                                                    value="Enter Candidate Platform"
                                                />
                                                <textarea
                                                    className="w-full rounded-md resize-none h-40 mt-1"

                                                    size="lg"
                                                    label="Enter Candidate Platform"
                                                    value={data.manifesto}
                                                    onChange={(e) =>
                                                        setData(
                                                            "manifesto",
                                                            e.target.value
                                                        )
                                                    }
                                                    name="manifesto"
                                                />
                                                <InputError className="mt-1" />
                                            </div>
                                        </div>
                                    </DialogBody>
                                    <DialogFooter>
                                        <Button
                                            variant="text"
                                            color="red"
                                            onClick={handleUpdateOpen}
                                            className="mr-1"
                                        >
                                            <span>Cancel</span>
                                        </Button>
                                        <Button
                                            variant="gradient"
                                            color="blue"
                                            type="submit"
                                            disabled={processing}
                                        >
                                            <span>Confirm</span>
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Dialog>
=======
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-end gap-2 md:flex-row me-3 mb-1">
                        <div className="flex justify-start gap-2">

                            <ExcelExport
                                data={exportCandidatesExcel}
                                fileName="candidate"
                            />
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
                                            {index !==
                                                TABLE_HEAD.length - 1 && (
                                                    <ChevronUpDownIcon
                                                        strokeWidth={2}
                                                        className="h-4 w-4"
                                                    />
                                                )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {candidatesPerPage.data.length === 0 || candidatesPerPage.data.filter(candidate =>
                                candidate.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                candidate.middle_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                candidate.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||

                                candidate.manifesto.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={TABLE_HEAD.length}
                                        className="text-center py-4 text-gray-900"
                                    >
                                        No candidates found
                                    </td>
                                </tr>
                            ) : (
                                candidatesPerPage.data
                                    .filter(candidate =>
                                        candidate.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        candidate.middle_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        candidate.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        candidate.manifesto.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(
                                        (
                                            {
                                                id,
                                                first_name,
                                                middle_name,
                                                last_name,

                                                partylist,
                                                position,
                                                manifesto,
                                                candidate_profile,
                                            },
                                            index
                                        ) => {

                                            const partylistName = partylist
                                                ? partylist.name
                                                : "Unknown";
                                            const positionName = position
                                                ? position.name
                                                : "Unknown";

                                            const isLast =
                                                index === candidates.length - 1;
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
<<<<<<< HEAD

                                                                <AvatarComponent Profile={candidate_profile} />
=======
                                                                {id}
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
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
                                                            <Avatar
                                                                src={
                                                                    candidate_profile
                                                                        ? candidate_profile
                                                                        : DefaultCandidatePicture
                                                                }
                                                            />
                                                        </Typography>
<<<<<<< HEAD
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {first_name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {middle_name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {last_name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {partylistName}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {positionName}
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
                                                            <IconButton
                                                                variant="text"
                                                                className="bg-amber-700 text-white"
                                                                onClick={() =>
                                                                    handleUpdateOpen(
                                                                        id
                                                                    )
                                                                }
                                                            >
                                                                <PencilIcon className="h-5 w-5" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip content="Delete Candidate">
                                                            <IconButton
                                                                variant="text"
                                                                className="bg-red-700 text-white"
                                                                onClick={() =>
                                                                    handleDeleteOpen(
                                                                        id
                                                                    )
                                                                }
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    className="w-5 h-5"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )
=======
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {middle_name}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {last_name}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {partylistName}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {positionName}
                                                        </Typography>
                                                    </td>
                                                    <td className={`${classes} w-64`}>
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
                                                                <IconButton
                                                                    variant="text"
                                                                    className="bg-amber-700 text-white"
                                                                    onClick={() =>
                                                                        handleUpdateOpen(
                                                                            id
                                                                        )
                                                                    }
                                                                    disabled={election.status === "Active"}
                                                                >
                                                                    <PencilIcon className="h-5 w-5" />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip content="Delete Candidate">
                                                                <IconButton
                                                                    variant="text"
                                                                    className="bg-red-700 text-white"
                                                                    onClick={() =>
                                                                        handleDeleteOpen(
                                                                            id
                                                                        )
                                                                    }
                                                                    disabled={election.status === "Active"}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="currentColor"
                                                                        className="w-5 h-5"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
                            )}
                        </tbody>

                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <PaginationInTable dataPerPage={candidatesPerPage} />
                </CardFooter>

            </Card>


            {/**Add Canidate*/}

            <AddCandidateModal open={open} handleOpen={handleOpen} handleSubmit={handleSubmit} candidateProfile={candidateProfile} handleFileUpload={handleFileUpload} DefaultCandidatePicture={DefaultCandidatePicture} data={data} setData={setData} partylist_list={partylist_list} position_list={position_list} errors={errors} processing={processing} />

            {/*Update Candidate */}

            <UpdateCandidateModal openUpdateModal={openUpdateModal} handleUpdateOpen={handleUpdateOpen} handleUpdateSubmit={handleUpdateSubmit} data={data} setData={setData} DefaultCandidatePicture={DefaultCandidatePicture} partylist_list={partylist_list} position_list={position_list} errors={errors} processing={processing} />

            {/*Delete Candidate Modal */}
            <DeleteModal
                open={openDeleteModal}
                handleDeleteOpen={handleDeleteOpen}
                handleDeleteData={handleDeleteCandidate}
                id={id}
                dataName="Candidate"
                processing={processing}
            />
        </div>
    );
}
