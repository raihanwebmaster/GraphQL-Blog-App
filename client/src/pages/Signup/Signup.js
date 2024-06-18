import React, { useEffect, useState } from 'react';
import './Signup.css'
import { gql, useMutation } from '@apollo/client';
import { EyeIcon, EyeSlashIcon, BanknotesIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SIGNUP = gql`
    mutation Reg($name: String!, $email: String!, $password: String!, $bio: String) {
        signup(name: $name, email: $email, password: $password, bio: $bio) {
        userError
        token
        }
    }
`

const Signup = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [signup, { data, loading, error }] = useMutation(SIGNUP);

    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;

    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            bio: e.target.bio.value
        }

        signup({
            variables: data
        })
    }

    const [userError, setUserError] = useState(null);

    useEffect(() => {
        if (data && data.signup.token) {
            localStorage.setItem("token", data.signup.token)
            navigate('/posts')
        }
        if (data && data.signup.userError) {
            setUserError(data.signup.userError)
        }
    }, [data]);

    const handleLogin = (event) => {
        event.preventDefault();
        navigate('/login');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    useEffect(() => {
        if (userError) {
            toast.error('Something went wrong !!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [userError]);

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a onClick={() =>navigate('/')} class="cursor-pointer flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <BanknotesIcon className="w-8 h-8 mr-2" />
                    GraphQL
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form class="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                <input type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your name" required="" />
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <div class="relative">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label for="bio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your bio</label>
                                <textarea type="bio" name="bio" id="bio" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="A bit about yourself" rows="4" required="" />
                            </div>
                            {/* <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-#">
                                        <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div> */}
                            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Do have an account ? <a onClick={handleLogin} class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;