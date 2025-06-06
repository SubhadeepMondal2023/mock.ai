import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';

function Dashboard() {
  return (
    <div className="p-10 flex flex-col min-h-screen">
      <div className="flex-grow">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <h2 className="text-gray-300">Create and Start your AI Mock Interview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 my-5">
          <AddNewInterview />
        </div>

        {/* Previous Interviews List */}
        <InterviewList />
      </div>
    </div>
  );
}

export default Dashboard;
