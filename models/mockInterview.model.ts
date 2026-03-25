import { Schema, model, models, Types, Model } from "mongoose";

type interviewLevel = "beginner" | "intermediate" | "advanced";

export interface IQuestion {
  question: string;
  expectedAnswer?: string;
  userAnswer?: string;
  score?: number;
  feedback?: string;
}
export interface IMockInterview {
  user: Types.ObjectId;
  clerkId: string;
  title: string;
  field: string;
  level: interviewLevel;
  questions: IQuestion[];
  totalScore: number;
  startedAt: Date;
  completedAt?: Date;
}

const questionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  expectedAnswer: { type: String },
  userAnswer: { type: String },
  score: { type: Number, default: 0 },
  feedback: { type: String },
});

const interviewSchema = new Schema<IMockInterview>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    clerkId: { type: String, required: true },
    title: { type: String, required: true },
    field: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    questions: [questionSchema],
    totalScore: {
      type: Number,
      default: 0,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);
const Interview:Model<IMockInterview> = models.Interview || model<IMockInterview>("Interview", interviewSchema);
export default Interview;
