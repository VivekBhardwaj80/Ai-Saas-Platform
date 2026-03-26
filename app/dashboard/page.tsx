"use client";
import AddNewInterview from "@/components/AddNewInterview";
import axios from "axios";
import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get("/api/user");
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">Create and Start your AI Mockup</h2>
      <div className="grid gird-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
    </div>
  );
};

export default Dashboard;
