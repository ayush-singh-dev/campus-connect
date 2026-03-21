import React, { useEffect } from 'react'
import { Button } from '../ui/button';

import { ArrowDown, ArrowUp, Badge, CheckCircle, MessageCircle } from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useQuestions } from '@/hooks/useQuestions';
import { useNavigate } from 'react-router-dom';

const AllQuestions = () => {
    // const questions = [
    //   {
    //     id: 1,
    //     title: "How to solve quadratic equations with complex solutions?",
    //     author: "Sarah M.",
    //     channel: "Math 101",
    //     votes: 15,
    //     answers: 3,
    //     time: "2h ago",
    //     tags: ["algebra", "complex-numbers"],
    //     solved: true,
    //   },
    //   {
    //     id: 2,
    //     title: "What's the difference between velocity and acceleration?",
    //     author: "Anonymous",
    //     channel: "Physics",
    //     votes: 8,
    //     answers: 2,
    //     time: "1h ago",
    //     tags: ["mechanics", "kinematics"],
    //     solved: false,
    //   },
    //   {
    //     id: 3,
    //     title: "Best practices for writing clean code in Python?",
    //     author: "Mike R.",
    //     channel: "Computer Science",
    //     votes: 22,
    //     answers: 5,
    //     time: "3h ago",
    //     tags: ["python", "best-practices"],
    //     solved: true,
    //   },
    //   {
    //     id: 4,
    //     title: "How to balance chemical equations efficiently?",
    //     author: "Emma W.",
    //     channel: "Chemistry",
    //     votes: 12,
    //     answers: 4,
    //     time: "4h ago",
    //     tags: ["balancing", "equations"],
    //     solved: false,
    //   },
    // ];

    const { questions, fetchQuestions } = useQuestions();
    console.log("Fetched allll questions:", questions);
    const navigate = useNavigate();
    useEffect(() => {
      fetchQuestions();
    }, []);
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card
          key={question.question_id}
          className="card-shadow hover:shadow-md transition-smooth"
        >
          <CardContent className="pt-6">
            <div className="flex gap-4">
              {/* Voting Column */}
              <div className="flex flex-col items-center space-y-2">
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <ArrowUp className="w-4 h-4" />
                </Button>
                {/* <span className="text-sm font-medium">{question.votes}</span> */}
                <span className="text-sm font-medium">0</span>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>

              {/* Question Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="font-medium text-lg mb-2 hover:text-primary cursor-pointer transition-colors"
                    onClick={() => navigate(`/question/${question.id}`)}
                  >
                    {question.question}
                  </h3>
                  {question.solved && (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {question.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {question.answers} answers
                    </span>
                    <span>by {question.users?.full_name || "Unknown User"}</span>
                    <Badge variant="outline" className="text-xs">
                      {question.channel?.name}
                    </Badge>
                  </div>
                  <span>{new Date(question.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AllQuestions