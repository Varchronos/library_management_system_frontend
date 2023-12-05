const BookCard = ({ book }) => {
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <a href="#">
          <img
            className="rounded-t-lg"
            src={"https://5.imimg.com/data5/SELLER/Default/2021/11/QQ/SI/XU/60672026/5.jpg"} // Assuming book.imageUrl contains the URL of the book's image
            alt={book.bookName} // Assuming book.title contains the title of the book
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              {book.bookName}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700">
            {book.bookDesc} {/* Assuming book.description contains the book's description */}
          </p>
          <button>
            {book.availability?"Yes":"NO"}
          </button>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    );
  };
  
  export default BookCard;