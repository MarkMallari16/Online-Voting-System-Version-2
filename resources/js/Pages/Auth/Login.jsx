import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div>
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <div className='mb-5'>
                    <h1 className='text-3xl font-bold'>Welcome back!</h1>
                    <span className='font-light text-gray-600'>Enter your school email and password to access your account</span>
                </div>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your school email"
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter your password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>



                    <div className='flex justify-between mt-3'>
                        <div className="block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Remember me</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Forgot your password?
                                </Link>
                            )}


                        </div>
                    </div>

                    <div className='w-full flex justify-end mt-5'>
                        <PrimaryButton className="block " disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>  

                    <div>
                        <div className='text-gray-600 text-center mt-2'>
                                Don't have an Account? <Link href={route('register')} className='text-blue-500 font-medium focus:ring-blue-500' >Sign up</Link>
                        </div>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
