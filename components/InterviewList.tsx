import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewsList, setInterviewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getInterview = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/interview/total')
        if(res.data){
          setInterviewsList(res.data.interviews);
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
  }, [user]);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg lg:grid-cols-3">
        {interviewsList && interviewsList.map((interview,index)=>(
          <InterviewItemCard key={index} interview={interview} />
        ))}
      </div>
    </div>
  );
};

export default InterviewList;
