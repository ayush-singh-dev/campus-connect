import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';
const Analytics = () => {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Students</span>
            <span className="font-medium">125</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Active This Week</span>
            <span className="font-medium text-green-600">89%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Questions Asked</span>
            <span className="font-medium">47</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Avg Response Time</span>
            <span className="font-medium">2.3h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Analytics