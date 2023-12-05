"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';

const Profile = () => {
    const [profile, setProfile] = useState("");
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const router = useRouter();

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
        axios.get('http://localhost:8080/api/user', config)
            .then(response => {
                setProfile(response.data.currentUser);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                router.push('/login');
            });

        axios.get('http://localhost:8080/api/books/showBorrowed', config)
            .then(response => {
                setBorrowedBooks(response.data.borrowedBooks);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                router.push('/login');
            });

    }, []);

    console.log(borrowedBooks);

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <h1 className='self-center text-2xl my-6 '>Borrowed Books</h1>
            <div className=" mx-auto grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3">
                {
                    borrowedBooks && borrowedBooks.length > 0 ? (
                        borrowedBooks.map((book, index) => (
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
};

export default Profile;
