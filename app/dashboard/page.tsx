"use client";
import AddNewInterview from "@/components/AddNewInterview";
import InterviewList from "@/components/InterviewList";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
// import axios from "axios";
import React from "react";

const Dashboard = async () => {
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       await axios.get("/api/user");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUser();
  // }, []);
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
      <h2 className="text-gray-500">Create and Start your AI Mockup</h2>
      <div className="grid gird-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
      {/* Previous Interview Lists  */}
      <InterviewList />
    </div>
  );
};

export default Dashboard;
