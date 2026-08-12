import { useEffect, useState } from "react";
import { useChannels } from "@/hooks/useChannels";
import { useAuth, useUser } from "@clerk/clerk-react";
import supabaseClient from "@/utils/supabase";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Tag, BookOpen, Send, Sparkles } from "lucide-react";
import { FunctionsHttpError } from "@supabase/supabase-js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CelebrationNotification,
  AchievementToast,
} from "@/components/gamificationElements";
import { Textarea } from "../ui/textarea";

export const WriteQuestion = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [channel, setChannel] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const handleAddTag = () => {
    if (
      currentTag.trim() &&
      !tags.includes(currentTag.trim()) &&
      tags.length < 5
    ) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const { getToken } = useAuth();
  const { user } = useUser();

  const { channels, fetchMyChannels } = useChannels();
  useEffect(() => {
    fetchMyChannels();
  }, []);

  const improveWithAI = async () => {
    if (!title.trim()) {
      toast.error("Please enter a question first.");
      return;
    }

    try {
      setIsSubmitting(true);

      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      const { data, error } = await supabase.functions.invoke(
        "improve-question",
        {
          body: {
            question: title,
            description: content,
          },
        },
      );

      if (error) throw error;

      if (!data?.success) {
        throw new Error(data?.error || "AI improvement failed");
      }

      const improved = data.data;

      // Update question
      setTitle(improved.improvedQuestion || title);

      // Update description
      setContent(improved.improvedDescription || content);

      // Update tags
      if (Array.isArray(improved.tags)) {
        setTags(improved.tags);
      }

      toast.success("Question improved with AI ✨");
    } catch (error) {
      console.error("AI improvement error:", error);

      toast.error("AI improvement failed", {
        description: error.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImproveQuestion = async () => {
    if (!title.trim()) {
      toast.error("Enter a question first");
      return;
    }

    try {
      setIsImproving(true);

      const token = await getToken({
        template: "supabase",
      });

      const supabase = await supabaseClient(token);

      const { data, error } = await supabase.functions.invoke(
        "improve-question",
        {
          body: {
            question: title,
            description: content,
          },
        },
      );
       console.log("AI DATA:", data);
       console.log("AI ERROR:", error);

      if (error) {
        console.error("Function error:", error);
        if (error.context) {
          const errorBody = await error.context.json();
          console.error("FUNCTION ERROR BODY:", errorBody);
        }

        if (error instanceof FunctionsHttpError) {
          const errorBody = await error.context.json();

          console.error("Function response:", errorBody);

          toast.error(errorBody?.error || "AI improvement failed");

          return;
        }

        throw error;
      }

      console.log("AI result:", data);

      if (!data?.success) {
        toast.error(data?.error || "AI improvement failed");
        return;
      }

      const result = data.data;

      // Put AI result into your form
      setTitle(result.improvedQuestion || title);

      setContent(result.improvedDescription || content);

      if (Array.isArray(result.tags)) {
        setTags(result.tags);
      }

      toast.success("Question improved by AI ✨");
    } catch (error) {
      console.error("AI improvement failed:", error);

       toast.error("AI improvement failed", {
         description: error.message || "Please try again.",
       });
    } finally {
      setIsImproving(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !channel || !tags.length) {
      toast.error("Please complete all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      const { data, error } = await supabase
        .from("questions")
        .insert({
          question: title.trim(),
          description: content.trim(),
          channel_id: channel,
          user_id: user.id,
          tags: tags,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Posted successfully 🎉", {
        description: "Your question has been published",
      });

      // Gamification
      setShowPointsAnimation(true);
      setTimeout(() => setShowAchievement(true), 500);

      // Reset form
      setTitle("");
      setContent("");
      setChannel("");
      setTags([]);
      setAiSuggestions([]);

      if (onSubmit) {
        onSubmit(data);
      }
    } catch (err) {
      console.error("Post question error:", err);

      toast.error("Failed to post question", {
        description: "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="relative space-y-4">
      <Card className="card-shadow border-border/50 overflow-hidden">
        <CardHeader className="pb-4 ">
          <CardTitle className="flex items-center gap-2.5 text-xl">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <PlusCircle className="w-5 h-5 text-primary" />
            </div>
            Ask a Question
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Question Title
            </label>
            <Input
              placeholder="What would you like to know?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base h-11 bg-muted/30 border-border/50 focus:bg-background transition-colors"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleImproveQuestion}
              disabled={!title.trim() || isImproving}
              className="mt-2"
            >
              <Sparkles className="w-4 h-4 mr-2" />

              {isImproving ? "Improving..." : "Improve with AI"}
            </Button>
          </div>

          {/* Channel Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Subject Channel
            </label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger className="h-11 bg-muted/30 border-border/50">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent
                className="z-50
                w-[var(--radix-select-trigger-width)]
                bg-background
                border
                border-border
                rounded-md
                shadow-lg
                max-h-60
                overflow-y-auto"
              >
                {channels.map((ch) => (
                  <SelectItem key={ch.id} value={ch.id}>
                    {ch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Content */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">
                Description
              </label>

              {/* AI Improve Button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleImproveQuestion}
                disabled={!title.trim() || isImproving}
                className="gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary cursor-pointer"
              >
                {isImproving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                    Improving...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Improve with AI
                  </>
                )}
              </Button>
            </div>
            <Textarea
              placeholder="Provide more details about your question..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none bg-muted/30 border-border/50 focus:bg-background transition-colors"
            />
            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />

                  <span className="text-sm font-medium">AI Suggestions</span>
                </div>

                <ul className="space-y-1">
                  {aiSuggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Tag className="w-4 h-4" />
              Tags
            </label>

            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                className="flex-1 bg-muted/30 border-border/50"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={!currentTag.trim() || tags.length >= 5}
              >
                Add
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors text-xs"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={improveWithAI}
              disabled={!title.trim() || isImproving || isSubmitting}
            >
              {isImproving ? "Improving..." : "✨ Improve with AI"}
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={
                !title.trim() ||
                !content.trim() ||
                !channel ||
                isSubmitting ||
                isImproving
              }
              className="min-w-[140px] primary-gradient
                         cursor-pointer"
            >
              {isSubmitting ? "Posting..." : "Post Question"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {showPointsAnimation && (
        <CelebrationNotification
          type="xp"
          amount={15}
          message="Great question!"
          onClose={() => setShowPointsAnimation(false)}
        />
      )}

      {showAchievement && (
        <AchievementToast
          achievement="Question Master!"
          description="You asked a detailed question"
          xp={15}
        />
      )}
    </div>
  );
};
