import { evaluateANswer } from "@/services/ai.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question, answer, level, position } = await req.json();
    if (!question || !answer) {
      NextResponse.json({ message: "Missing data" }, { status: 400 });
    }
    const result = await evaluateANswer(question, answer, level, position);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Evaluation failed ${error}` },
      { status: 500 },
    );
  }
}
