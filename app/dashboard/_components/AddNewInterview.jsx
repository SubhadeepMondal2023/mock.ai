"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../@/components/components/ui/dialog";
import { Button } from "../../../@/components/components/ui/button";
import { Input } from "../../../@/components/components/ui/input";
import { Textarea } from "../../../@/components/components/ui/textarea";
import { sendMessageToChat } from '../../../utils/GeminiAIModel';
import { LoaderCircle } from "lucide-react";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema"
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";


function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [interviewQuestions, setInterviewQuestions] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] =useState([]);
  const route = useRouter();
  const {user} = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} in-depth technical interview questions and their solutions in 3-4 lines in JSON format`;

    try {
      const result = await sendMessageToChat(inputPrompt);

      if (result) {
        setJsonResponse(result);

        const resp = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: result,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY')
        }).returning({mockId:MockInterview.mockId})

        setOpenDialog(false);
        route.push(`/dashboard/interview/${resp[0]?.mockId}`);
      } else {
        console.error("API returned undefined or null.");
      }
    } catch (error) {
      console.error("Error fetching interview questions:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
            <DialogDescription></DialogDescription>
            <form onSubmit={onSubmit}>
              <div>
                <h2>Add details about your job position/role, job description and years of experience</h2>
                <div className="mt-5 my-3">
                  <label>Job Role/Position</label>
                  <Input className='my-2' placeholder="Ex. Full-Stack Developer" required onChange={(event) => setJobPosition(event.target.value)} />
                </div>

                <div className="my-3">
                  <label>Job Description/Tech Stack (In Short)</label>
                  <Textarea className='my-2' placeholder="Ex. React, Angular, Springboot, etc." required onChange={(event) => setJobDesc(event.target.value)} />
                </div>

                <div className="my-3">
                  <label>Years of experience</label>
                  <Input className='my-2' placeholder="Ex.5" type="number" max="50" required onChange={(event) => setJobExperience(event.target.value)} />
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 
                  <>
                  <LoaderCircle className="animate-spin"/> Generating fromm AI
                  </> : 'Start Interview'}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {interviewQuestions && (
        <div className="mt-4 p-4 border rounded-md">
          <h3>Interview Questions:</h3>
          <pre>{interviewQuestions}</pre>
        </div>
      )}
    </div>
  );
}

export default AddNewInterview;