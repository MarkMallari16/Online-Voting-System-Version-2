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

const Election = ({ auth, existingElection, election }) => {
  const { data, setData, post, put, errors, reset } = useForm({
    title: existingElection ? existingElection.title : '',
    start_date: existingElection ? existingElection.start_date : '',
    end_date: existingElection ? existingElection.end_date : '',
    status: existingElection ? existingElection.status : false
  });
  console.log(election)
  const status = election?.status == 'Active' ? true : false

  const [activateOpen, setActivateOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setData({
      title: existingElection ? existingElection.title : '',
      start_date: existingElection ? existingElection.start_date : '',
      end_date: existingElection ? existingElection.end_date : '',
      status: existingElection ? existingElection.status : false
    });
  }, [existingElection]);

  const handleActivateOpen = () => setActivateOpen(!activateOpen);
  const handleDeactivateOpen = () => setDeactivateOpen(!deactivateOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const route = existingElection ? `/election/${existingElection.id}` : '/election';
      await post(route);

      setSuccessMessage(existingElection ? 'Election updated successfully.' : 'Election created successfully.');
      reset();
    } catch (error) {
      console.error(error);
      setError('Failed to create/update election. Please try again.');
    }
  };

  const handleActivate = async () => {
    try {
      await put('/election/activate');
      setData('status', true);
      setSuccessMessage('Election status successfully.');
      setActivateOpen(false)
      await window.location.reload()

    } catch (error) {
      console.error(error);
      setError('Failed to activate election. Please try again.');
    }
  };

  const handleDeactivate = async () => {
    try {
      await put('/election/deactivate');
      setData('status', false);
      setSuccessMessage('Election deactivated successfully.');
      setDeactivateOpen(false)
      await window.location.reload()
    } catch (error) {
      console.error(error);
      setError('Failed to deactivate election. Please try again.');
    }
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Election</h2>}>
      <div className="flex flex-col md:flex-row min-h-screen">
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg mb-5">
                <div className='flex gap-3'>
                  <div>Activate Election</div>
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
                  <h2 className="text-lg font-medium text-gray-900">Election Title</h2>
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
                    <InputError className="mt-2" error={errors.title} />
                  </div>
                </div>
                <div className="mt-5">
                </div>
                <header className='mb-5'>
                  <h2 className="text-lg font-medium text-gray-900">Election Date</h2>
                  <p className="mt-1 text-sm text-gray-600">Set Election Date</p>
                </header>
                <div className='flex gap-4'>
                  <div>
                    <InputLabel htmlFor="start_date" value="Start Date" />
                    <TextInput
                      id="start_date"
                      className="mt-1 block w-full"
                      type='datetime-local' // Change type to 'datetime-local'
                      value={data.start_date}
                      onChange={(e) => setData('start_date', e.target.value)}
                      disabled={!status}
                    />
                    <InputError className="mt-2" error={errors.start_date} />
                  </div>
                  <div>
                    <InputLabel htmlFor="end_date" value="End Date" />
                    <TextInput
                      id="end_date"
                      className="mt-1 block w-full"
                      type='datetime-local' // Change type to 'datetime-local'
                      value={data.end_date}
                      onChange={(e) => setData('end_date', e.target.value)}
                      disabled={!status}
                    />
                    <InputError className="mt-2" error={errors.end_date} />
                  </div>
                </div>
                <div className='mt-5'>
                  <PrimaryButton type="submit" disabled={!status}>{existingElection ? 'Update' : 'Save'}</PrimaryButton>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                  {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
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
              {/* Insert the SVG component here */}
            </div>
          </div>

          Are you sure you want to activate the election? Once status, students will be able to participate in the election.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleActivateOpen}
            className="mr-1"
         
>
            </Button>
          <Button variant="gradient" color="blue" onClick={handleActivate}>
            <span>Activate Election</span>
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
