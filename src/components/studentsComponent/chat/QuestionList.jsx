import { useState } from "react";
import { useChannelChat } from "@/hooks/useChannelChat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, Hash, MessageSquare, ThumbsUp, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pin, Star } from "lucide-react";


export const QuestionList = ({ channelId }) => {
  const { questions, answers } = useChannelChat(channelId);
  console.log("Questions are ::::", questions);

  return (
    <div className="flex-1 flex flex-col">
      {/* Channel Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Hash className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Math 101</h1>
              <p className="text-sm text-muted-foreground">
                General discussion and Q&A
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              45 members
            </Badge>
          </div>
        </div>
      </div>
      {/* Questions-Title */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {questions.map((q) => (
          <Card key={q.question_id} className="card-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    {/* <AvatarFallback className="text-xs">
                      {q.author === "Anonymous"
                        ? "?"
                        : q.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback> */}
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      {/* <span className="font-medium text-sm">{q.author}</span> */}
                      <span className="text-xs text-muted-foreground">
                        {q.time}
                      </span>
                      {/* {q.pinned && <Pin className="w-3 h-3 text-primary" />} */}
                      {/* {q.bestAnswer && <Star className="w-3 h-3 text-xp" />} */}
                    </div>
                  </div>
                </div>
              </div>
              <CardTitle className="text-lg">{q.question}</CardTitle>
            </CardHeader>

            {/* Content */}
            <CardContent>
              <p className="text-foreground/80 mb-4">{q.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {/* {post.upvotes} */}
                  </Button>
                  {/* total answers */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {/* {post.answers} answers */}
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  {q.tags?.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-2 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded-md"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
