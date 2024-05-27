import React, { useState } from 'react';
import { Avatar, Tooltip } from '@material-tailwind/react';
import PrimaryButton from '@/Components/PrimaryButton';
<<<<<<< HEAD

import { useForm } from '@inertiajs/react';
=======
import defaultProfile from '../../../../../public/profile_photos/default_profile.png';
import { useForm } from '@inertiajs/inertia-react';
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import DefaultUserProfile from '@/Components/DefaultUserProfile';

const UpdateProfilePicture = ({ user }) => {
  const { data, setData, post, errors, processing, progress, recentlySuccessful } = useForm({
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
        <div className='text-lg font-medium text-gray-900 dark:text-gray-50'>Upload Profile Picture</div>
        <p className='mt-1 text-sm text-gray-600'>Update your profile picture.</p>
      </div>
<<<<<<< HEAD
      <div className='flex gap-2'>
        <Avatar
<<<<<<< HEAD
          src={data.profile_picture ? URL.createObjectURL(data.profile_picture) : user.profile_picture ? `storage/${user.profile_picture}` : DefaultUserProfile}
          alt="Default Profile Picture"
=======
          src={data.profile_picture ? URL.createObjectURL(data.profile_picture) : user.profile_picture ? user.profile_picture : defaultProfile}
          alt='profile'
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
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
=======
      <div className='flex gap-4 mb-10'>
        <div className='bg-[url("/sti-images/STIBacoorSHSCouncilLogo.png")] bg-cover h-96 w-full rounded-md relative'>
          <div className='relative '>
            <Avatar
              src={data.profile_picture ? URL.createObjectURL(data.profile_picture) : user.profile_picture ? `storage/${user.profile_picture}` : DefaultUserProfile}
              alt="Profile Picture"
              size='xxl'
              withBorder={true}
             
              className='border-none bg-white absolute p-0.5 top-80 right-10  '
            />
            <div className='absolute text-white top-96 right-10  bg-gray-800 hover:bg-gray-900 transition-all ease-out p-2 rounded-full cursor-pointer  z-50'>
              <Tooltip content="Change Profile" >
                <label htmlFor="fileInput">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 cursor-pointer">
                    <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                    <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                  </svg>

                  <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                </label>
              </Tooltip>
            </div>
          </div>
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
        </div>



      </div>
      <InputError className='mt-16 ' message={errors.profile_picture} />
      <div>
        <InputError className="mt-2" message={errors.name} />
      </div>
      <div className="mt-2 flex items-center gap-4">
        <PrimaryButton onClick={handleUpload} disabled={processing}>Save</PrimaryButton>

        <Transition
          show={recentlySuccessful}
          enter="transition ease-in-out"
          enterFrom="opacity-0"
          leave="transition ease-in-out"
          leaveTo="opacity-0"
        >
          <p className="text-sm text-gray-600">Profile successfully uploaded!</p>
        </Transition>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
