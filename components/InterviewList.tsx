"use client"
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewsList, setInterviewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = (id: string) => {
  setInterviewsList(prev =>
    prev.filter((item: any) => item._id !== id)
  );
};

  useEffect(() => {
    const getInterview = async () => {
      if(!user?.id) return
      setLoading(true);
      try {
        const res = await axios.get('/api/interview/total', {params:{userId:user?.id}})
        if(res.data){
          setInterviewsList(res.data.answers);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load interviews");
      }
      finally {
        setLoading(false);
      }
    };
    getInterview()
  }, [user?.id]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div>
      <h2 className="font-medium text-xl mb-5">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
        {interviewsList && interviewsList.map((interview,index)=>(
          <InterviewItemCard key={index} interview={interview} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default InterviewList;
