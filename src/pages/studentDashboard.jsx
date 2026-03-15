import React from 'react'
import { WriteQuestion } from '@/components/studentsComponent/writeQuestions';
import MyChannels from '@/components/studentsComponent/myChannels';
import ProgressBar from '@/components/progressBar';
import Discussions from '@/components/studentsComponent/discussions';
import AllQuestions from '@/components/studentsComponent/allQuestions';
import Leaderboard from '@/components/leaderboard';
import AiBuddy from '@/components/aiBuddy';
import RecentActivity from '@/components/recentActivity';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen background-gradient">
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, Student! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to learn something new today?
            </p>
          </div>
          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Channels & Discussions */}
            <div className="lg:col-span-1 space-y-6">
              {/* My Channels */}
              <MyChannels />

              {/* Discussions */}
              <Discussions/>
            </div>

            {/* Middle Column - Q&A Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* XP Progress Bar */}
              <ProgressBar  />

              {/* Ask Question */}
              <WriteQuestion
                onSubmit={(question) => console.log("New question:", question)}
              />

              {/* Questions Feed */}
              <AllQuestions/>
            </div>

            {/* Right Sidebar - Leaderboard */}
            <div className="lg:col-span-1 space-y-6">
              {/* Leaderboard */}
              <Leaderboard/>

              {/* Calendar & Events */}
              {/* upcoming update */}

              {/* AI Study Buddy */}
              <AiBuddy/>

              {/* Recent Activity */}
              <RecentActivity/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard