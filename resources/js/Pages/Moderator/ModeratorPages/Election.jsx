import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';

const Election = ({ auth }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [existingElection, setExistingElection] = useState(null);

  useEffect(() => {
    const fetchExistingElection = async () => {
      try {
        const response = await axios.get('/elections');
        const existingElectionData = response.data;

        if (existingElectionData) {
          setExistingElection(existingElectionData);
          setTitle(existingElectionData.title);
          setStartDate(existingElectionData.start_date);
          setEndDate(existingElectionData.end_date);
        }
      } catch (error) {
        console.error(error);
        // setError('Failed to fetch existing election data.');
      }
    };

    fetchExistingElection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (existingElection) {
        // Handle updating existing election
      } else {
        // Handle creating new election
        const response = await axios.post('/api/elections', {
          title,
          start_date: startDate,
          end_date: endDate,
        });

        setSuccessMessage(response.data.message);
        setTitle('');
        setStartDate('');
        setEndDate('');
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to create/update election. Please try again.');
    }
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Election</h2>}>
      <div className="flex flex-col md:flex-row min-h-screen">
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <InputError className="mt-2" />
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
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <InputError className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="end_date" value="End Date" />
                    <TextInput
                      id="end_date"
                      className="mt-1 block w-full"
                      type='datetime-local' // Change type to 'datetime-local'
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <InputError className="mt-2" />
                  </div>

                </div>
                <div className='mt-5'>
                  <PrimaryButton type="submit">{existingElection ? 'Update' : 'Save'}</PrimaryButton>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                  {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}

export default Election;
