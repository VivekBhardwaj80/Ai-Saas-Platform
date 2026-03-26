import Interview from "@/models/mockInterview.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
      const {id} = await params
      await connectDB();
    const interview = await Interview.findById(id);
    if (!interview) {
      return NextResponse.json(
        { message: "Don't have Data on that I'D" },
        { status: 400 },
      );
    }
    return NextResponse.json({ interview }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Get Interview by I'D error ${error}` },
      { status: 500 },
    );
  }
}
