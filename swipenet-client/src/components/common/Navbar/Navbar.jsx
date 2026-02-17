import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const homepage = () => {
    navigate("/");
  };

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const role = storedUser?.userType; // 👈 read role from user object
  const profilePath =
    role === "employer" ? "/profile/employer" : "/profile/jobseeker";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-[50px] py-[20px] bg-[#1d2a4e] shadow-md shadow-white/5 sticky top-0 z-[1000]">
      {/* Logo */}
      <div onClick={homepage} className="flex items-center cursor-pointer">
        <h2 className="text-[24px] font-bold text-blue-500">
          SwipeNet<span className="text-rose-500">.</span>
        </h2>
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-full hover:bg-white/20 transition text-white"
        >
          <img
            src="https://ui-avatars.com/api/?name=User"
            alt="avatar"
            className="w-8 h-8 rounded-full border border-white"
          />
          <ChevronDown className="w-4 h-4" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] shadow-lg rounded-lg overflow-hidden">
            <Link
              to={profilePath}
              className="flex items-center gap-2 px-4 py-2 text-#1e293b-700 hover:bg-gray-10"
              onClick={() => setOpen(false)}
            >
              <User className="w-4 h-4" />
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
