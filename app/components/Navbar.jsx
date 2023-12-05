import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const username = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).username
    : '';

  const handleLogout = () => {
    // Remove token and user from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to the login page
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
      <div className="flex items-center">
        <span className="mr-4">Hello, {username}</span>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
