import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BookCard = ({ book }) => {
    const [bookAvailability, setBookAvailability] = useState(book.availability);
    const [userId, setUserId] = useState("");
    const router = useRouter();

    useEffect(() => {
        const foundUserId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : '';
        if (foundUserId) setUserId(foundUserId);
    }, []);
    const handleBorrowBook = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.put(`http://localhost:8080/api/books/borrowBook?id=${book._id}`, null, config);

            console.log('Book borrowed successfully:', response.data);
            setBookAvailability(false);
            router.refresh();
        } catch (error) {
            console.error('Error borrowing the book:', error);
        }

    };

    const handleReturnBook = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                // Redirect or handle unauthorized access
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.put(`http://localhost:8080/api/books/returnBook?id=${book._id}`, null, config);

            console.log('Book returned successfully:', response.data);
            setBookAvailability(true);
            router.push('/');
        } catch (error) {
            console.error('Error returning the book:', error);
        }
    };
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
                <img
                    className="rounded-t-lg"
                    src={"https://5.imimg.com/data5/SELLER/Default/2021/11/QQ/SI/XU/60672026/5.jpg"}
                    alt={book.bookName}
                />
            </a>
            <div className="p-5 flex flex-col">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                        {book.bookName}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                    {book.bookDesc}
                </p>
                {bookAvailability ? (<button onClick={handleBorrowBook} className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 focus:ring-blue-300 rounded-lg  focus:outline-none my-3`}>
                    Borrow
                </button>) : (<button onClick={handleReturnBook} className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white ${book.borrowerInfo === userId ? "text-white bg-red-700 focus:ring-blue-300" : "text-white bg-gray-400"} rounded-lg  focus:outline-none my-3`} disabled={!(book.borrowerInfo === userId)}>
                    {book.borrowerInfo === userId ? "Return" : "Borrowed"}
                </button>)}
            </div>
        </div>
    );
};

export default BookCard;