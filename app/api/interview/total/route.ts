import Interview from "@/models/mockInterview.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const {searchParams} = new URL(req.url)
    const userId = searchParams.get("userId")
    if (!userId) {
      return NextResponse.json({ message: "User I'D required" }, { status: 400 });
    }
    const interviews = await Interview.find({ clerkId: userId });
    if (!interviews || interviews.length === 0) {
      return NextResponse.json(
        { message: "No interview found" },
        { status: 200 },
      );
    }
    return NextResponse.json({ answers:interviews }, { status: 200 });
  } catch (error) {
    console.log("error",error);
    return NextResponse.json({ message: `Get total user error ${error}` });
  }
}
