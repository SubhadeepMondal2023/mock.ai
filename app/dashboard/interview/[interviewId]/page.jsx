"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "../../../../@/components/components/ui/button";

function Interview({ params }) {
  const [resolvedParams, setResolvedParams] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  // Unwrapping params
  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params; // Await the promise
      setResolvedParams(unwrappedParams);
    }
    unwrapParams();
  }, [params]);

  // Fetch interview details once params are available
  useEffect(() => {
    if (!resolvedParams) return;

    async function getInterviewDetails() {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, resolvedParams.interviewId));

        console.log("Fetched Interview Details:", result);
        setInterviewDetails(result[0]);
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    }

    getInterviewDetails();
  }, [resolvedParams]);

  return (
    <div className='my-10'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <div className="flex flex-col my-5 gap-2">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
          <h2 className="text-lg"><strong>Job Role/Position: </strong>{interviewDetails?.jobPosition}</h2>
          <h2 className="text-lg"><strong>Job Description/Techstack: </strong>{interviewDetails?.jobDesc}</h2>
          <h2 className="text-lg"><strong>Years of experience: </strong>{interviewDetails?.jobExperience}</h2>
          </div>
          <div className='p-5 border rounded-lg border-yellow-600 bg-yellow-200'>
            <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb/><strong>Information</strong></h2>
            <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>

        <div>
          {webCamEnabled ? <Webcam onUserMedia={()=>setWebCamEnabled(true)} onUserMediaError={()=>{setWebCamEnabled(false)}} mirrored={true}
          style={{
            height: 300, 
            width: 300,
          }}
          /> :
          <>
            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
            <Button variant="ghost" className="w-full" onClick={()=>{setWebCamEnabled(true)}}>Enable webcam and microphone</Button>
          </>
          }
        </div>
      </div>
      <div className='flex justify-end items-end'>
        <Button>Start Interview</Button>
      </div>
    </div>
  );
}

export default Interview;
