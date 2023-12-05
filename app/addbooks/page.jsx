"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddBooksPage = () => {
  const router = useRouter();
  const [bookName, setBookName] = useState('');
  const [bookDesc, setBookDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login'); // Redirect to login if token is not found
      return; // Stop further execution
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const response = await axios.post('http://localhost:8080/api/books/add', {
        bookName: bookName,
        bookDesc: bookDesc,
        availability: true
      }, config);

      console.log('Book added successfully!', response.data);
      router.push('/'); // Redirect to the home page after successful book addition
    } catch (error) {
      console.error('Error adding book:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Add Book</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="bookName" className="block text-gray-700 font-semibold mb-1">Book Name</label>
          <input
            type="text"
            id="bookName"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bookDesc" className="block text-gray-700 font-semibold mb-1">Book Description</label>
          <textarea
            id="bookDesc"
            value={bookDesc}
            onChange={(e) => setBookDesc(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBooksPage;
