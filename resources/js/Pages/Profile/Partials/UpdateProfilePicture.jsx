import React, { useState } from 'react';
import { Avatar } from '@material-tailwind/react';
import PrimaryButton from '@/Components/PrimaryButton';

import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';

const UpdateProfilePicture = ({ user }) => {
  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    profile_picture: null,
  });

  const handleFileChange = (event) => {
    setData('profile_picture', event.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    post(route('profile.uploadProfile'));
  };

  return (
    <div>
      <div className='mb-5'>
        <div className=' text-lg font-medium text-gray-900'>Upload Profile Picture</div>
        <p className='mt-1 text-sm text-gray-600'>Update your profile picture.</p>
      </div>
      <div className='flex gap-2'>
        <Avatar
          src={data.profile_picture ? URL.createObjectURL(data.profile_picture) : user.profile_picture ? `storage/${user.profile_picture}` : DefaultUserProfile}
          alt="Default Profile Picture"
          size='xxl'
          withBorder={true}
          color='blue'
          className='p-0.5'
        />
        
        <div className='mt-3s'>
          <input
            className='hidden'
            type='file'
            name='profile_picture'
            id='profilePicture'
            onChange={handleFileChange}
          />
          <label
            htmlFor='profilePicture'
            className='cursor-pointer text-blue-700 hover:text-blue-800 transition ease-in-out duration-300  font-bold py-2 px-2 rounded inline-flex items-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
            </svg>
            Upload Profile Picture
          </label>
        </div>

        
      </div>
      <InputError className='mt-2' message={errors.profile_picture}/>
      <div>
        <InputError className="mt-2" message={errors.name} />
      </div>
      <div className="mt-5 flex items-center gap-4">
        <PrimaryButton onClick={handleUpload} disabled={processing}>Save</PrimaryButton>

        <Transition
          show={recentlySuccessful}
          enter="transition ease-in-out"
          enterFrom="opacity-0"
          leave="transition ease-in-out"
          leaveTo="opacity-0"
        >
          <p className="text-sm text-gray-600">Saved.</p>
        </Transition>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
