import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Switch
} from "@material-tailwind/react";
import toast from 'react-hot-toast';
import CustomToast from '@/Components/CustomToast';

import { LuAlarmClockOff } from "react-icons/lu";

import { ElectionTable } from '@/Components/ElectionTable';

const Election = ({ auth, existingElection, election, electionPerPage, electionWithCandidatesAndVotes }) => {

  const status = election?.status == 'Active' ? true : false;

  const { data, setData, post, put, errors, reset, processing } = useForm({
    title: status ? election.title : '',
    start_date: status ? election.start_date : '',
    end_date: status ? election.end_date : '',
    status: status ? status : false
  });
  console.log(electionWithCandidatesAndVotes);
  const [activateOpen, setActivateOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [electionEndedModalOpen, setElectionEndedModalOpen] = useState(false);
  const [archivedElectionModal, setArchivedElectionModal] = useState(false);
  const [stopElectionModal, setStopElectionModal] = useState(false);

  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  useEffect(() => {
    setData({
      title: election ? election?.title : '',
      start_date: election ? election?.start_date : '',
      end_date: election ? election?.end_date : '',
      status: election ? election?.status : false
    });
    if (election && new Date(election.end_date) < new Date()) {
      setElectionEndedModalOpen(true);

    }
  }, [election]);


  const handleActivateOpen = () => setActivateOpen(!activateOpen);
  const handleDeactivateOpen = () => setDeactivateOpen(!deactivateOpen);
  const handleElectionEndedModalOpen = () => setElectionEndedModalOpen(!electionEndedModalOpen);
  const handleStopElectionModalOpen = () => setStopElectionModal(!stopElectionModal);

  const handleArchiveElectionModal = () => setArchivedElectionModal(!archivedElectionModal);


  let isElectionEnded = new Date(election?.end_date) < new Date();

  console.log(isElectionEnded);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const route = existingElection ? `/election/${existingElection.id}` : '/election';

      await post(route, {
        onSuccess: () => {
          setIsSuccessMessage(true);
          setElectionEndedModalOpen(false);
          toast.success(election ? 'Election updated successfully.' : 'Election created successfully.');
        },
        preserveScroll: true
      });

      //Reset form data
      reset({
        title: '',
        start_date: '',
        end_date: '',
        status: false
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleActivate = () => {
    try {
      put('/election/activate');
      setData('status', true);
      toast.success("Election activated successfully.");
      setIsSuccessMessage(true);
      setActivateOpen(false);


    } catch (error) {
      console.error(error);

    }
  };

  const handleDeactivate = () => {
    try {
      put('/election/deactivate');
      setData('status', false);


      setIsSuccessMessage(true);
      toast.success("Election deactivated successfully.");
      setDeactivateOpen(false);
      reset({
        title: '',
        start_date: '',
        end_date: '',
        status: false
      });


    } catch (error) {
      console.error(error);

    }
  };



  //handle stop election
  const handleStopElectionSubmit = async () => {
    try {
      put(`/election/stop`);
      toast.success('Election stopped successfully.');
      setIsSuccessMessage(true);
      setStopElectionModal(false);

    } catch (error) {
      console.error(error);
    }
  }
  return (

    <AuthenticatedLayout user={auth.user} header={<h2 className="font-medium text-xl text-gray-800 leading-tight">Election</h2>}>
      {isSuccessMessage && <CustomToast />}
      {election && election.end_date && election.end_date < new Date() && setElectionEndedModalOpen(true)}
      <div className="flex flex-col md:flex-row min-h-screen">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-5">
            <div >

            </div>
            <div className='flex gap-2 justify-end'>

              <div className='text-end'>
                <Button color='red' variant='gradient' onClick={handleStopElectionModalOpen} disabled={isElectionEnded} className='flex items-center gap-2'>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                  </svg>

                  Force Stop Election</Button>
              </div>
              {election && new Date(election.end_date) < new Date() && (
                <div className='text-end'>


                  <Button color='blue' variant='gradient' onClick={handleElectionEndedModalOpen} className='flex items-center gap-2 px-3'>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    Create New Election
                  </Button>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} >
              <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg mb-5">
                <div className='flex gap-3'>
                  <div className='text-lg font-medium'>Activate Election</div>
                  <Switch onClick={() => {
                    if (!status) {
                      setActivateOpen(true);
                    } else {
                      setDeactivateOpen(true);
                    }
                  }} color='blue' checked={status}
                    onChange={() => setData('status', !data.status)}
                    disabled={isElectionEnded} />
                </div>
              </div>
              <div className={`p-4 sm:p-8 bg-white shadow sm:rounded-lg`} >

                <header className='mb-5'>
                  <h2 className="text-lg font-medium text-gray-900" >Election Title</h2>
                  <p className="mt-1 text-sm text-gray-600">Set Election Title</p>
                </header>

                <div>
                  <div>
                    <InputLabel htmlFor="title" value="Set Election Title" />
                    <TextInput
                      id="title"
                      className="mt-1 block w-full  lg:w-96"
                      type='text'
                      value={data.title}
                      placeholder="Enter Election Title"
                      onChange={(e) => setData('title', e.target.value)}
                      disabled={isElectionEnded || election?.status === 'Active'}
                    />
                    <InputError className="mt-2" message={errors.title} />
                  </div>
                </div>
                <div className="mt-5">
                </div>

                <header className='mb-5'>
                  <h2 className="text-lg font-medium text-gray-900">Election Date</h2>
                  <p className="mt-1 text-sm text-gray-600">Set Election Date</p>
                </header>

                <div className='flex flex-col md:flex-row lg:flex-row gap-4'>
                  <div>
                    <InputLabel htmlFor="start_date" value="Start Date" />
                    <TextInput
                      id="start_date"
                      className="mt-1 block w-full"
                      type='datetime-local'
                      value={data.start_date}
                      onChange={(e) => setData('start_date', e.target.value)}
                      disabled={isElectionEnded || election?.status === 'Active'}
                    />
                    <InputError className="mt-2" message={errors.start_date} />
                  </div>
                  <div>
                    <InputLabel htmlFor="end_date" value="End Date" />
                    <TextInput
                      id="end_date"
                      className="mt-1 block w-full"
                      type='datetime-local'
                      value={data.end_date}
                      onChange={(e) => setData('end_date', e.target.value)}
                      disabled={isElectionEnded || election?.status === 'Active'}
                    />
                    <InputError className="mt-2" message={errors.end_date} />
                  </div>
                </div>
                <div className='mt-5'>
                  <Button color='blue' variant='gradient' type="submit" disabled={processing || isElectionEnded || election?.status === 'Active'}>{election ? 'Update' : 'Create'}</Button>
                </div>
              </div>
            </form>
            <div>
              <div className='text-4xl mt-12 mb-2'>Election </div>
              <ElectionTable electionPerPage={electionPerPage} />
            </div>
          </div>

        </main>
      </div>

      {/*Activate Modal */}
      <Dialog open={activateOpen} handler={handleActivateOpen}>
        <DialogHeader>Confirm Election Activation</DialogHeader>
        <DialogBody>
          <div className='flex justify-center mb-5'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>

            </div>
          </div>

          <div className='text-gray-900 text-center'>Are you sure you want to activate the election? Once election activated, students will be able to participate in the election.</div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleActivateOpen}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="blue" onClick={handleActivate}>
            Activate Election
          </Button>
        </DialogFooter>
      </Dialog>

      {/*Deactivate Modal */}
      <Dialog open={deactivateOpen} handler={handleDeactivateOpen}>
        <DialogHeader>Confirm Election Deactivation</DialogHeader>
        <DialogBody>
          <div className='flex justify-center mb-5'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>

            </div>
          </div>
          <div className='text-gray-900 text-center'>
            Are you sure you want to deactivate the election? Once deactivated, users will no longer be able to participate in the election.
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleDeactivateOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleDeactivate}>
            Deactivate Election
          </Button>
        </DialogFooter>
      </Dialog>


     
      <Dialog open={electionEndedModalOpen} handler={handleElectionEndedModalOpen}>
        <DialogHeader>Election Ended</DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <div className='flex justify-center mb-5'>
              <LuAlarmClockOff className='w-32 h-32 text-red-500' />
            </div>
            <div className='text-gray-900 text-center'>The election has ended. Do you want to create a new election?</div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleElectionEndedModalOpen}
              className="mr-1"
            >
              Cancel
            </Button>
            <Button variant="gradient" color="blue" type='submit' disabled={processing}>
              Create New Election
            </Button>
          </DialogFooter>

        </form>
      </Dialog>

      {/*Archived Election Modal */}
      <Dialog open={archivedElectionModal} handler={handleArchiveElectionModal}>
        <DialogHeader>Election Archived</DialogHeader>
        <DialogBody>
          <div className='flex justify-center mb-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-blue-gray-900">
              <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>

          </div>
          <div className='text-gray-900 text-center'>The election has ended. Do you want to archived previous  election?</div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleArchiveElectionModal}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="blue" >
            Archived
          </Button>
        </DialogFooter>
      </Dialog>

      {/*Election stop Modal */}
      <Dialog open={stopElectionModal} handler={handleStopElectionModalOpen}>
        <DialogHeader>Election Stop</DialogHeader>
        <DialogBody>
          <div className='flex justify-center mb-5'>


            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 bg-gray-100 text-red-500 rounded-md" alt="Stop icon">
              <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
            </svg>

          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-gray-900'>Are you sure you want to stop the election?</div>
            <div className='text-red-700 text-md font-medium'>
              This action cannot be undone.
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="black"
            onClick={handleStopElectionModalOpen}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="red" onClick={handleStopElectionSubmit} >
            Stop the Election
          </Button>
        </DialogFooter>
      </Dialog>

    </AuthenticatedLayout>
  );
}

export default Election;
