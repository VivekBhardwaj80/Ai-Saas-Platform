import Header from "@/components/Header";
import React from "react";

const QuestionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="mx-3 md:mx-12 lg:mx-24">{children}</div>
    </div>
  );
};

export default QuestionLayout;
