import React, { useEffect, useState } from 'react'

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
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PasswordToggle from '@/Components/PasswordToggle';


const AddUserModal = ({ open, handleClose }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);

    }
    console.log(errors);
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
        post(route('users.store'));

        handleClose();
    };

    console.log(handleClose);
    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Add User</DialogHeader>

            <form onSubmit={submit}>
                <DialogBody>
                    <div className="mb-3">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput type="text" label="Name" name="name" value={data.name} autoComplete='name' onChange={handleOnChange} className='w-full' placeholder="John Doe" required />

                    </div>
                    <div className="mb-3">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput type="email" label="Email" name="email" value={data.email} autoComplete='email' onChange={handleOnChange} className='w-full' placeholder="doe.121314@bacoor.sti.edu.ph" required />

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
                    <div className="mb-12 relative">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput type={showPassword ? 'text' : 'password'} label="Password" name="password" onChange={handleOnChange} className='w-full absolute' autoComplete="new-password" />
                        <PasswordToggle showPassword={showPassword} handlePassword={handleShowPassword} />

                    </div>
                    <div className="mb-8 relative">
                        <InputLabel htmlFor="confirm_password" value="Confirm Password" />
                        <TextInput type={showConfirmPassword ? 'text' : 'password'} label="Confirm Password" name="password_confirmation" onChange={handleOnChange} className='w-full absolute' autoComplete="new-password" />
                        <PasswordToggle showPassword={showConfirmPassword} handlePassword={handleShowConfirmPassword} />
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