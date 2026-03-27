"use client";
import QuestionSection from "@/components/QuestionSection";
import RecordAnswerSection from "@/components/RecordAnswerSection";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Question } from "@/types";

const StartInterview = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<
    Question[] | null
  >(null);

  const param = useParams();
  const {interview} = param
  useEffect(() => {
    if (!interview) {
      setLoading(true);
      return;
    }
    const getInterview = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/interview/${interview}`);
        if (res.data) {
          setLoading(false);
          setMockInterviewQuestion(res.data.interview.questions);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    getInterview();
  }, [interview]);
  if (loading || !mockInterviewQuestion) {
    return <div>Loading...</div>;
  }
  console.log("mockInterviewQuestion",mockInterviewQuestion)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <QuestionSection
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        setActiveQuestionIndex={setActiveQuestionIndex}
      />
      <RecordAnswerSection />
    </div>
  );
};

export default StartInterview;
