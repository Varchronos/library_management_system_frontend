"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

const SignUp = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/register/', {
                username: name,
                email: email,
                password: password,
                userType: isAdmin ? 'admin' : 'normal'
            });

            // Handle successful signup response, such as redirecting to a new page or displaying a success message
            console.log('Signup successful!', response.data);
            router.push('/login');
        } catch (error) {
            // Handle signup error, display error message to the user, etc.
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-gray-100 rounded-lg">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 mb-5">
                    Sign up to your account
                </h1>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium text-sm mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder='Your name'
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium text-sm mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder='something@email.com'
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium text-sm mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder='your secret password'
                        required
                    />
                </div>
                <div className="mb-4">
                    <div className="flex items-center justify-start gap-3">
                        <label htmlFor="isAdmin" className="block text-gray-700 font-small text-sm">
                            are you an <span className='text-green-800'>Admin?</span>
                        </label>
                        <input
                            type="checkbox"
                            id="isAdmin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            className="mr-2 h-4 w-4 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                    Sign Up
                </button>
                <div className='mt-5 text-sm tracking-wide text-gray-500'>
                    Already have an account?
                    <Link className='text-green-600 md:text-gray-500 md:hover:text-green-600  ' href={"/login"}> Log In</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp