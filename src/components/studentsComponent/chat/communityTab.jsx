import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Send, Badge, GraduationCap, User, CheckCircle, Award } from "lucide-react";
const CommunityTab = () => {
     const [newAnswer, setNewAnswer] = useState("");

    const [answers, setAnswers] = useState([
      {
        id: 1,
        author: "Dr. Sarah Wilson",
        avatar: "/placeholder.svg",
        role: "teacher",
        emoji: "👩‍🏫",
        content:
          "Great question! The key to balancing chemical equations is to ensure that the number of atoms of each element is the same on both sides of the equation. Start with the most complex molecule first, then work your way through each element systematically.",
        votes: 15,
        upvotes: 15,
        downvotes: 0,
        time: "2h ago",
        isAccepted: true,
        isVerified: true,
        badges: ["Expert", "Top Contributor"],
      },
      {
        id: 2,
        author: "Alex Chen",
        avatar: "/placeholder.svg",
        role: "student",
        emoji: "🧑‍🎓",
        content:
          "I find it helpful to use the algebraic method. Assign variables to each compound and set up equations based on conservation of mass. It's more systematic for complex reactions.",
        votes: 8,
        upvotes: 8,
        downvotes: 1,
        time: "1h ago",
        isAccepted: false,
        isVerified: false,
        badges: ["Helper"],
      },
      {
        id: 3,
        author: "Maria Garcia",
        avatar: "/placeholder.svg",
        role: "student",
        emoji: "👩‍🎓",
        content:
          "Don't forget to check your work by counting atoms on both sides! I always make a table to keep track of each element.",
        votes: 3,
        upvotes: 3,
        downvotes: 0,
        time: "45m ago",
        isAccepted: false,
        isVerified: false,
        badges: [],
      },
    ]);

     const handleSubmit = () => {
       if (!newAnswer.trim()) return;

       setAnswers([
         ...answers,
         {
           id: Date.now(),
           author: "You",
           content: newAnswer,
           upvotes: 0,
           downvotes: 0,
         },
       ]);

       setNewAnswer("");
     };

     const handleVote = (id, type) => {
       setAnswers(
         answers.map((ans) => {
           if (ans.id === id) {
             return {
               ...ans,
               upvotes: type === "up" ? ans.upvotes + 1 : ans.upvotes,
               downvotes: type === "down" ? ans.downvotes + 1 : ans.downvotes,
             };
           }
           return ans;
         }),
       );
     };
  return (
    <div className="space-y-4">
      {/* Reply Input */}
      <div className="space-y-2">
        <Textarea
          placeholder="Share your knowledge! Write a helpful answer..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="min-h-[80px] resize-none bg-muted/30 border-border/50 text-sm"
        />
        <div className="flex justify-end">
          <Button
            size="sm"
            // onClick={handleSubmitAnswer}
            disabled={!newAnswer.trim() || isSubmitting}
            className="primary-gradient gap-1.5"
          >
            {/* {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                Submitting...
              </div>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Post Answer
              </>
            )} */}
          </Button>
        </div>
      </div>

      {/* Answers List */}
      <div className="space-y-3">
        {answers.map((answer) => (
          <div
            key={answer.id}
            className={`p-4 rounded-xl border transition-colors ${
              answer.isVerified
                ? "bg-green-500/5 border-green-500/20"
                : "bg-muted/20 border-border/40 hover:border-border/60"
            }`}
          >
            {/* Answer Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{answer.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold">
                      {answer.author}
                    </span>
                    <Badge
                      variant={
                        answer.role === "teacher" ? "default" : "secondary"
                      }
                      className={`text-[10px] px-1.5 py-0 h-5 ${
                        answer.role === "teacher"
                          ? "primary-gradient border-0"
                          : ""
                      }`}
                    >
                      {answer.role === "teacher" ? (
                        <>
                          <GraduationCap className="w-3 h-3 mr-0.5" /> Teacher
                        </>
                      ) : (
                        <>
                          <User className="w-3 h-3 mr-0.5" /> Student
                        </>
                      )}
                    </Badge>
                    {answer.isVerified && (
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 h-5 border-green-500/30 text-green-600 bg-green-500/10"
                      >
                        <CheckCircle className="w-3 h-3 mr-0.5" />
                        Verified
                      </Badge>
                    )}
                    {answer.badges.map((badge) => (
                      <Badge
                        key={badge}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 h-5"
                      >
                        <Award className="w-3 h-3 mr-0.5" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {answer.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Answer Content */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-3 pl-[42px]">
              {answer.content}
            </p>

            {/* Vote Actions */}
            <div className="flex items-center gap-3 pl-[42px]">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1 text-xs text-muted-foreground hover:text-primary"
                onClick={() => handleVote(answer.id, "up")}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                {answer.upvotes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1 text-xs text-muted-foreground hover:text-destructive"
                onClick={() => handleVote(answer.id, "down")}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                {answer.downvotes}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityTab;
