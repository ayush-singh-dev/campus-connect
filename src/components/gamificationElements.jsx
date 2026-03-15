import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Star,
  Zap,
  Target,
  Award,
  Crown,
  Flame,
  Medal,
} from "lucide-react";

// XP Progress Component
export const XPProgress = ({
  currentXP = 1890,
  level = 12,
  nextLevelXP = 2000,
}) => {
  const progress = ((currentXP % 1000) / 1000) * 100;
  const xpToNext = nextLevelXP - currentXP;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-xp" />
          <span className="font-medium">Level {level}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {xpToNext} XP to next level
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="text-center">
        <span className="text-lg font-bold text-xp">
          {currentXP.toLocaleString()} XP
        </span>
      </div>
    </div>
  );
};

// Badge Collection Component
export const BadgeCollection = () => {
  const badges = [
    {
      name: "Helper",
      icon: "🤝",
      description: "Answered 10 questions",
      earned: true,
    },
    {
      name: "Streak Master",
      icon: "🔥",
      description: "7-day login streak",
      earned: true,
    },
    {
      name: "Knowledge Star",
      icon: "⭐",
      description: "Got 50 upvotes",
      earned: true,
    },
    {
      name: "Night Owl",
      icon: "🦉",
      description: "Active after midnight",
      earned: false,
    },
    {
      name: "Early Bird",
      icon: "🐦",
      description: "Active before 6 AM",
      earned: false,
    },
    {
      name: "Professor",
      icon: "👨‍🏫",
      description: "Helped 100 students",
      earned: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {badges.map((badge, index) => (
        <Card
          key={index}
          className={`p-3 text-center transition-smooth ${
            badge.earned
              ? "card-shadow hover:glow-shadow"
              : "opacity-50 hover:opacity-75"
          }`}
        >
          <CardContent className="p-0">
            <div className="text-2xl mb-1">{badge.icon}</div>
            <div className="text-xs font-medium">{badge.name}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {badge.description}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Celebration Animation Component
export const CelebrationNotification = ({
  type = "xp",
  amount = 50,
  message = "Great job!",
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case "xp":
        return <Zap className="w-5 h-5 text-xp" />;
      case "badge":
        return <Award className="w-5 h-5 text-primary" />;
      case "level":
        return <Crown className="w-5 h-5 text-accent" />;
      default:
        return <Star className="w-5 h-5 text-primary" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case "xp":
        return "bg-xp text-xp-foreground";
      case "badge":
        return "bg-primary text-primary-foreground";
      case "level":
        return "accent-gradient text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-scale-in">
      <Card className={`${getColor()} card-shadow animate-bounce`}>
        <CardContent className="p-4 flex items-center space-x-3">
          <div className="animate-spin-slow">{getIcon()}</div>
          <div>
            <div className="font-bold animate-pulse">
              {type === "xp" && `+${amount} XP`}
              {type === "badge" && "New Badge!"}
              {type === "level" && "Level Up!"}
            </div>
            <div className="text-sm opacity-90">{message}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Leaderboard Component
export const Leaderboard = ({ compact = false }) => {
  const users = [
    { rank: 1, name: "Alex Chen", xp: 2450, badge: "🏆", streak: 15 },
    { rank: 2, name: "Sarah Johnson", xp: 2380, badge: "🥈", streak: 12 },
    { rank: 3, name: "Mike Rodriguez", xp: 2120, badge: "🥉", streak: 8 },
    { rank: 4, name: "You", xp: 1890, badge: "", streak: 5 },
    { rank: 5, name: "Emma Wilson", xp: 1750, badge: "", streak: 3 },
  ];

  return (
    <div className="space-y-2">
      {users.slice(0, compact ? 3 : 5).map((user, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-3 rounded-lg transition-smooth ${
            user.name === "You"
              ? "bg-primary/10 border border-primary/20 animate-pulse-glow"
              : "hover:bg-muted/50"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm w-6">#{user.rank}</span>
              {user.badge && <span className="text-lg">{user.badge}</span>}
            </div>
            <div>
              <div className="font-medium text-sm">{user.name}</div>
              {!compact && (
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Flame className="w-3 h-3" />
                  <span>{user.streak} day streak</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-sm">{user.xp.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">XP</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Achievement Toast Component
export const AchievementToast = ({
  achievement = "First Question!",
  description = "You asked your first question",
  xp = 25,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in-right">
      <Card className="primary-gradient text-white card-shadow animate-pulse-glow">
        <CardContent className="p-4 flex items-center space-x-3">
          <div className="animate-bounce">
            <Trophy className="w-8 h-8 text-yellow-300" />
          </div>
          <div>
            <div className="font-bold animate-fade-in">{achievement}</div>
            <div className="text-sm opacity-90">{description}</div>
            <Badge className="mt-1 bg-white/20 text-white border-white/30 animate-scale-in">
              +{xp} XP
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Streak Counter Component
export const StreakCounter = ({ days = 5, maxStreak = 15 }) => {
  const progress = (days / maxStreak) * 100;

  return (
    <Card className="card-shadow">
      <CardContent className="p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Flame className="w-6 h-6 text-orange-500 mr-2" />
          <span className="text-2xl font-bold text-orange-500">{days}</span>
        </div>
        <div className="text-sm font-medium mb-2">Day Streak</div>
        <Progress value={progress} className="h-2 mb-2" />
        <div className="text-xs text-muted-foreground">
          {maxStreak - days} days to Streak Master badge
        </div>
      </CardContent>
    </Card>
  );
};
