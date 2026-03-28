import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter()
  const start = () =>{
    router.push(`/dashboard/interview/${interview.id}`)
  }

  const handleFeedback = ()=>{
    router.push(`/dashboard/interview/${interview.id}/feedback`)
  }
  return (
    <div className="border shadow-sm rounded-lg p-4">
      <h2 className="font-bold text-primary">{interview?.position}</h2>
      <h2 className="text-sm text-gray-600">{interview?.level}</h2>
      <h2 className="text-xs text-gray-400" >Created At:</h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button size='default' variant='outline' className="w-full"  onClick={start}>Feedback</Button>
        <Button size='default' variant='outline' className="w-full" onClick={handleFeedback}>Start</Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
