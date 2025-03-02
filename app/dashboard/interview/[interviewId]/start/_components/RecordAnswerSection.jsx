"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../../../../@/components/components/ui/button';
import { Toaster, toast } from "sonner";
import { Mic, StopCircle } from 'lucide-react';
import { db } from '../../../../../../utils/db';
const Webcam = dynamic(() => import("react-webcam"), { ssr: false });
import useSpeechToText from "react-hook-speech-to-text";
import { sendMessageToChat } from '../../../../../../utils/GeminiAIModel';
import { UserAnswer } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewDetails}) {
    const [userAnswer, setUserAnswer] = useState('');
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useUser();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    useEffect(() => {
        if (results && Array.isArray(results)) {
            setUserAnswer(prevAns => prevAns + results.map(result => result?.transcript).join(" "));
        }
    }, [results]);

    useEffect(() => {
      if(!isRecording&&userAnswer.length>5){
        UpdateUserAnswer();
      }
      
    }, [userAnswer]);

    const StartStopRec = () => {
        if (isRecording) {
          stopSpeechToText();
        } else {
          startSpeechToText();
        }
    };

    const UpdateUserAnswer=async() => {
      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, depending on the Question and User Answer for the given interview question, provide a JSON response with exactly two fields: 'rating' (out of 5) and 'feedback'. The 'feedback' field should contain a single, comprehensive string about 30 words. Do not include any additional fields or text outside of the JSON object.`;

     try {
          setIsLoading(true);
          const result = await sendMessageToChat(feedbackPrompt);
          console.log("Raw API Response:", result);
          try {
              const jsonFeedbackResp = JSON.parse(result);

              if (!jsonFeedbackResp.rating || !jsonFeedbackResp.feedback || Object.keys(jsonFeedbackResp).length !== 2) {
                  throw new Error("Invalid API response format: Expected only 'rating' and 'feedback'.");
              }

              try {
                if (!interviewDetails?.mockId) {
                    console.error("Error: mockIdRef is null or undefined.");
                    toast("Error saving answer. Missing mock ID.");
                    return;
                }
            
                if (!mockInterviewQuestion[activeQuestionIndex]?.question) {
                    console.error("Error: question is null or undefined.");
                    toast("Error saving answer. Missing question.");
                    return;
                }
            
                const currentDate = new Date();
                const day = String(currentDate.getDate()).padStart(2, '0');
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const year = currentDate.getFullYear();
                const formattedDate = `${day}-${month}-${year}`;
            
                const insertValues = {
                    mockIdRef: interviewDetails?.mockId,
                    question: mockInterviewQuestion[activeQuestionIndex]?.question,
                    correctAns: mockInterviewQuestion[activeQuestionIndex]?.solution,
                    userAns: userAnswer,
                    feedback: jsonFeedbackResp?.feedback,
                    rating: String(jsonFeedbackResp?.rating),
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    createdAt: formattedDate,
                };
            
                console.log("Insert values:", insertValues);
            
                const resp = await db.insert(UserAnswer).values(insertValues);
                console.log("Database response:", resp);
            
                if (resp) {
                    toast('User Answer recorded successfully!');
                }
            } catch (dbError) {
                console.error("Database insertion error:", dbError);
                toast("Error saving answer. Please try again.");
                return;
            }
          } catch (jsonError) {
              console.error("JSON parse error:", jsonError);
              toast("Error processing feedback. Invalid response received.");
              return;
          }
      } catch (error) {
          console.error("Error processing API response:", error);
          toast(`Error fetching feedback: ${error.message || "Please try again."}`);
          return;
      } finally {
          setUserAnswer('');
          setResults([]);
          setIsLoading(false);
      }
    }

    if (!isClient) return null;

    return (
        <div className='flex flex-col items-center justify-center '>
            <div className='flex flex-col mt-20 justify-center items-center bg-blue-600 rounded-lg p-5'>
                <Image src={'/webcam.svg'} width={200} height={200} className='absolute' alt='Webcam' />
                <Webcam mirrored={true} style={{
                    height: 300,
                    width: '100%',
                    zIndex: 10,
                }} />
            </div>
            <Button variant='outline' className='my-10' onClick={StartStopRec} disabled={isLoading}>
                {isLoading ? (
                    "Loading..."
                ) : isRecording ? (
                    <h2 className="text-red-600 flex items-center gap-2">
                        <StopCircle /> Stop Recording
                    </h2>
                ) : (
                    <h2 className="flex items-center gap-2">
                        <Mic /> Record Answer
                    </h2>
                )}
            </Button>
            <Toaster/>
        </div>
    );
}

export default RecordAnswerSection;