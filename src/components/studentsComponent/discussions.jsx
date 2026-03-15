import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hash, MessageCircle, MessageSquare, Pin } from 'lucide-react';

const Discussions = () => {
    const discussions = [
      {
        title: "Homework Tips",
        channel: "Math 101",
        replies: 12,
        time: "2h ago",
        pinned: true,
      },
      {
        title: "Today's Lecture Discussion",
        channel: "Physics",
        replies: 8,
        time: "1h ago",
        pinned: false,
      },
      {
        title: "Study Group Formation",
        channel: "Computer Science",
        replies: 24,
        time: "3h ago",
        pinned: false,
      },
      {
        title: "Lab Report Guidelines",
        channel: "Chemistry",
        replies: 6,
        time: "4h ago",
        pinned: true,
      },
      {
        title: "Exam Preparation",
        channel: "Math 101",
        replies: 18,
        time: "5h ago",
        pinned: false,
      },
    ];
  return (
    <Card className="card-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="w-5 h-5 text-primary" />
          Discussions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {discussions.map((discussion, index) => (
          <div
            key={index}
            className="p-3 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer border"
            onClick={() => navigate("/channel")}
          >
            <div className="flex items-start gap-2 mb-2">
              {discussion.pinned && (
                <Pin className="w-3 h-3 text-amber-500 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1 line-clamp-2">
                  {discussion.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Hash className="w-3 h-3" />
                  <span className="truncate">{discussion.channel}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {discussion.replies}
              </span>
              <span>{discussion.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Discussions