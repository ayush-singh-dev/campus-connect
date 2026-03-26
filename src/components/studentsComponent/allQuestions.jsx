import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';

import { ArrowDown, ArrowUp, Badge, CheckCircle, MessageCircle } from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useQuestions } from '@/hooks/useQuestions';
import { useNavigate } from 'react-router-dom';

const AllQuestions = () => {
  const [voting, setVoting] = useState(false);
  const [userVotes, setUserVotes] = useState({});

    const { questions, fetchQuestions, voteQuestion, fetchUserVotes } = useQuestions();
    console.log("Fetched allll questions:", questions);
    const handleVote = async (questionId, voteType) => {
      if (voting) return;
      setVoting(true);
      const prevVote = userVotes[questionId] || 0;

      let newVote = voteType;

      // toggle logic
      if (prevVote === voteType) {
        newVote = 0;
      }
      // ✅ store user vote
      setUserVotes((prev) => ({
        ...prev,
        [questionId]: newVote,
      }));

      // ✅ backend call
      await voteQuestion(questionId, newVote);
      //  await fetchQuestions();
      setVoting(false);
    };
    const navigate = useNavigate();
    useEffect(() => {
      const loadData = async () => {
        await fetchQuestions();

        const votes = await fetchUserVotes();
        setUserVotes(votes);
      };

      loadData();
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
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={voting}
                  className={
                    userVotes[question.question_id] === 1 ? "text-primary" : ""
                  }
                  onClick={() => handleVote(question.question_id, 1)}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                {/* <span className="text-sm font-medium">{question.votes}</span> */}
                <span className="text-sm font-medium">
                  {" "}
                  {question.votes_count || 0}
                </span>
                <Button
                  variant="ghost"
                  disabled={voting}
                  size="sm"
                  className={
                    userVotes[question.question_id] === -1
                      ? "text-destructive"
                      : ""
                  }
                  onClick={() => handleVote(question.question_id, -1)}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>

              {/* Question Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="font-medium text-lg mb-2 hover:text-primary cursor-pointer transition-colors"
                    onClick={() =>
                      navigate(`/question/${question.question_id}`)
                    }
                  >
                    {question.question}
                  </h3>
                  {question.solved && (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {question.tags.map((tag, tagIndex) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
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
                    <span>
                      by {question.users?.full_name || "Unknown User"}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {question.channels?.name}
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