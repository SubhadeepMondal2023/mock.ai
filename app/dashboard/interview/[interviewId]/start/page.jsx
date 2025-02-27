"use client";
import React, { useState, useEffect } from 'react'
import { MockInterview } from '../../../../../utils/schema';
import { db } from '../../../../../utils/db';
import { eq } from 'drizzle-orm';
import QuestionsSection from "../start/_components/QuestionsSection";
import RecordAnswerSection from "../start/_components/RecordAnswerSection";

function StartInterview({params}) {
  const [resolvedParams, setResolvedParams] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  
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
          .where(eq(MockInterview?.mockId, resolvedParams?.interviewId));
        
        const jsonMockResponse = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResponse);
        console.log(jsonMockResponse);

        setInterviewDetails(result[0]);

      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    }

    getInterviewDetails();
  }, [resolvedParams]);

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2'> 
        {/* Questions */}
        <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} 
        activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/Audio Rec */}
        <RecordAnswerSection/>
      </div>
    </div>
  )
}

export default StartInterview