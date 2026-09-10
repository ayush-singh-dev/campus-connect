import React from "react";
import { Award, BookOpen, Target, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useUserStats from "@/hooks/useUserStats";

const Stats = () => {
  const { stats, loading } = useUserStats();

  const statItems = [
    {
      label: "Questions Asked",
      value: stats.questionsAsked,
      icon: BookOpen,
    },
    {
      label: "Answers Given",
      value: stats.answersGiven,
      icon: Target,
    },
    {
      label: "Best Answers",
      value: stats.bestAnswers,
      icon: Award,
    },
    {
      label: "Points Earned",
      value: stats.pointsEarned,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />

              <div className="text-2xl font-bold">
                {loading ? "..." : stat.value}
              </div>

              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Stats;
