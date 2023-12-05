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
  const [books, setBooks] = useState({});

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

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books.BookList);

  const changeHandeler = (event) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const filtered = books?.BookList ? books.BookList.filter((book) => {
      return book.bookName.toLowerCase().includes(searchQuery.toLowerCase());
    }) : [];
    setFilteredBooks(filtered);
    console.log(filtered)
  }, [searchQuery, books]);

  console.log('Books:', filteredBooks);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <h1 className='mt-8 mb-10 self-center text-2xl font-semibold'>Welcome to the Home Page!</h1>
      <input
        type="text"
        id="searchBar"
        value={searchQuery}
        onChange={changeHandeler}
        className=" self-center w-1/3 px-3 py-2 mb-6 border rounded-md focus:outline-none focus:border-blue-500"
        placeholder='search books'
        required
      />
      {!books.BookList && <p>Loading...</p>}
      <div className=" mx-auto grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3">
        {
          filteredBooks && filteredBooks.length > 0?(
            filteredBooks.map((book, index) => (
              <div key={index}>
                <BookCard book={book} />
              </div>
            ))
          ) : (
            <p>No books found</p>
          )
        }
      </div>
    </div>
  );

}


// in case filtered books not working 
{/* {books?.BookList ? (
          books.BookList.map((book, index) => (
            <div key={index}>
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <p>No books available</p>
        )} */}