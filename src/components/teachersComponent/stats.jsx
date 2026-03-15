import { BookOpen, Calendar, MessageSquare, Users } from 'lucide-react';
import React from 'react'
import { Card, CardContent } from '../ui/card';

const Stats = () => {
    const stats = [
      { label: "Total Students joined", value: "2,847", icon: Users },
      { label: "Total Channels", value: "4", icon: BookOpen },
      { label: "Questions Answered", value: "892", icon: MessageSquare },
      { label: "Years Teaching", value: "15", icon: Calendar },
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