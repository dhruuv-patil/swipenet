import React, { useEffect, useState } from "react";
import SwipeCard from "@/components/common/JsSwipeCard";
import axios from "axios";
import { Nav } from "react-day-picker";
import Navbar from "@/components/common/Navbar/Navbar";
import JobseekerDock from "@/components/common/menu/JsDock";
import API from "@/api";


const JsSwipe = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/api/jobseeker-profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  

  

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-blue-1500">
      <SwipeCard profile={profile} />
    </div>
    <JobseekerDock />
    </>
  );
};

export default JsSwipe;
