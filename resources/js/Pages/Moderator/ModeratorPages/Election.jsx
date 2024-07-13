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
import ElectionEndedModal from '@/Components/ElectionEndedModal';
import StopElectionModal from '@/Components/StopElectionModal';
import DeactivateElectionModal from '@/Components/DeactivateElectionModal';
import ActivateElectionModal from '@/Components/ActivateElectionModal';

const Election = ({ auth, existingElection, election, electionPerPage, electionWithCandidatesAndVotes }) => {

  const status = election?.status == 'Active' ? true : false;

  const { data, setData, post, put, errors, reset, processing } = useForm({
    title: status ? election.title : '',
    start_date: status ? election.start_date : '',
    end_date: status ? election.end_date : '',
    status: status ? status : false
  });

  const [activateOpen, setActivateOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [electionEndedModalOpen, setElectionEndedModalOpen] = useState(false);
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

  let isElectionEnded = election?.status === 'Ended' || new Date(election?.end_date) < new Date();


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

  const handleActivate = async () => {
    try {
      await put(route('election.activate', election), {
        onSuccess: () => {
          toast.success("Election activated successfully.");

          setData('status', true);
          setActivateOpen(false);
          setIsSuccessMessage(true);
        },
        onError: (errors) => {
          toast.error(errors && errors.error);
     
          setActivateOpen(false);
          setIsSuccessMessage(true);
        
        },
        preserveScroll: true
      });
    } catch (error) {
      console.error(error);

    }
  };

  const handleDeactivate = async () => {
    try {
      await put('/election/deactivate');
      setData('status', false);


      setIsSuccessMessage(true);
      setDeactivateOpen(false);
      toast.success("Election deactivated successfully.");

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

      setIsSuccessMessage(true);
      setStopElectionModal(false);
      toast.success('Election stopped successfully.');
    } catch (error) {
      console.error(error);
    }
  }

  const colorStatus = {
    'Completed': ' text-green-800',
    'Active': ' text-blue-800 dark:text-blue-500',
    'Inactive': ' text-gray-800',
    'Ended': 'text-red-800'
  }
  
  const getColorStatus = (status) => {
    return colorStatus[status] || 'bg-gray-500';
  }

  return (

    <AuthenticatedLayout user={auth.user} header={<h2 className="font-medium text-xl  leading-tight">Election</h2>}>
      {isSuccessMessage && <CustomToast />}
      {election && election.end_date && election.end_date < new Date() && setElectionEndedModalOpen(true)}
      <div className="flex flex-col md:flex-row min-h-screen">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-5">

            <div className='mt-10 flex gap-2 justify-between items-center'>
              <div className='text-2xl dark:text-white'>Election Status: <span className={`font-medium px-3 py-1 rounded-md ${getColorStatus(isElectionEnded ? 'Ended' : election?.status)}`}>{isElectionEnded ? 'Ended' : election?.status}</span>
              </div>
              <div className='flex gap-3'>
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

            </div>
            <form onSubmit={handleSubmit} >
              <div className="p-4 sm:p-8 bg-white dark:dark:bg-[#252525] dark:text-white shadow sm:rounded-lg mb-5">
                <div className='flex gap-3'>
                  <div className='text-lg font-medium'>Pause/Resume Election</div>
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
              <div className={`p-4 sm:p-8 bg-white shadow-sm sm:rounded-lg dark:dark:bg-[#252525] `} >

                <header className='mb-5 '>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200" >Election Title</h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">Set Election Title</p>
                </header>

                <div>
                  <div>
                    <InputLabel htmlFor="title" value="Election Title" className='dark:text-gray-200' />
                    <TextInput
                      id="title"
                      className="mt-1 block w-full  lg:w-96 dark:bg-[#1f1f1f] dark:border-gray-800 dark:text-gray-50"
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

                <header className='mb-5 '>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Election Date</h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">Set Election Date</p>
                </header>

                <div className='flex flex-col md:flex-row lg:flex-row gap-4'>
                  <div>
                    <InputLabel htmlFor="start_date" value="Start Date" className='dark:text-gray-200' />
                    <TextInput
                      id="start_date"
                      className="mt-1 block w-full dark:bg-[#1f1f1f] dark:border-gray-800 dark:text-gray-50"
                      type='datetime-local'
                      value={data.start_date}
                      onChange={(e) => setData('start_date', e.target.value)}
                      disabled={election?.status === 'Ended' || isElectionEnded || election?.status === 'Active'}
                    />
                    <InputError className="mt-2" message={errors.start_date} />
                  </div>
                  <div>
                    <InputLabel htmlFor="end_date" value="End Date" className='dark:text-gray-200' />
                    <TextInput
                      id="end_date"
                      className="mt-1 block w-full dark:bg-[#1f1f1f] dark:border-gray-800 dark:text-gray-50"
                      type='datetime-local'
                      value={data.end_date}
                      onChange={(e) => setData('end_date', e.target.value)}
                      disabled={election?.status === 'Ended' || isElectionEnded || election?.status === 'Active'}
                    />
                    <InputError className="mt-2" message={errors.end_date} />
                  </div>
                </div>
                <div className='mt-5'>
                  <Button color='blue' variant='gradient' type="submit" disabled={processing || isElectionEnded || election?.status === 'Active'}>{election ? 'Update' : 'Create'}</Button>
                </div>
              </div>
            </form>

          </div>



        </main>
      </div>



      <ActivateElectionModal activateOpen={activateOpen} handleActivateOpen={handleActivateOpen} handleActivate={handleActivate} processing={processing} />
      <DeactivateElectionModal deactivateOpen={deactivateOpen} handleDeactivateOpen={handleDeactivateOpen} handleDeactivate={handleDeactivate} processing={processing} />
      <ElectionEndedModal electionEndedModalOpen={electionEndedModalOpen} handleElectionEndedModalOpen={handleElectionEndedModalOpen} handleSubmit={handleSubmit} confirmText="The election has ended. Do you want to create a new election?" confirmButtonText="Create New Election" processing={processing} />
      <StopElectionModal stopElectionModal={stopElectionModal} handleStopElectionModalOpen={handleStopElectionModalOpen} handleStopElectionSubmit={handleStopElectionSubmit} processing={processing} />


    </AuthenticatedLayout>
  );
}

export default Election;
