export interface Question {
  question: string;
  expectedAnswer?: string;
  userAnswer?: string;
  score?: number;
  feedback?: string;
}