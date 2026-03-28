"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Feedback = () => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const params = useParams();
  const interviewId = params?.id as string;
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!interviewId) return;
    const getFeedback = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`/api/interview/report/${interviewId}`);
        if (result) {
          setFeedbackList(result.data);
          console.log("result.data", result.data);
        }
      } catch (error) {
        console.log(error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    getFeedback();
  }, [interviewId]);
  return (
    <div className="p-10">
      {loading && (
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      )}

      {feedbackList?.length === 0 ? (
        <h2>
          <h2 className="font-bold text-xl text-gray-500">
            No interview feedback Record Found
          </h2>
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
          <h2 className="font-bol text-2xl">Here is your interview feedback</h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview ratings: <strong>7/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below inter question with correct answer, Your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((feedback, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
                  {/* {feedback?.question}  */}
                  <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 rounded-lg border">
                      <strong>Rating:</strong>
                      {/* {feedback?.rating} */}
                    </h2>
                    <h2 className=" p-2 rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer:</strong>
                      {/* {feedback?.userAnswer} */}
                    </h2>
                    <h2 className=" p-2 rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer:</strong>
                      {/* {feedback?.correctAnswer} */}
                    </h2>
                    <h2 className=" p-2 rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback:</strong>
                      {/* {feedback?.feedback} */}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
};

export default Feedback;
