import Interview from "@/models/mockInterview.model";
import connectDB from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    await connectDB();
    const user = await currentUser();
  
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { title, field, level } = await req.json();
    if (!title || !field || !level) {
      return NextResponse.json(
        { message: "all filed are required" },
        { status: 400 },
      );
    }
    const questions = [{ question: "What is react" }];
    if (!questions) {
      return NextResponse.json(
        { message: "Question Generation problem" },
        { status: 503 },
      );
    }
    const interview = await Interview.create({
      user: user.id,
      clerkId: user.id,
      title,
      field,
      level,
      questions,
    });
    return NextResponse.json(
        { interview},
        { status: 200 },
      );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
        { message: `Question Generation Error: ${error}` },
        { status: 500 },
      );
  }
}
