import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, Brain, Star, Target } from 'lucide-react';
import { Button } from './ui/button';

const AiBuddy = () => {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-accent" />
          AI Study Buddy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Brain className="w-4 h-4 mr-2" />
            Summarize
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Target className="w-4 h-4 mr-2" />
            Flashcards
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Star className="w-4 h-4 mr-2" />
            Quiz Me
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AiBuddy