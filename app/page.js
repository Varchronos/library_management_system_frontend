"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BookCard from './components/BookCard';
import Navbar from './components/Navbar';

const bookData = {
  imageUrl: '/docs/images/blog/image-1.jpg',
  title: 'Noteworthy technology acquisitions 2021',
  description:
    'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
};

export default function Home() {
  const router = useRouter();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Check if the token exists in local storage
    if (!token) {
      router.push('/login'); // Redirect to login if token is not found
      return; // Stop further execution
    }

    // Set the Authorization header with the JWT token for authentication
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // Fetch books data using the API endpoint
    axios.get('http://localhost:8080/api/books/getAll', config)
      .then(response => {
        // Set the retrieved books data to the state
        setBooks(response.data);
      })
      .catch(error => {
        // Handle errors, such as unauthorized access, expired token, etc.
        console.error('Error fetching books:', error);
        // Optionally, redirect to login page or show an error message
        router.push('/login');
      });
  }, []);

  const firstBook = books?.BookList && books.BookList.length > 0 ? books.BookList[0] : null;

  console.log('Books:', books);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <h1>Welcome to the Home Page!</h1>
      {!firstBook && <p>Loading...</p>}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books?.BookList ? (
          books.BookList.map((book, index) => (
            <div key={index}>
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );

}
