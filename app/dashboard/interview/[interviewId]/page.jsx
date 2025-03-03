"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Lightbulb } from "lucide-react";
import { Button } from "../../../../@/components/components/ui/button";
import Link from "next/link";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

function Interview({ params }) {
  const [resolvedParams, setResolvedParams] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params;
      setResolvedParams(unwrappedParams);
    }
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    async function getInterviewDetails() {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, resolvedParams.interviewId));

        setInterviewDetails(result[0]);
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    }

    getInterviewDetails();
  }, [resolvedParams]);

  const handleEnableWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (stream) {
        setWebCamEnabled(true);
        setPermissionError(false);
      }
    } catch (error) {
      setPermissionError(true);
    }
  };

  return (
    <div className="my-10 flex flex-col items-center justify-center">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Job Details Section */}
        <div className="flex flex-col my-5 gap-2">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Position: </strong>
              {interviewDetails?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Techstack: </strong>
              {interviewDetails?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of experience: </strong>
              {interviewDetails?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-blue-600">
            <h2 className="flex gap-2 items-center text-blue-500 my-2">
              <Lightbulb />
              <strong>INFORMATION</strong>
            </h2>
            <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>

        {/* Webcam Section */}
        <div className="flex flex-col items-center justify-center my-5 bg-blue-600 rounded-lg p-5 relative">
          {!webCamEnabled ? (
            <>
              <Image src={'/webcam.svg'} width={200} height={200} alt="Webcam Placeholder" />
              <Button variant="outline" className="mt-5" onClick={handleEnableWebcam}>
                Enable webcam and microphone
              </Button>
              {permissionError && (
                <p className="mt-2 text-sm">Permission denied. Please allow access in browser settings.Then,click here again!</p>
              )}
            </>
          ) : (
            <Webcam
              mirrored={true}
              style={{
                height: 300,
                width: '100%',
                zIndex: 10,
              }}
            />
          )}
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="flex justify-end items-end w-full">
        <Link href={`/dashboard/interview/${resolvedParams?.interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
