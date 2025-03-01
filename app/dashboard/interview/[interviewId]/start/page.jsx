"use client";
import React, { useState, useEffect } from "react";
import { MockInterview } from "../../../../../utils/schema";
import { db } from "../../../../../utils/db";
import { eq } from "drizzle-orm";
import QuestionsSection from "../start/_components/QuestionsSection";
import RecordAnswerSection from "../start/_components/RecordAnswerSection";

function StartInterview({ params }) {
  const [interviewId, setInterviewId] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // ✅ Unwrap params inside useEffect
  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params; // Await the promise
      setInterviewId(unwrappedParams?.interviewId || null);
    }
    unwrapParams();
  }, [params]);

  // ✅ Fetch interview details once interviewId is available
  useEffect(() => {
    if (!interviewId) return;

    async function getInterviewDetails() {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, interviewId));

        if (result.length > 0) {
          const jsonMockResponse = JSON.parse(result[0].jsonMockResp);
          setMockInterviewQuestion(jsonMockResponse);
          setInterviewDetails(result[0]);
        } else {
          console.error("No interview found for given ID.");
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    }

    getInterviewDetails();
  }, [interviewId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />

        {/* Video/Audio Rec */}
        <RecordAnswerSection 
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewDetails={interviewDetails}
        />
      </div>
    </div>
  );
}

export default StartInterview;
