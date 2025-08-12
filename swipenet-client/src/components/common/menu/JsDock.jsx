import { FaTachometerAlt, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { BsBriefcase } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const JobseekerDock = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50  backdrop-blur-lg  rounded-2xl px-6 py-2 flex gap-6 shadow-lg">
      
      <button className="flex flex-col items-center text-white hover:scale-110 transition duration-300">
        <FaTachometerAlt size={24} />
        <span className="text-xs mt-1">Dashboard</span>
      </button>

      
      <button className="flex flex-col items-center text-white hover:scale-110 transition duration-300">
        <BsBriefcase size={24} />
        <span className="text-xs mt-1">Swipe</span>
      </button>

      
      <button className="flex flex-col items-center text-white hover:scale-110 transition duration-300">
        <IoMdChatbubbles size={24} />
        <span className="text-xs mt-1">Message</span>
      </button>

      
      <button className="flex flex-col items-center text-white hover:scale-110 transition duration-300">
        <FaHeart size={24} />
        <span className="text-xs mt-1">Matches</span>
      </button>

      
      
    </div>
  );
};

export default JobseekerDock;
