// components/Navbar.jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/slices/authslice";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // Optional: Redirect to login page after logout
    window.location.href = '/sign-in';
  };

  return (
    <nav className="bg-black shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.svg" 
            alt="PrepWise Logo" 
            width={40} 
            height={40}
          />
          <span className="ml-2 text-xl font-semibold">PrepWise</span>
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link href="/interviews" className="hover:text-blue-600">Interviews</Link>
          <Link href="/profile" className="hover:text-blue-600">Profile</Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;