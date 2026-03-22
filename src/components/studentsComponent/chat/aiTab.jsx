import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Bot, Lightbulb, Code, Sparkles } from "lucide-react";

const MOCK_AI_ANSWER = {
  explanation: `To balance chemical equations effectively...`,
  codeExample: `CH₄ + 2O₂ → CO₂ + 2H₂O`,
};
const AiTab = () => {
  const [showAIAnswer, setShowAIAnswer] = useState(true);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/40">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Show AI Answer</span>
        </div>
        <Switch checked={showAIAnswer} onCheckedChange={setShowAIAnswer} />
      </div>

      {showAIAnswer && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Warning */}
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-destructive/8 border border-destructive/15">
            <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
            <span className="text-xs font-medium text-destructive">
              AI Generated Answer — Waiting for Teacher Verification
            </span>
          </div>

          {/* AI Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">AI Professor</p>
              <p className="text-xs text-muted-foreground">
                Answered instantly
              </p>
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Lightbulb className="w-4 h-4 text-primary" />
              Explanation
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line pl-1">
              {MOCK_AI_ANSWER.explanation.split("**").map((part, i) =>
                i % 2 === 1 ? (
                  <strong key={i} className="text-foreground">
                    {part}
                  </strong>
                ) : (
                  part
                ),
              )}
            </div>
          </div>

          {/* Code / Example */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Code className="w-4 h-4 text-primary" />
              Example
            </div>
            <div className="rounded-xl bg-muted/50 border border-border/50 overflow-hidden">
              <div className="flex items-center px-4 py-2 border-b border-border/30 bg-muted/30">
                <span className="text-xs text-muted-foreground font-mono">
                  chemistry
                </span>
              </div>
              <pre className="p-4 text-sm font-mono leading-relaxed overflow-x-auto text-foreground">
                <code>{MOCK_AI_ANSWER.codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiTab;
