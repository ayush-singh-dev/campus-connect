import React from 'react'
import { Award, BookOpen, Target, TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Stats = () => {
    const stats = [
      { label: "Questions Asked", value: "47", icon: BookOpen },
      { label: "Answers Given", value: "123", icon: Target },
      { label: "Best Answers", value: "28", icon: Award },
      { label: "Points Earned", value: "2,456", icon: TrendingUp },
    ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4 text-center">
            <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Stats