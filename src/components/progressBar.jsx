import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { useXP } from "@/hooks/useXP";
import { getLevelData } from "@/utils/level";

const ProgressBar = () => {
  const { xp } = useXP();
  const { level, progress, remaining } = getLevelData(xp);

  return (
    <Card className="card-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-xp" />
            <span className="font-medium">
              Level {level} • {xp} XP
            </span>
          </div>
          <Badge className="bg-xp text-xp-foreground">
            {remaining} XP Left
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Level {level}</span>
          <span>
            {remaining} XP to Level {level + 1}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressBar;
