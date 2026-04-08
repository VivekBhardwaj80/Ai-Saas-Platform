import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ArchiveX } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

type InterviewProps = {
  interview: any;
  onDelete: (id: string) => void;
};


const InterviewItemCard = ({ interview,onDelete }: InterviewProps) => {
  const router = useRouter();
  const start = () => {
    router.push(`/dashboard/interview/${interview?._id}`);
  };

  const handleFeedback = () => {
    router.push(`/dashboard/interview/${interview?._id}/feedback`);
  };

  const deleteInterview = async (id:string)=>{
    try {
      const res = await axios.delete(`/api/interview/${id}`)
      if(res.data){
        toast.success(res.data?.message)
        onDelete(id)
      }
      else{
        toast.error(res.data?.message)
      }
    } catch (error:any) {
      toast.error(error)
    }
  }

  const formattedDate = new Date(interview?.createdAt).toLocaleString();

  return (
    <div className="border shadow-sm rounded-lg p-4 ">
      <h2 className="font-bold text-primary">
        {interview?.position?.toUpperCase()}
      </h2>
      <h2 className="text-sm text-gray-600 capitalize ">
        {interview?.level?.toUpperCase()}
      </h2>
      <h2 className="text-xs text-gray-400">Created: {formattedDate}</h2>
      <div className="flex mt-5 gap-5 items-center justify-between">
        <div className="flex gap-5">
          <Button
            size="default"
            variant="outline"
            className="cursor-pointer"
            onClick={handleFeedback}
          >
            Feedback
          </Button>
          <Button size="default" className="cursor-pointer" onClick={start}>
            Start
          </Button>
        </div>
        <div className="cursor-pointer">
          <ArchiveX onClick={()=>deleteInterview(interview?._id)}/>
        </div>
      </div>
    </div>
  );
};

export default InterviewItemCard;
