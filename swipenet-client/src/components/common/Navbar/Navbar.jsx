import React from 'react'
// import './navbar.css';
import { Link } from 'react-router-dom';
import { User, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const homepage = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav className="flex justify-between items-center px-[50px] py-[20px] bg-[#1d2a4e] shadow-md shadow-white/5 sticky top-0 z-[1000]">
      <div onClick={homepage} className="flex items-center">
        <h2 className="text-[24px] font-bold text-blue-500">
          SwipeNet<span className="text-rose-500">.</span>
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {/* My Profile */}
        <Link
          to="/employer/profile"
          className="flex items-center gap-2 text-white hover:text-blue-400 transition"
        >
          <User size={18} />
          <span className="text-sm">My Profile</span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-rose-500 text-white px-3 py-2 rounded-md hover:bg-rose-600 transition"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>

      
    </nav>
  );
};

export default Navbar;
