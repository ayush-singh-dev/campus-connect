import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const QuickStats = () => {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="text-sm">This Week</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">23</div>
          <div className="text-xs text-muted-foreground">New Questions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">18</div>
          <div className="text-xs text-muted-foreground">Resolved</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">92%</div>
          <div className="text-xs text-muted-foreground">
            Student Satisfaction
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuickStats