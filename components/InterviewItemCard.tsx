import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type InterviewProps = {
  interview: any;
};

const InterviewItemCard = ({ interview }: InterviewProps) => {
  console.log("interview",interview)
  const router = useRouter();
  const start = () => {
    router.push(`/dashboard/interview/${interview?._id}`);
  };

  const handleFeedback = () => {
    router.push(`/dashboard/interview/${interview?._id}/feedback`);
  };

  const formattedDate = new Date(interview?.createdAt).toLocaleString()

  return (
    <div className="border shadow-sm rounded-lg p-4 ">
      <h2 className="font-bold text-primary">{interview?.position?.toUpperCase()}</h2>
      <h2 className="text-sm text-gray-600 capitalize ">{interview?.level?.toUpperCase()}</h2>
      <h2 className="text-xs text-gray-400">Created: {formattedDate}</h2>
      <div className="flex mt-5 gap-5 ">
        <Button
          size="default"
          variant="outline"
          className="cursor-pointer"
          onClick={handleFeedback}
        >
          Feedback
        </Button>
        <Button
          size="default"
          className="cursor-pointer"
          onClick={start}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
