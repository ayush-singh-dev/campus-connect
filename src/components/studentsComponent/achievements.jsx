import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Trophy } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

const Achievements = () => {
  const { user, isStudent, loading } = useUserProfile();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Loading achievements...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!isStudent || !user) {
    return null;
  }

  const achievements = Array.isArray(user.achievements)
    ? user.achievements.filter(Boolean)
    : [];

  // Different icons for visual variety
  const icons = [Award, Trophy, Star];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          Achievements
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {achievements.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No achievements added yet.
          </p>
        ) : (
          achievements.map((achievement, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>

                <div>
                  <p className="font-medium text-sm">{achievement}</p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default Achievements;
