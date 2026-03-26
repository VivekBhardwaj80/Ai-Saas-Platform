import Interview from "@/models/mockInterview.model";
import User from "@/models/user.model";
import connectDB from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await currentUser();
  
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const mongoUser = await User.findOne({clerkId:user.id})
    const formData: FormData = await req.formData();
    const position = formData.get('Position') as string
    const description = formData.get('Desc') as string
    const experience = formData.get('Experience') as string
    if (!position || !description || !experience) {
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
      user: mongoUser.id,
      clerkId: user.id,
      position,
      description,
      experience,
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
