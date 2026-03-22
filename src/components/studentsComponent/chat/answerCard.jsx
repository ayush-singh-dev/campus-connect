import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Award,
  CheckCircle,
  Bot,
  AlertTriangle,
  Lightbulb,
  Code,
  Sparkles,
  Send,
  Users,
  ThumbsUp,
  ThumbsDown,
  GraduationCap,
  User,
} from "lucide-react";
import AiTab from './aiTab';
import CommunityTab from './communityTab';

const MOCK_AI_ANSWER = {
  explanation: `To balance chemical equations effectively, follow these steps:

**Step 1: Write the unbalanced equation**
List all reactants and products with their correct chemical formulas.

**Step 2: Count atoms on each side**
Make a table listing each element and count how many atoms appear on each side.

**Step 3: Balance one element at a time**
Start with the most complex molecule. Add coefficients (not subscripts) to balance each element.

**Step 4: Check your work**
Verify that all atoms are balanced and coefficients are in the lowest whole-number ratio.

**Pro tip:** Save hydrogen and oxygen for last, as they appear in many compounds.`,
  codeExample: `Example: Balancing combustion of methane

Unbalanced:  CH₄ + O₂ → CO₂ + H₂O

Step 1: Count atoms
  Left:  C=1, H=4, O=2
  Right: C=1, H=2, O=3

Step 2: Balance H → add coefficient 2 to H₂O
  CH₄ + O₂ → CO₂ + 2H₂O

Step 3: Recount O → Left: 2, Right: 4
  Add coefficient 2 to O₂

Balanced: CH₄ + 2O₂ → CO₂ + 2H₂O ✓`,
};
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