"use client";
import QuestionSection from "@/components/QuestionSection";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Question } from "@/types";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const RecordAnswerSection = dynamic(
  () => import("@/components/RecordAnswerSection"),
  { ssr: false },
);

const StartInterview = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [interviewData, setInterviewData] = useState<any>(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<
    Question[] | null
  >(null);
  const router = useRouter();
  const param = useParams();
  const interviewId = param?.interview as string;
  useEffect(() => {
    if (!interviewId) {
      setLoading(true);
      return;
    }
    const getInterview = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/interview/${interviewId}`);
        if (res.data) {
          setLoading(false);
          setMockInterviewQuestion(res.data.interview.questions);
          setInterviewData(res.data?.interview);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getInterview();
  }, [interviewId]);
  if (loading || !mockInterviewQuestion) {
    return <div>Loading...</div>;
  }
  console.log("mockInterviewQuestion", mockInterviewQuestion);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          level={interviewData?.level}
          position={interviewData?.position}
          interviewId={interviewId}
        />
      </div>
      <div className="flex justify-end gap-5">
        {activeQuestionIndex > 0 && (
          <Button
            size="lg"
            className="cursor-pointer hover:bg-[rgba(17,20,174,0.8)] hover:transition-all duration-300"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + -1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion.length - 1 && (
          <Button
            size="lg"
            className="cursor-pointer hover:bg-[rgba(17,20,174,0.8)] hover:transition-all duration-300"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        <Button
          size="lg"
          className="cursor-pointer hover:bg-[rgba(3,5,88,0.8)] hover:font-bold hover:transition-all duration-300"
          onClick={() =>
            router.push(`/dashboard/interview/${interviewId}/feedback`)
          }
        >
          Submit Interview
        </Button>
      </div>
    </div>
  );
};

export default StartInterview;
