"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Question = {
  question: string;
  score: number;
  _id: string;
};

type Report = {
  overallRating: number;
  strengths: string[];
  weaknesses: string[];
  areasToImprove: string[];
};
type feedbackProps = {
  questions: Question[];
  report: Report;
  totalScore: number;
};

const Feedback = () => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState<feedbackProps[]>([]);
  const { interview } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!interview) return;
    const getFeedback = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`/api/interview/report/${interview}`);
        console.log("result", result);
        if (result.data && result.data.questions) {
          setFeedbackList([result.data]);
        } else if (Array.isArray(result.data)) {
          setFeedbackList(result.data);
        } else {
          setFeedbackList([]);
        }
      } catch (error) {
        setLoading(true);
        setFeedbackList([]);
      } finally {
        setLoading(false);
      }
    };
    getFeedback();
  }, [interview]);
  return (
    <div className="p-10">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      ) : feedbackList.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No interview feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
          <h2 className="font-bol text-2xl">Here is your interview feedback</h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview ratings: <strong>{}</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below inter question with correct answer, Your answer and
            feedback for improvement
          </h2>
          {/* {feedbackList &&
            feedbackList.map((feedback, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
                  {feedback.question}
                  <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 rounded-lg border">
                      <strong>Rating:</strong>
                      {feedback?.report?.overallRating}
                    </h2>
                    <h2 className=" p-2 rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Strengths:</strong>
                      {feedback?.report.strengths}
                    </h2>
                    <h2 className=" p-2 rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Areas to improve:</strong>
                      {feedback?.report.areasToImprove}
                    </h2>
                    <h2 className=" p-2 rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Weakness:</strong>
                      {feedback?.report.weakness}
                    </h2>
                    <h2 className=" p-2 rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Total Score:</strong>
                      {feedback?.totalScore}
                    </h2>
                  </div>
                </CollapsibleContent>
                
              </Collapsible>
            ))} */}
          {feedbackList.map((feedback, idx) => (
            <Collapsible key={idx} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
                View feedback for this interview
                <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                Iterate over each question
                {feedback.questions.map((q, qIdx) => (
                  <div key={q._id || qIdx} className="border p-3 my-2 rounded">
                    <p>
                      <strong>Q{qIdx + 1}:</strong> {q.question}
                    </p>
                    <p>
                      <strong>Your score:</strong> {q.score}
                    </p>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p>
                    <strong>Overall Rating:</strong>{" "}
                    {feedback.report?.overallRating}
                  </p>
                  <p>
                    <strong>Strengths:</strong>{" "}
                    {feedback.report?.strengths?.join(", ")}
                  </p>
                  <p>
                    <strong>Weaknesses:</strong>{" "}
                    {feedback.report?.weaknesses?.join(", ")}
                  </p>
                  <p>
                    <strong>Areas to improve:</strong>{" "}
                    {feedback.report?.areasToImprove?.join(", ")}
                  </p>
                  <p>
                    <strong>Total Score:</strong> {feedback.totalScore}
                  </p>
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
