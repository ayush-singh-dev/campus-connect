import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, BookOpen, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import AddChannelbtn from "./addChannelbtn";
import { useChannels } from "@/hooks/useChannels";

const TeacherChannels = () => {
  const channelss = [
    { name: "Math 101", students: 45, posts: 23, activity: "high" },
    {
      name: "Advanced Calculus",
      students: 28,
      posts: 12,
      activity: "medium",
    },
    { name: "Statistics", students: 52, posts: 18, activity: "high" },
  ];
  const { channels, fetchChannels, role, joinChannel } = useChannels();
   useEffect(() => {
     fetchChannels();
   }, []);
  return (
    <Card className="card-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            My Channels
          </CardTitle>
          <CardDescription>Manage your class channels</CardDescription>
        </div>
        {/* add channel button */}
        <AddChannelbtn />
      </CardHeader>
      <CardContent>
        {/* channel list */}
        <div className="space-y-4">
          {channels.map((channel, index) => (
            <div
              key={channel.index}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{channel.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      45 students
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      23 posts
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    {channel.description}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    channel.activity === "high" ? "default" : "secondary"
                  }
                >
                  {channel.activity} activity
                </Badge>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherChannels;
