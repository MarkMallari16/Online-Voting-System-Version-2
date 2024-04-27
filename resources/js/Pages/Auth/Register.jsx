import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import PasswordToggle from '@/Components/PasswordToggle';

export default function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePassword = () => {
        setShowPassword(!showPassword);
    }
    const handleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    console.log(errors);
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className='mb-5'>
                <h1 className='text-3xl font-bold'>Register</h1>

            </div>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        place
                        placeholder="John Doe"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder="doe.131415@bacoor.sti.edu.ph"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className='mt-4 relative'>

                    <div className="mb-12">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="absolute block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {data.password && (
                            <PasswordToggle showPassword={showPassword} handlePassword={handlePassword} />
                        )}

                    </div>

                    <InputError message={errors.password} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <div className="relative mb-14">
                        <TextInput
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="absolute block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        {data.password_confirmation && (
                            <PasswordToggle showPassword={showConfirmPassword} handlePassword={handleConfirmPassword} />
                        )}

                    </div>
                    <InputError message={errors.password_confirmation} className='mt-2' />

                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
                <div className='text-center mt-2'>
                    <div className='text-gray-600 '>
                        Already registered?  <Link
                            href={route('login')}
                            className=" font-medium text-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
