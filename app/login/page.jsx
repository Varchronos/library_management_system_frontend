"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email: email,
        password: password
      });

      // If login is successful, redirect to dashboard or home page
      console.log('Login successful!', response.data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/'); // Redirect to the dashboard or home page after successful login
    } catch (error) {
      // Handle login error, display error message to the user, etc.
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-gray-100 rounded-lg flex flex-col ">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 mb-5">
          Log in to your account
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium text-sm mb-1">Your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder='hello@gmail.com'
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
            placeholder='your secret passowrd'
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white mt-2 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <div className='mt-5 text-sm tracking-wide text-gray-500'>
          Don't have an account? 
        <Link className='hover:text-blue-600' href={"/signup"}> Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
