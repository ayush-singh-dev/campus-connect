import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Award, BookOpen, Building, Star } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    { name: "Excellence in Teaching", description: "2023 Award", icon: Award },
    { name: "Research Grant", description: "$500K NSF Grant", icon: BookOpen },
    { name: "Best Paper Award", description: "ICML 2023", icon: Star },
    { name: "Department Head", description: "2020-2023", icon: Building },
  ];
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Honors & Awards
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
    </div>
  );
}

export default Achievements