import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Bot,
  Users,
} from "lucide-react";
import AiTab from './aiTab';
import CommunityTab from './communityTab';

const AnswerCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newAnswer, setNewAnswer] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAIAnswer, setShowAIAnswer] = useState(true);
    const [activeTab, setActiveTab] = useState("ai");
      const handleSubmitAnswer = () => {}
        const handleVote = () => {}
  return (
    <Card className="card-shadow mb-6 overflow-hidden">
      <CardHeader className="pb-0 pt-5 px-5">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Answers
          </CardTitle>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 h-10">
            <TabsTrigger value="ai" className="gap-1.5 text-xs sm:text-sm">
              <Bot className="w-4 h-4" />
              AI Professor
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="gap-1.5 text-xs sm:text-sm"
            >
              <Users className="w-4 h-4" />
              Community (3)
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="pt-4 px-5 pb-5">
        {/* AI Tab */}
        {activeTab === "ai" && <AiTab />}
        {activeTab === "community" && <CommunityTab />}
      </CardContent>
    </Card>
  );
}

export default AnswerCard