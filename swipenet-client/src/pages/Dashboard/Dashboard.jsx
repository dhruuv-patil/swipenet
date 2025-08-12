import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/HomeNavbar/HomeNavbar";
import JobseekerDock from "../../components/common/menu/JsDock";
// import "./dashboard.css"; // Optional: for custom styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      
      <div className="dashboard-main">
        <Navbar />
        <div className="dashboard-content">
          <Outlet />
        </div>
        <JobseekerDock />
      </div>
    </div>
  );
};

export default Dashboard;
