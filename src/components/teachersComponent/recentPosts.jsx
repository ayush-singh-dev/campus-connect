import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, MessageSquare, Pin, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const RecentPosts = () => {
    const recentPosts = [
      {
        id: 1,
        student: "Anonymous",
        channel: "Math 101",
        question: "How do I solve quadratic equations with complex solutions?",
        answers: 3,
        time: "2 hours ago",
        status: "answered",
      },
      {
        id: 2,
        student: "Sarah J.",
        channel: "Statistics",
        question: "What's the difference between correlation and causation?",
        answers: 1,
        time: "4 hours ago",
        status: "needs-attention",
      },
      {
        id: 3,
        student: "Mike R.",
        channel: "Advanced Calculus",
        question: "Can someone explain the chain rule with examples?",
        answers: 5,
        time: "1 day ago",
        status: "resolved",
      },
    ];
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Posts Requiring Attention
        </CardTitle>
        <CardDescription>
          Moderate and engage with student questions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.channel}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      by {post.student}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      • {post.time}
                    </span>
                  </div>
                  <p className="font-medium mb-2">{post.question}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.answers} answers</span>
                    <Badge
                      variant={
                        post.status === "needs-attention"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {post.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t">
                <Button size="sm" variant="outline">
                  <Pin className="w-3 h-3 mr-1" />
                  Pin
                </Button>
                <Button size="sm" variant="outline">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Mark Best Answer
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="w-3 h-3 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentPosts