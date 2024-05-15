import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import PasswordToggle from '@/Components/PasswordToggle';
import { Button } from '@material-tailwind/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

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

        <div className=' grid grid-cols-1 lg:grid-cols-5 h-screen'>
            <div className='col-span-2 w-full flex justify-center items-center '>
                <div className='lg:flex-1 lg:mx-16 mx-8 w-full  ring-1 ring-gray-300 p-5  lg:ring-0 rounded-lg  lg:rounded-none lg:p-0'>
                    <div className='flex justify-center items-center lg:hidden mb-2'>
                        <ApplicationLogo className='block lg:hidden' />
                    </div>
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
                        <div className={`mt-4 relative ${errors.password ? 'mb-4' : 'mb-14'}`}>


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

                                />
                                {data.password && (
                                    <PasswordToggle showPassword={showPassword} handlePassword={handlePassword} />
                                )}

                            </div>

                            <InputError message={errors.password} className='mt-2' />
                        </div>

                        <div className='mt-4 relative'>
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

                                />
                                {data.password_confirmation && (
                                    <PasswordToggle showPassword={showConfirmPassword} handlePassword={handleConfirmPassword} />
                                )}

                            </div>
                            <InputError message={errors.password_confirmation} className='mt-2' />

                        </div>
                        <div className="mt-12">
                            <Button type='submit' color='blue' variant='gradient' className="w-full mt-3 py-4" disabled={processing}>
                                Register
                            </Button>
                        </div>
                        <div className='text-center mt-2'>
                            <div className='text-gray-700 '>
                                Already registered?  <Link
                                    href={route('login')}
                                    className=" font-medium text-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            <div className=' lg:bg-[url("/sti-images/BeSTICoverWithBacoor.png")] md:bg-left md:bg-no-repeatmd: bg-cover md:block md:m-4 md:col-span-3  rounded-l-3xl  rounded-r-lg'>


            </div>

        </div>



    );
}
