"use client";

import AddNewInterview from "@/components/AddNewInterview";
import InterviewList from "@/components/InterviewList";

export default function DashboardClient() {
  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
      <h2 className="text-gray-500">Create and Start your AI Mockup</h2>

      <div className="grid gird-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      <InterviewList />
    </div>
  );
}