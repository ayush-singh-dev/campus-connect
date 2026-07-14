import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";
import {
  CelebrationNotification,
  AchievementToast,
} from "@/components/gamificationElements";
import QuestionCard from "@/components/studentsComponent/chat/questionCard";
import AnswerCard from "@/components/studentsComponent/chat/answerCard";



const QuestionDetail = () => {
  const navigate = useNavigate();
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  return (
    <div className="min-h-screen background-gradient">
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Questions
          </Button>

          {/* Question Card */}
          <QuestionCard />

          {/* Answers Section with Tabs */}
          <AnswerCard />
        </div>
      </div>

      {showPointsAnimation && (
        <CelebrationNotification
          type="xp"
          amount={10}
          message="Helpful answer!"
          onClose={() => setShowPointsAnimation(false)}
        />
      )}

      {showAchievement && (
        <AchievementToast
          achievement="Helper Badge!"
          description="You provided a helpful answer"
          xp={10}
        />
      )}
    </div>
  );
};

export default QuestionDetail;
