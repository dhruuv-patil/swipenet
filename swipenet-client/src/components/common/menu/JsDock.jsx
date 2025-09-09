import { FaTachometerAlt, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { BsBriefcase } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Briefcase, Search, MessageSquare, Users, LayoutDashboard } from 'lucide-react';


const JobseekerDock = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50  backdrop-blur-lg  rounded-2xl px-6 py-2 flex gap-6 shadow-lg">
      
      <button className="flex flex-col items-center hover:scale-110 transition duration-200">
        <LayoutDashboard size={24} />
        <span className="text-xs">Dashboard</span>
      </button>

      
      <button className="flex flex-col items-center text-white hover:scale-110 transition duration-300">
        <BsBriefcase size={24} />
        <span className="text-xs ">Swipe</span>
      </button>

      
      <button className="flex flex-col items-center hover:scale-110 transition duration-200">
        <MessageSquare size={24} />
        <span className="text-xs">Messages</span>
      </button>

      
      <button className="flex flex-col items-center hover:scale-110 transition duration-200">
        <Users size={24} />
        <span className="text-xs">Matches</span>
      </button>

      
      
    </div>
  );
};

export default JobseekerDock;
