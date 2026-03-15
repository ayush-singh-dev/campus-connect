import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
     const leaderboard = [
       { rank: 1, name: "Alex Chen", xp: 2450, badge: "🏆" },
       { rank: 2, name: "Sarah Johnson", xp: 2380, badge: "🥈" },
       { rank: 3, name: "Mike Rodriguez", xp: 2120, badge: "🥉" },
       { rank: 4, name: "You", xp: 1890, badge: "" },
       { rank: 5, name: "Emma Wilson", xp: 1750, badge: "" },
     ];

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-xp" />
          Leaderboard
        </CardTitle>
        <CardDescription>This week's top performers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 rounded-lg ${user.name === "You" ? "bg-primary/10 border border-primary/20" : ""}`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium w-6">#{user.rank}</span>
                <div>
                  <div className="font-medium text-sm flex items-center gap-1">
                    {user.badge && <span>{user.badge}</span>}
                    {user.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.xp} XP
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Leaderboard