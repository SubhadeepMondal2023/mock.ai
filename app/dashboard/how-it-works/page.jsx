"use client";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        How It Works
      </h1>
      <p className="text-gray-300 text-center mb-8">
        Welcome to <span className="font-semibold text-white">mock.ai</span>, your AI-powered mock interviewer!
      </p>

      <div className="space-y-6">
        <div className="p-5 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400">1. Navigate to the Dashboard</h2>
          <p className="text-gray-300">
            Go to <strong className="text-white">Dashboard → Click "+ Add New"</strong> to start a new mock interview session.
          </p>
        </div>

        <div className="p-5 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400">2. Enable Camera & Microphone</h2>
          <p className="text-gray-300">
            Allow <strong className="text-white">camera and microphone</strong> access for a fully interactive experience.  
            <br />
            <span className="font-semibold text-white">Note:</span> Your video is <strong>never recorded</strong>, ensuring complete privacy.
          </p>
        </div>

        <div className="p-5 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400">3. Start the Interview</h2>
          <p className="text-gray-300">
            Click <strong className="text-white">‘Start Interview’</strong> to begin your AI-powered mock interview.
          </p>
        </div>

        <div className="p-5 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400">4. Answer Questions</h2>
          <p className="text-gray-300">
            Click <strong className="text-white">‘Record Answer’</strong> when you are ready to respond.  
            Use the <strong className="text-white">Next</strong> and <strong className="text-white">Previous</strong> buttons to navigate between questions.
          </p>
        </div>

        <div className="p-5 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400">5. Change Questions</h2>
          <p className="text-gray-300">
            You can <strong className="text-white">click on a question number tab</strong> to switch between different questions at any time.
          </p>
        </div>

        <div className="p-5 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400">6. End the Interview</h2>
          <p className="text-gray-300">
            Once you’ve completed all questions, click <strong className="text-white">‘End Interview’</strong>.
          </p>
        </div>

        <div className="p-5 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400">7. Review Feedback & Correct Answers</h2>
          <p className="text-gray-300">
            After finishing, you’ll receive a <strong className="text-white">rating</strong> along with detailed <strong className="text-white">feedback</strong> and the <strong className="text-white">correct answers</strong> for each question.
          </p>
        </div>
      </div>

      <p className="text-center text-gray-400 mt-8">
        🚀 <strong className="text-white">Start practicing now and ace your next interview with confidence!</strong>
      </p>
    </div>
  );
};

export default HowItWorks;
