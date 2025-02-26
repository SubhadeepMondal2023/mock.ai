"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";

function Interview({ params }) {
  const [resolvedParams, setResolvedParams] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState();

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
    <div className='my-6'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
    </div>
  );
}

export default Interview;
