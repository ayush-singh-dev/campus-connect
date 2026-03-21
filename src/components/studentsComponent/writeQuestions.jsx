import { useEffect,useState } from "react";
import { useChannels } from "@/hooks/useChannels";
import { useAuth, useUser } from "@clerk/clerk-react";
import supabaseClient from "@/utils/supabase";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

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

import { PlusCircle, Tag, BookOpen, Send } from "lucide-react";
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


  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !channel || !tags.length) return;

    setIsSubmitting(true);

    try {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      const { error } = await supabase.from("questions").insert({
        question: title.trim(),
        description: content.trim(),
        channel_id: channel,
        user_id: user.id,
        tags: tags, // ✅ array of text
      });

      if (error) throw error;

      // ✅ SUCCESS TOAST
     toast.success("Posted successfully 🎉", {
       description: "Your question has been published",
     });

      // 🎉 Gamification
      setShowPointsAnimation(true);
      setTimeout(() => setShowAchievement(true), 500);

      // Reset form
      setTitle("");
      setContent("");
      setChannel("");
      setTags([]);

      if (onSubmit) onSubmit();
    } catch (err) {
      console.error(err);
      toast.error({
        title: "❌ Error",
        description: "Failed to post question",
        variant: "destructive",
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
              <SelectContent>
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
            <label className="text-sm font-medium text-muted-foreground">
              Description
            </label>
            <Textarea
              placeholder="Provide more details about your question..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none bg-muted/30 border-border/50 focus:bg-background transition-colors"
            />
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
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={
                !title.trim() || !content.trim() || !channel || isSubmitting
              }
              className="min-w-[140px] primary-gradient"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Posting...
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Post Question
                </>
              )}
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
