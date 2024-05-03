import React, { useEffect, useState } from 'react'
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
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PasswordToggle from '@/Components/PasswordToggle';
import { useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';

const AddUserModal = ({ open, handleClose }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: null,
        email: null,
        password: null,
        role: null,
        password_confirmation: null,
    });
    console.log(errors);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);

    }

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

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
        post(route('users.store'), {
            onSuccess: () => {
                handleClose();
                reset();
            },
            onError: () => {

            }
        });


    };

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);


    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Add User</DialogHeader>

            <form onSubmit={submit}>
                <DialogBody>
                    <div className="mb-3">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput type="text" label="Name" name="name" value={data.name} autoComplete='name' onChange={handleOnChange} className='w-full' placeholder="John Doe" />
                        <InputError className='mt-2' message={errors.name} />
                    </div>
                    <div className="mb-3">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput type="email" label="Email" name="email" value={data.email} autoComplete='email' onChange={handleOnChange} className='w-full' placeholder="doe.121314@bacoor.sti.edu.ph" />
                        <InputError className='mt-2' message={errors.email} />
                    </div>
                    <div className="mb-3 ">
                        <InputLabel htmlFor="role" value="Role" />
                        <Select label="Select Role" name="role" onChange={(value) => setData('role', value)} value={data.role} >
                            <Option value='admin'>Admin</Option>
                            <Option value='moderator'>Moderator</Option>
                            <Option value='partylist_editor'>Partylist Editor</Option>
                            <Option value='voter'>Voter</Option>
                        </Select>
                        <InputError className='mt-2' message={errors.role} />
                    </div>
                    <div className="mb-12 relative">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput type={showPassword ? 'text' : 'password'} label="Password" name="password" onChange={handleOnChange} className='w-full absolute' autoComplete="new-password" />
                        {data.password && (
                            <PasswordToggle showPassword={showPassword} handlePassword={handleShowPassword} />
                        )}

                    </div>
                    <InputError className='mt-2 mb-2' message={errors.password} />
                    <div className="mb-8 relative">
                        <InputLabel htmlFor="confirm_password" value="Confirm Password" />
                        <TextInput type={showConfirmPassword ? 'text' : 'password'} label="Confirm Password" name="password_confirmation" onChange={handleOnChange} className='w-full absolute' autoComplete="new-password" />
                        {
                            data.password_confirmation && (
                                <PasswordToggle showPassword={showConfirmPassword} handlePassword={handleShowConfirmPassword} />
                            )
                        }

                    </div>

                </DialogBody>
                <DialogFooter>
                    <Button onClick={handleClose} variant="text" color="red" className="mr-1">
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

export default AddUserModal