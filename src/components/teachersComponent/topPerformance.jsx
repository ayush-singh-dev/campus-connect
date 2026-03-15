import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';
import { Badge } from '../ui/badge';
const TopPerformance = () => {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-success" />
          Top Students
        </CardTitle>
        <CardDescription>Most active this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {["Alex Chen", "Sarah Johnson", "Mike Rodriguez"].map(
            (student, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                    {student
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="text-sm font-medium">{student}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  +{150 - index * 20} XP
                </Badge>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default TopPerformance