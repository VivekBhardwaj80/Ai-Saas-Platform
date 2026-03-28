"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { Mic, StopCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Question } from "@/types";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface RecordAnswerSectionProps {
  mockInterviewQuestion: Question[];
  activeQuestionIndex: number;
  level: string;
  position: string;
  interviewId: string;
}

const RecordAnswerSection = ({
  activeQuestionIndex,
  interviewId,
}: RecordAnswerSectionProps) => {
  const [microphoneAllowed, setMicrophoneAllowed] = useState<boolean | null>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();


  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      toast.error("Browser does not support speech recognition");
    }
  }, [browserSupportsSpeechRecognition]);


  useEffect(() => {
    const requestMicrophone = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneAllowed(true);
      } catch {
        setMicrophoneAllowed(false);
        toast.error("Microphone access is required!");
      }
    };
    requestMicrophone();
  }, []);

  useEffect(() => {
    resetTranscript();
  }, [activeQuestionIndex]);

  const startStopRecording = async () => {
    if (!microphoneAllowed) {
      toast.error("Microphone not allowed");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();

      const answer = transcript.trim();

      if (answer.length < 10) {
        toast.error("Answer too short!");
        return;
      }

      try {
        await axios.post("/api/interview/start/evaluate", {
          questionIndex: activeQuestionIndex,
          answer,
          interviewId,
        });

        toast.success("Answer evaluated ✅");
        resetTranscript();
      } catch (error) {
        console.error(error);
        toast.error("Evaluation failed");
      }

    } else {
      resetTranscript();

      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    }
  };

  if (microphoneAllowed === null) {
    return <p>Checking microphone...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Webcam */}
      <div className="flex flex-col items-center rounded-lg p-5 bg-black mt-10">
        <Image
          src="/webCamImage.png"
          alt="Web Cam"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>

      <Button
        variant="outline"
        className="my-10 cursor-pointer"
        onClick={startStopRecording}
      >
        {listening ? (
          <span className="flex items-center gap-2 text-red-500">
            <StopCircle /> Stop Recording
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Mic /> Record Answer
          </span>
        )}
      </Button>

      <div className="p-3 border rounded w-full max-w-md">
        <p className="text-sm text-gray-500">Your Answer:</p>
        <p>{transcript || "Start speaking..."}</p>
      </div>
    </div>
  );
};

export default RecordAnswerSection;