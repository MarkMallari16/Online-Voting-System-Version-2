import React, { useEffect, useState } from 'react';

import { useForm } from '@inertiajs/inertia-react';
import {
  Button,
  Input,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Text
} from "@material-tailwind/react";
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

const EditUserModal = ({ open, handleClose, user }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);

  }

  const { data, setData, put, reset, errors } = useForm({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    password_confirmation: "",
  });

  const handleOnChange = (event) => {
    setData({
      ...data,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  useEffect(() => {
    if (user && user.id) {
      setData({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.id) {
      console.error("User ID is missing");
      return;
    }

    put(route("users.update", { id: user.id }), {
      onSuccess: () => {
        handleClose();
        reset();
      },
      onError: (errors) => {
        // Handle the errors if needed
      }
    });
  };

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Update User</DialogHeader>
      <form onSubmit={handleSubmit}>
        <DialogBody>
          <div className=" mb-3">
            <InputLabel htmlFor='name' value="Name" />
            <TextInput type="text" label="Name" name="name" onChange={handleOnChange} value={data.name} className='w-full' />
            {errors.name && <Text color="red">{errors.name}</Text>}
          </div>
          <div className=" mb-3">
            <InputLabel htmlFor='email' value="Email" />
            <TextInput type="email" label="Email" name="email" onChange={handleOnChange} value={data.email} className='w-full' />
            {errors.email && <Text color="red">{errors.email}</Text>}
          </div>
          <div className=" mb-3">
            <Select
              label="Role"
              name="role"
              onChange={(value) => setData({ ...data, role: value })}
              value={data.role}

            >
              <Option value='admin'>Admin</Option>
              <Option value='moderator'>Moderator</Option>
              <Option value='partylist_editor'>Partylist Editor</Option>
              <Option value='voter'>Voter</Option>
            </Select>
            {errors.role && <Text color="red">{errors.role}</Text>}
          </div>
          <div className="mb-12 relative">
            <InputLabel htmlFor="password" value="Password" />
            <TextInput type={showPassword ? 'text' : 'password'} label="Password" name="password" onChange={handleOnChange} className='w-full absolute' autoComplete="new-password" />
            <div className='absolute cursor-pointer end-0 mt-2'>
              {showPassword ? (

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-2" onClick={handleShowPassword}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-2" onClick={handleShowPassword}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </div>
          </div>
          <div className="mb-8 relative">

            <InputLabel htmlFor="confirm_password" value="Confirm Password" />
            <TextInput type={showConfirmPassword ? 'text' : 'password'} label="Confirm Password" name="password_confirmation" onChange={handleOnChange} className='w-full absolute' autoComplete="new-password" />
            <div className='absolute cursor-pointer end-0 mt-2' >
              {showConfirmPassword ? (

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-2" onClick={handleShowConfirmPassword}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-2" onClick={handleShowConfirmPassword}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}

            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button type='submit' variant="gradient" color="blue">
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default EditUserModal;
