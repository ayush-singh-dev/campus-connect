import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, BookOpen, Star, Trophy } from 'lucide-react';
const Achievements = () => {
    const achievements = [
      { name: "Dean's List", description: "Fall 2023", icon: Award },
      {
        name: "Hackathon Winner",
        description: "MIT Hackathon 2023",
        icon: Trophy,
      },
      { name: "Research Assistant", description: "AI Lab", icon: BookOpen },
      {
        name: "Top Contributor",
        description: "Most helpful answers",
        icon: Star,
      },
    ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <achievement.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{achievement.name}</p>
              <p className="text-xs text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Achievements