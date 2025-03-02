"use client";
import React, { useState, useEffect } from "react";
import { MockInterview } from "../../../../../utils/schema";
import { db } from "../../../../../utils/db";
import { eq } from "drizzle-orm";
import QuestionsSection from "../start/_components/QuestionsSection";
import RecordAnswerSection from "../start/_components/RecordAnswerSection";
import { Button } from "../../../../../@/components/components/ui/button";
import { useRouter } from "next/navigation"; 

function StartInterview({ params }) {
  const [interviewId, setInterviewId] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params;
      setInterviewId(unwrappedParams?.interviewId || null);
    }
    unwrapParams();
  }, [params]);

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
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />

        <RecordAnswerSection 
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewDetails={interviewDetails}
        />
      </div>
      <div className="flex justify-end gap-5"> 
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => {
              if (!interviewDetails?.mockId) return;
              router.push(`/dashboard/interview/${interviewDetails.mockId}/feedback`);
            }}
          >
            End Interview
          </Button>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
