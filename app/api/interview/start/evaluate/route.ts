import Interview from "@/models/mockInterview.model";
import { evaluateAnswer } from "@/services/ai.service";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectDB();
    const { questionIndex, answer, interviewId } = await req.json();
    if (!interviewId || questionIndex === undefined || !answer) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return NextResponse.json(
        { message: "Interview not found" },
        { status: 404 },
      );
    }
    const questionData = interview.questions[questionIndex];
    const result = await evaluateAnswer(
      questionData.question,
      answer,
      interview.level,
      interview.position,
    );
    ((questionData.userAnswer = answer), (questionData.score = result.score));
    questionData.feedback = result.feedback;
    questionData.expectedAnswer = result.correctAnswer;

    interview.totalScore = interview.questions.reduce(
      (acc, q) => acc + (q.score || 0),
      0,
    );
    await interview.save();

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Evaluation failed ${error}` },
      { status: 500 },
    );
  }
}
