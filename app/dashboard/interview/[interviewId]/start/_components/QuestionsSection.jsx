"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry! No text-to-speech support. Kindly update your browser.");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border border-blue-800 rounded-lg my-10">
        {/* Question List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              onClick={() => setActiveQuestionIndex(index)} // ✅ Update active question
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-300 
              ${
                activeQuestionIndex === index
                  ? "bg-blue-600 text-white font-bold scale-105 shadow-lg"
                  : "bg-secondary text-white"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>

        {/* Active Question Display */}
        <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
        <Volume2
          className="cursor-pointer"
          onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
        />

        {/* Note Section */}
        <div className="border rounded-lg p-5 mt-20">
          <h2 className="flex gap-2 items-center">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm my-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
