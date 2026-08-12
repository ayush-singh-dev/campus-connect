import React, { useState,useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import {
  AlertTriangle,
  Bot,
  Lightbulb,
  Code,
  Sparkles,
  Loader2,
  ListChecks,
  BookOpen,
  RefreshCw,
} from "lucide-react";

import { useAuth } from "@clerk/clerk-react";
import supabaseClient from "@/utils/supabase";
import { Button } from "@/components/ui/button";


const AiTab = ({question}) => {
    const { getToken } = useAuth();
  const [showAIAnswer, setShowAIAnswer] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiAnswer, setAiAnswer] = useState(null);
  const [error, setError] = useState("");

 const generateAIAnswer = async () => {
   if (!question) {
     console.error("Question is missing");
     return;
   }

   setIsGenerating(true);
   setError("");

   try {
     const token = await getToken({
       template: "supabase",
     });

     const supabase = await supabaseClient(token);

     console.log("Sending question to AI:", question.question);

     const { data, error } = await supabase.functions.invoke("answer-ai", {
       body: {
         question: question.question,
         description: question.description,
         tags: question.tags || [],
       },
     });

     console.log("AI response:", data);

     if (error) {
       throw error;
     }

     if (!data?.success) {
       throw new Error(data?.error || "AI answer generation failed");
     }

     /*
      * data.data is now an OBJECT
      */
     const answer = data.data;

     console.log("Structured AI answer:", answer);

     /*
      * Save in React state
      */
     setAiAnswer(answer);

     /*
      * Save in localStorage
      */
     const storageKey = `ai-answer-${question.question_id}`;

     localStorage.setItem(storageKey, JSON.stringify(answer));

     console.log("AI answer saved to localStorage");
   } catch (err) {
     console.error("AI Answer Error:", err);

     setError(err.message || "Unable to generate AI answer. Please try again.");
   } finally {
     setIsGenerating(false);
   }
 };
  useEffect(() => {
    if (!question?.question_id) return;

    const storageKey = `ai-answer-${question.question_id}`;

    const savedAnswer = localStorage.getItem(storageKey);

    if (savedAnswer) {
      try {
        const parsedAnswer = JSON.parse(savedAnswer);

        console.log("Loaded AI answer from localStorage:", parsedAnswer);

        setAiAnswer(parsedAnswer);
      } catch (error) {
        console.error("Failed to parse saved AI answer:", error);

        localStorage.removeItem(storageKey);
      }
    }
  }, [question?.question_id]);
  const clearAIAnswer = () => {
    if (!question?.question_id) return;

    const storageKey = `ai-answer-${question.question_id}`;

    localStorage.removeItem(storageKey);

    setAiAnswer(null);
    setError("");
  };
   if (!question) {
     return (
       <div className="flex items-center justify-center py-10">
         <Loader2 className="w-6 h-6 animate-spin text-primary" />
       </div>
     );
   }
  return (
    <div className="space-y-5">
      {/* =====================================
          SHOW / HIDE AI ANSWER
      ===================================== */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/40">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-primary" />

          <span className="text-sm font-medium">Show AI Answer</span>
        </div>

        <Switch checked={showAIAnswer} onCheckedChange={setShowAIAnswer} />
      </div>

      {/* =====================================
          NO ANSWER
      ===================================== */}
      {!aiAnswer && !isGenerating && showAIAnswer && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Bot className="w-8 h-8 text-primary" />
          </div>

          <h3 className="font-semibold text-lg mb-2">Ask AI Professor</h3>

          <p className="text-sm text-muted-foreground max-w-md mb-5">
            Get an AI-generated explanation, examples, step-by-step guidance,
            diagrams and useful learning resources.
          </p>

          <Button onClick={generateAIAnswer} className="primary-gradient">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate AI Answer
          </Button>
        </div>
      )}

      {/* =====================================
          LOADING
      ===================================== */}
      {isGenerating && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-9 h-9 animate-spin text-primary mb-4" />

          <p className="font-medium">AI Professor is thinking...</p>

          <p className="text-sm text-muted-foreground mt-1">
            Creating an explanation and examples
          </p>
        </div>
      )}

      {/* =====================================
          ERROR
      ===================================== */}
      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />

            <div>
              <p className="font-medium">AI Answer Error</p>

              <p className="mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          AI ANSWER
      ===================================== */}
      {showAIAnswer && aiAnswer && !isGenerating && (
        <div className="space-y-6 animate-in fade-in duration-300">

          {/* AI Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                <Bot className="w-5 h-5 text-primary" />
              </div>

              <div>
                <p className="text-sm font-semibold">AI Professor</p>

                <p className="text-xs text-muted-foreground">
                  AI generated explanation
                </p>
              </div>
            </div>
          </div>

          {/* =====================================
                EXPLANATION
            ===================================== */}
          {aiAnswer.explanation && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Lightbulb className="w-4 h-4 text-primary" />
                Explanation
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <p className="text-sm leading-7 whitespace-pre-line text-foreground/90">
                  {aiAnswer.explanation}
                </p>
              </div>
            </div>
          )}

          {/* =====================================
                KEY POINTS
            ===================================== */}
          {aiAnswer.keyPoints?.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ListChecks className="w-4 h-4 text-primary" />
                Key Points
              </div>

              <div className="space-y-2">
                {aiAnswer.keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/40"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================
                EXAMPLE
            ===================================== */}
          {aiAnswer.example && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Code className="w-4 h-4 text-primary" />
                Example
              </div>

              <div className="rounded-xl bg-muted/50 border border-border/50 overflow-hidden">
                <div className="px-4 py-2 border-b border-border/30 bg-muted/30">
                  <span className="text-xs text-muted-foreground">Example</span>
                </div>

                <pre className="p-4 text-sm leading-6 overflow-x-auto whitespace-pre-wrap">
                  <code>{aiAnswer.example}</code>
                </pre>
              </div>
            </div>
          )}

          {/* =====================================
                STEPS
            ===================================== */}
          {aiAnswer.steps?.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ListChecks className="w-4 h-4 text-primary" />
                Step-by-Step
              </div>

              <div className="space-y-2">
                {aiAnswer.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0">
                      {index + 1}
                    </div>

                    <p className="text-sm leading-6 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================
                FLOWCHART
            ===================================== */}
          {aiAnswer.flowchart && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-medium">
                📊 Flowchart
              </div>

              <div className="rounded-xl bg-muted/50 border border-border/50 overflow-hidden">
                <div className="px-4 py-2 border-b border-border/30 bg-muted/30">
                  <span className="text-xs text-muted-foreground">
                    Mermaid Diagram
                  </span>
                </div>

                <pre className="p-4 text-xs leading-6 overflow-x-auto whitespace-pre-wrap">
                  {aiAnswer.flowchart}
                </pre>
              </div>
            </div>
          )}

          {/* =====================================
                RESOURCES
            ===================================== */}
          {aiAnswer.resources?.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="w-4 h-4 text-primary" />
                Learning Resources
              </div>

              <div className="space-y-2">
                {aiAnswer.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-border/50 bg-muted/30"
                  >
                    <p className="text-sm font-medium">{resource.title}</p>

                    {resource.searchQuery && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Search: {resource.searchQuery}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================
                ACTION BUTTONS
            ===================================== */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              onClick={generateAIAnswer}
              disabled={isGenerating}
              className="flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Another Answer
            </Button>

            <Button
              variant="ghost"
              onClick={clearAIAnswer}
              className="text-destructive hover:text-destructive"
            >
              Clear Answer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiTab;
