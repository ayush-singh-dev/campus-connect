import React from 'react'
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge, Zap } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const ProgressBar = () => {
  return (
    <Card className="card-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-xp" />
            <span className="font-medium">Level 12 • 1890 XP</span>
          </div>
          <Badge className="bg-xp text-xp-foreground">+50 XP Today!</Badge>
        </div>
        <Progress value={85} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Level 12</span>
          <span>110 XP to Level 13</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProgressBar;