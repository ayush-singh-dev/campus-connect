import { useEffect } from "react";
import { Trophy } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderBoard";
import { useUser } from "@clerk/clerk-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Leaderboard = () => {
   const { leaderboard, fetchLeaderboard } = useLeaderboard();
   const { user } = useUser();

   useEffect(() => {
     fetchLeaderboard();
   }, []);

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-xp" />
          Leaderboard
        </CardTitle>
        <CardDescription>This week's top performers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((student) => (
            <div
              key={student.user_id}
              className={`flex justify-between items-center p-2 rounded-lg ${
                student.user_id === user.id
                  ? "bg-primary/10 border border-primary"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold w-8">#{student.rank}</span>

                <div>
                  <div className="font-medium">{student.full_name}</div>

                  <div className="text-xs text-muted-foreground">
                    {student.xp_point ?? 0} XP
                  </div>
                </div>
              </div>

              {student.rank === 1 && "🏆"}
              {student.rank === 2 && "🥈"}
              {student.rank === 3 && "🥉"}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
