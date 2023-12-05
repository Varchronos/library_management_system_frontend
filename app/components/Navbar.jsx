import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const router = useRouter();
    const [user, setUser] = useState("");

    useEffect(() => {
        const foundUserName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : '';
        if (foundUserName) setUser(foundUserName);
        console.log(user)
    }, [])

    const handleLogout = () => {
        // Remove token and user from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to the login page
        router.push('/login');
    };


    return (
        <div className="flex items-center justify-between bg-gray-800 text-white p-4">
            <Link href={"/"} className="flex items-center">Home</Link>
            <Link href={"/profile"} className="flex items-center">
                Hello, {user}
            </Link>
            <div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
