import { Lightbulb } from "lucide-react";
import React from "react";
import { Question } from "@/types";

interface QuestionSectionProps {
  mockInterviewQuestion: Question[];
  activeQuestionIndex: number;
  setActiveQuestionIndex: (index: number) => void;
}

const QuestionSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
}: QuestionSectionProps) => {
    const currentQuestion = mockInterviewQuestion[activeQuestionIndex]?.question
  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((_, index) => (
              <h2
              key={index}
                className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex === index && "bg-primary! text-white"}`}
                onClick={()=>setActiveQuestionIndex(index)}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {currentQuestion}
        </h2>
        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
            <h2 className="flex gap-2 items-center text-primary">
                <Lightbulb />
                <strong>Note :</strong>
            </h2>
            <h2 className="text-sm text-primary my-2">Click on Record Answer when you want to answer the question. At the end of the interview we will give you feedback along with the correct answer for each of question and your answer to compare</h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
