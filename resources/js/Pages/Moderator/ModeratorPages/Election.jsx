import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Switch
} from "@material-tailwind/react";
import { Alert } from "@material-tailwind/react";
import InfoIcon from '@/Components/InfoIcon';

const Election = ({ auth, existingElection, election }) => {

  const status = election?.status == 'Active' ? true : false;

  const { data, setData, post, put, errors, reset } = useForm({
    title: status ? election.title : '',
    start_date: status ? election.start_date : '',
    end_date: status ? election.end_date : '',
    status: status ? status : false
  });

  const [activateOpen, setActivateOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);


  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    setData({
      title: status ? election.title : '',
      start_date: status ? election.start_date : '',
      end_date: status ? election.end_date : '',
      status: status ? election.status : false
    });
  }, [election]);

  console.log(errors);

  const handleActivateOpen = () => setActivateOpen(!activateOpen);
  const handleDeactivateOpen = () => setDeactivateOpen(!deactivateOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const route = existingElection ? `/election/${existingElection.id}` : '/election';
      await post(route);

      setSuccessMessage(status ? 'Election updated successfully.' : 'Election created successfully.');
      reset();
      window.location.reload();
    } catch (error) {
      console.error(error);

    }
  };

  const handleActivate = () => {
    try {
      put('/election/activate');
      setData('status', true);
      setSuccessMessage('Election activated successfully.');
      setActivateOpen(false);
      window.location.reload();

    } catch (error) {
      console.error(error);

    }
  };

  const handleDeactivate = () => {
    try {
      put('/election/deactivate');
      setData('status', false);
      setSuccessMessage('Election deactivated successfully.');
      setDeactivateOpen(false);
      window.location.reload();

      if (votesCount > 0) {
        setError('Cannot deactivate the election because votes have been cast.');
        return;
      }

    } catch (error) {
      console.error(error);

    }
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-medium text-xl text-gray-800 leading-tight">Election</h2>}>
      <div className="flex flex-col md:flex-row min-h-screen">
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            {successMessage && <Alert icon={<InfoIcon />} color="green" className="mt-3">{successMessage}</Alert>}
            <form onSubmit={handleSubmit}>
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
                    onChange={() => setData('status', !data.status)} />
                </div>
              </div>
              <div className={`p-4 sm:p-8 bg-white shadow sm:rounded-lg  ${status ? '' : 'opacity-60'}`} >

                <header className='mb-5'>
                  <h2 className="text-lg font-medium text-gray-900" >Election Title</h2>
                  <p className="mt-1 text-sm text-gray-600">Set Election Title</p>
                </header>
                <div className='flex gap-4'>
                  <div>
                    <InputLabel htmlFor="title" value="Set Election Title" />
                    <TextInput
                      id="title"
                      className="mt-1 block w-full"
                      type='text'
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      disabled={!status}
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
                      type='datetime-local' // Change type to 'datetime-local'
                      value={data.start_date} // Display the start_date from the data object
                      onChange={(e) => setData('start_date', e.target.value)}
                      disabled={!status}
                    />
                    <InputError className="mt-2" message={errors.start_date} />
                  </div>
                  <div>
                    <InputLabel htmlFor="end_date" value="End Date" />
                    <TextInput
                      id="end_date"
                      className="mt-1 block w-full"
                      type='datetime-local' // Change type to 'datetime-local'
                      value={data.end_date} // Display the end_date from the data object
                      onChange={(e) => setData('end_date', e.target.value)}
                      disabled={!status}
                    />
                    <InputError className="mt-2" message={errors.end_date} />
                  </div>
                </div>
                <div className='mt-5'>
                  <PrimaryButton type="submit" disabled={!status}>{status ? 'Update' : 'Save'}</PrimaryButton>
      

                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
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

          <div>Are you sure you want to activate the election? Once status, students will be able to participate in the election.</div>
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
          Are you sure you want to deactivate the election? Once deactivated, users will no longer be able to participate in the election.
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
            <span>Deactivate Election</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </AuthenticatedLayout>
  );
}

export default Election;
