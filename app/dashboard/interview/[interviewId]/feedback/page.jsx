'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '../../../../../utils/db'
import { UserAnswer } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../@/components/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '../../../../../@/components/components/ui/button'

function Feedback() {
  const params = useParams();
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (params.interviewId) {
      getFeedback();
    }
  }, [params.interviewId]);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  };

  const calculateAverageRating = () => {
    if (feedbackList.length === 0) {
      return 'No ratings available';
    }

    const totalRating = feedbackList.reduce((sum, item) => sum + (Number(item.rating) || 0), 0);
    const average = totalRating / feedbackList.length;

    const roundedRating = Math.min(5, Math.max(1, Math.round(average)));

    return `${roundedRating} / 5`;
  };

  return (
    <div className='p-10'>
      {feedbackList.length === 0 ? (
        <h2 className='font-bold text-xl text-red-400'>No interview feedback record found!</h2>
      ) : (
        <>
          <h2 className='font-bold text-2xl '>
            <strong className='text-green-500'>Congratulations!</strong> Here is your interview feedback
          </h2>
          {feedbackList.length > 0 && (
            <h2 className='text-primary text-lg my-3'>
              Your overall interview rating: <strong>{calculateAverageRating()}</strong>
            </h2>
          )}
          <h2 className='text-sm text-gray-400'>
            Below are the interview questions with your given answers, their correct answers along with feedback for improvement!
          </h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className='mt-5'>
              <CollapsibleTrigger className='bg-secondary p-3 rounded-lg my-2 text-left flex justify-between w-full'>
                {item.question}
                <ChevronsUpDown className='h-5 w-5'/>
              </CollapsibleTrigger>
              <CollapsibleContent className='my-3 p-3 border rounded-lg w-full'>
                <div className='flex flex-col gap-3'>
                  <h2><strong>Rating: {item.rating}</strong></h2>
                  <h2 className='text-sm'><strong className='text-yellow-500'>Your Answer: </strong>{item.userAns}</h2>
                  <h2 className='text-sm'><strong className='text-green-500'>Correct Answer: </strong>{item.correctAns}</h2>
                  <h2 className='text-sm'><strong className='text-blue-500'>Feedback: </strong>{item.feedback}</h2>
                </div>
              </CollapsibleContent>
            </Collapsible>      
          ))}
        </>
      )}
      <Button className='mt-5' onClick={() => router.replace('/dashboard')}>Go to Dashboard</Button>
    </div>
  );
}

export default Feedback;
