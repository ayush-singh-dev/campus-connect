import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from 'lucide-react';
const RecentActivity = () => {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
            <div>
              <div className="font-medium">Question answered</div>
              <div className="text-muted-foreground">Math 101 • +25 XP</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
            <div>
              <div className="font-medium">New badge earned</div>
              <div className="text-muted-foreground">Helper • +100 XP</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
            <div>
              <div className="font-medium">Quiz completed</div>
              <div className="text-muted-foreground">Physics • +50 XP</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentActivity