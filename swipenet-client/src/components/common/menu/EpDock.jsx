import { Briefcase, Search, MessageSquare, Users, LayoutDashboard } from 'lucide-react';

const EmployerDock = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2  shadow-xl rounded-full px-4 py-2 flex gap-6 items-center backdrop-blur-l border-gray-100 z-50">
      <button className="flex flex-col items-center hover:scale-110 transition duration-200">
        <LayoutDashboard size={24} />
        <span className="text-xs">Dashboard</span>
      </button>
      <button className="flex flex-col items-center hover:scale-110 transition duration-200">
        <Briefcase size={24} />
        <span className="text-xs">Post Job</span>
      </button>
      <button className="flex flex-col items-center hover:scale-110 transition duration-200">
        <Search size={24} />
        <span className="text-xs">Find Talent</span>
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

export default EmployerDock;
