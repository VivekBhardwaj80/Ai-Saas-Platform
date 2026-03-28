import Interview from "@/models/mockInterview.model";
import { finalReport } from "@/services/ai.service";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    if(!id){
      return NextResponse.json(
        { message: "Invalid interview I'D" },
        { status: 400 },
      );
    }
    const interview = await Interview.findById(id);
    if (!interview) {
      return NextResponse.json(
        { message: "Interview not found" },
        { status: 404 },
      );
    }
    const report = await finalReport(interview);
    return NextResponse.json(
      {
        report,
        totalScore: interview.totalScore,
        questions: interview.questions,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Report error ${error}` },
      { status: 500 },
    );
  }
}
