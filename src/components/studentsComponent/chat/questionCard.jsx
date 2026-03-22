import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Badge, BookOpen, CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuestions } from "@/hooks/useQuestions";

const QuestionCard = () => {
  const { fetchQuestionById } = useQuestions();
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      const q = await fetchQuestionById(questionId);
      // const a = await fetchAnswers(questionId);

      setQuestion(q);
      // setAnswers(a);
    };

    loadData();
  }, [questionId]);
  if (!question) return <div>Loading...</div>;
  return (
    <Card className="card-shadow mb-6 border-border/40">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs font-normal gap-1">
                <BookOpen className="w-3 h-3" />
                {question.channels?.name || "General"}
              </Badge>
              {question.solved && (
                <Badge
                  variant="outline"
                  className="text-xs gap-1 border-green-500/30 text-green-600 bg-green-500/10"
                >
                  <CheckCircle className="w-3 h-3" />
                  Solved
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl mb-3">{question.question}</CardTitle>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>
                Asked by{" "}
                <strong className="text-foreground">
                  {question.users?.full_name || "Unknown User"}
                </strong>
              </span>
              <span>•</span>
              <span>{question.created_at}</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 ml-4">
            <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
              <ArrowUp className="w-4 h-4" />
            </Button>
            <span className="font-semibold text-lg">{question.votes}56</span>
            <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed mb-4">
          {question.description || "No description provided."}
        </p>
        <div className="flex gap-2">
          {question.tags?.map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
