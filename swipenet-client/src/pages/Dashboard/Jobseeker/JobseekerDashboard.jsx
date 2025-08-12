import React from "react";
import { Link } from "react-router-dom";
import "./dashboardhome.css"; 
import Navbar from "../../../components/common/Navbar/Navbar";
import JobseekerDock from "../../../components/common/menu/JsDock";

const  JobseekerDashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
    const name = storedUser?.name || "Jobseeker";
  
  return (
   <> 
   
      <Navbar/>

      {/* Main Content */}
      <main className="main-content">
        <h1>👋 Hello {name}!</h1>
        <p>Ready to grow your network today?</p>

        <div className="badges">
          <div className="badge">Student</div>
          <div className="badge">Frontend Developer</div>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="card-icon">💼</div>
            <div className="card-number">5</div>
            <div className="card-text">New Job Posts</div>
          </div>
          <div className="dashboard-card">
            <div className="card-icon">❤️</div>
            <div className="card-number">3</div>
            <div className="card-text">New Matches</div>
          </div>
          <div className="dashboard-card">
            <div className="card-icon">🔍</div>
            <div className="card-number">10</div>
            <div className="card-text">Profiles Found</div>
          </div>
        </div>
      </main>


    <JobseekerDock/>
    </>
  );
}
export default JobseekerDashboard;
