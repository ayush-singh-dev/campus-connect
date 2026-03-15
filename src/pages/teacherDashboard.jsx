import React from "react";
import TeacherChannels from "@/components/teachersComponent/teacherChannels";
import RecentPosts from "@/components/teachersComponent/recentPosts";
import Analytics from "@/components/teachersComponent/analytics";
import TopPerformance from "@/components/teachersComponent/topPerformance";
import QuickStats from "@/components/teachersComponent/quickStats";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen background-gradient">
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Teacher Dashboard 👨‍🏫</h1>
            <p className="text-muted-foreground">
              Manage your classes and help students succeed
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* My Channels */}
              <TeacherChannels />
              {/* Recent Posts to Moderate */}
              <RecentPosts />
            </div>
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Analytics Overview */}
              <Analytics />
              {/* Top Performers */}
              <TopPerformance />
              {/* Quick Stats */}
              <QuickStats />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
