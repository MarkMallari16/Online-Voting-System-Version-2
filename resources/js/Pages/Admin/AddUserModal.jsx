import React, { useEffect } from 'react'

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
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
const AddUserModal = ({ open, handleClose }) => {
    const { data, setData, post, processing, errors, reset } = useForm();

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = async (e) => {
        e.preventDefault();

        post(route("users.store"), data, {
            onSuccess: () => {
                handleClose();
                reset();
            },
            onError: (error) => {
                if (error.response.status === 422) {
                    // If validation errors are returned, update the errors state
                    setData('errors', error.response.data.errors);
                } else {
                    console.error('Error adding user:', error);
                }
            }
        });

        console.log('hello');
    };
    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Add User</DialogHeader>

            <form method='post' onSubmit={submit}>
                <DialogBody>
                    <div className="mb-3">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput type="text" label="Name" name="name" autoComplete='name' onChange={handleOnChange} className='w-full' />
                        {errors.name && <Text color="red">{errors.name}</Text>}
                    </div>
                    <div className="mb-3">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput type="email" label="Email" name="email" autoComplete='email' onChange={handleOnChange} className='w-full' />
                        {errors.email && <Text color="red">{errors.email}</Text>}
                    </div>
                    <div className="mb-3 ">
                        <InputLabel htmlFor="role" value="Role" />
                        <Select label="Select Role" name="role" onChange={(value) => setData('role', value)} value={data.role} >
                            <Option value='admin'>Admin</Option>
                            <Option value='moderator'>Moderator</Option>
                            <Option value='partylist_editor'>Partylist Editor</Option>
                            <Option value='voter'>Voter</Option>
                        </Select>
                        {errors.role && <Text color="red">{errors.role}</Text>}
                    </div>
                    <div className="mb-3">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput type='password' label="Password" name="password" onChange={handleOnChange} className='w-full' autoComplete="new-password" />
                        {errors.password && <Text color="red">{errors.password}</Text>}
                    </div>
                    <div className="mb-3">
                        <InputLabel htmlFor="confirm_password" value="Confirm Password" />
                        <TextInput type='password' label="Confirm Password" name="password_confirmation" onChange={handleOnChange} className='w-full' autoComplete="new-password" />
                        {errors.password_confirmation && <Text color="red">{errors.password_confirmation}</Text>}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={handleClose} variant="text" color="red" className="mr-1">
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

export default AddUserModal