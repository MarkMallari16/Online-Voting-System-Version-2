import React, { useEffect, useState } from 'react';

import { useForm } from '@inertiajs/react';
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
import PasswordToggle from '@/Components/PasswordToggle';
import InputError from '@/Components/InputError';

const EditUserModal = ({ open, handleClose, user }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);

  }

  const { data, setData, put, reset, errors, processing } = useForm({
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
            <InputError className='mt-2' message={errors.email} />
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
              <Option value='voter'>Voter</Option>
            </Select>
            {errors.role && <Text color="red">{errors.role}</Text>}
          </div>
          <div className="mb-12 relative">
            <InputLabel htmlFor="password" value="Password" />
            <TextInput type={showPassword ? 'text' : 'password'} label="Password" name="password" onChange={handleOnChange} className='w-full absolute' autoComplete="new-password" />
            {data.password && (
              <PasswordToggle showPassword={showPassword} handlePassword={handleShowPassword} />
            )}
          </div>
          <div className="mb-8 relative">

            <InputLabel htmlFor="confirm_password" value="Confirm Password" />
            <TextInput type={showConfirmPassword ? 'text' : 'password'} label="Confirm Password" name="password_confirmation" onChange={handleOnChange} className='w-full absolute' autoComplete="new-password" />

            {data.password_confirmation && (
              <PasswordToggle showPassword={showConfirmPassword} handlePassword={handleShowConfirmPassword} />

            )}
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
          <Button type='submit' variant="gradient" color="blue" disabled={processing}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default EditUserModal;
