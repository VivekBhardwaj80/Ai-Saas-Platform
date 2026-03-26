import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

type Question = {
  question: string;
  answer: string;
  level: string;
};

type Evaluation = {
  score: number;
  feedback: string;
};

type Report = {
  overallRating: number;
  strengths: string[];
  weaknesses: string[];
  areasToImprove: string[];
};

export const generate = async (param: {
  count: number;
  level: "junior" | "mid" | "advance";
  position: string;
  description: string;
}): Promise<Question[]> => {
  const { count, level, position, description } = param;
  const prompt = ` Generate ${count || 10} ${level}-level interview questions for the following job:
  Position: ${position}
Description: ${description}

Return ONLY valid JSON:
[
  {
    "question": "string",
    "answer": "string",
    "level": "${level}"
  }
] `;
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  try {
    const cleaned = result.text
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleaned || "[]");
  } catch (error) {
    throw new Error(`Failed to parse Gemini response ${error}`);
  }
};

export const evaluateANswer = async (
  question: string,
  answer: string,
  level: "junior" | "mid" | "advance",
  position: string,
): Promise<Evaluation> => {
  const prompt = `
You are a ${level}-level interviewer for the role ${position}.

Question: ${question}
Candidate answer: ${answer}

Return ONLY JSON:
{
  "score": number,
  "feedback": "string"
}
`;
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  try {
    const cleaned = result.text
      ?.replace(/```json/g, "")
      ?.replace(/```/g, "")
      ?.trim();
    return JSON.parse(cleaned || "{}");
  } catch (error) {
    return { score: 0, feedback: `Error parsing AI response ${error}` };
  }
};

export const finalReport = async (interview: any): Promise<Report> => {
  const prompt = `
Analyze this interview data:

${JSON.stringify(interview.questions, null, 2)}

Return ONLY JSON:
{
  "overallRating": number,
  "strengths": ["string"],
  "weaknesses": ["string"],
  "areasToImprove": ["string"]
}
`;
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  try {
    const cleaned = result.text
      ?.replace(/```json/g, "")
      ?.replace(/```/g, "")
      ?.trim();
    return JSON.parse(cleaned || "{}");
  } catch {
    return {
      overallRating: 0,
      strengths: [],
      weaknesses: [],
      areasToImprove: [],
    };
  }
};
