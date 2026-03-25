"use client";
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
  return <div></div>;
};

export default Dashboard;
