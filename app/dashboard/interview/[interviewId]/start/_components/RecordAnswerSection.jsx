"use client"
import dynamic from "next/dynamic";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../../../../../../@/components/components/ui/button';
import { Mic } from 'lucide-react';

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });
import useSpeechToText from "react-hook-speech-to-text";


function RecordAnswerSection() {
  const [userAnswer, setUserAnswer] = useState('');
  const [isClient, setIsClient] = useState(false);

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
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (results && Array.isArray(results)) {
      setUserAnswer(prevAns => prevAns + results.map(result => result?.transcript).join(" "));
    }
  }, [results]);
  

  if (!isClient) return null;

  return (
    <div className='flex flex-col items-center justify-center '>
      <div className='flex flex-col mt-20 justify-center items-center bg-blue-600 rounded-lg p-5'>
        <Image src={'/webcam.svg'} width={200} height={200} className='absolute' alt='Webcam'/>
        <Webcam mirrored={true} style={{
          height: 300,
          width: '100%',
          zIndex:10
        }}/>
      </div>
      <Button variant='outline' className='my-10'
      onClick={isRecording?stopSpeechToText:startSpeechToText}
      >
        {isRecording?
        <h2 className="text-red-600"><Mic/>'Recording...'</h2>
        :
        'Record Answer'}</Button>
        <Button onClick={()=>console.log(userAnswer)}>Show user ans</Button>
    </div>
  )
}

export default RecordAnswerSection