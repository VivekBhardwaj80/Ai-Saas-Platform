"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = () => {
  const router = useRouter();
  const params = useParams();
  const interviewId =
    typeof params?.interview === "string" ? params.interview : undefined;

  const [webCamEnable, setWebCamEnable] = useState<boolean>(false);
  const [interviewData, setInterviewData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!interviewId) {
      setLoading(true);
      return;
    }

    const getInterview = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/interview/${interviewId}`);
        if (res.data) {
          setLoading(false);
          setInterviewData(res.data.interview);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    if (interviewId) getInterview();
  }, [interviewId]);
  if (!interviewData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-10 ">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>
              {interviewData.position}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>
              {interviewData.description}
            </h2>
            <h2 className="text-lg">
              <strong>Number of Question:</strong>
              {interviewData.count}
            </h2>
            <h2 className="text-lg">
              <strong>Level of Interview:</strong>
              {interviewData.level}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb size="17px" />
              <strong>Information:</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Enable Video Web Cam and Microphone to Start your AI Generated
              Mock Interview, It has {interviewData.count} question which you
              can answer and the last you will get the report on the basis of
              the answer. Note: We never record your video, Web cam access you
              can disabled at any time if you want
            </h2>
          </div>
        </div>
        <div>
          {webCamEnable ? (
            <Webcam
              onUserMedia={() => setWebCamEnable(true)}
              onUserMediaError={() => setWebCamEnable(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                className="cursor-pointer w-full"
                variant="ghost"
                size="lg"
                onClick={() => setWebCamEnable(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end ">
        <Button
          className="cursor-pointer"
          onClick={() =>
            router.push(`/dashboard/interview/${interviewId}/start`)
          }
        >
          {loading ? "Starting..." : "Start Interview"}
        </Button>
      </div>
    </div>
  );
};

export default Interview;
