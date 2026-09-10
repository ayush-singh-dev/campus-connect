import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import supabaseClient from "@/utils/supabase";

const useUserStats = () => {
  const { userId, getToken } = useAuth();

  const [stats, setStats] = useState({
    questionsAsked: 0,
    answersGiven: 0,
    bestAnswers: 0,
    pointsEarned: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) {
        setStats({
          questionsAsked: 0,
          answersGiven: 0,
          bestAnswers: 0,
          pointsEarned: 0,
        });
        setLoading(false);
        return;
      }

      try {
        const token = await getToken();
        const supabase = await supabaseClient(token);

        // Questions asked
        const { count: questionsAsked } = await supabase
          .from("questions")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId);

        // Answers given
        const { count: answersGiven } = await supabase
          .from("answers")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId);

        setStats({
          questionsAsked: questionsAsked || 0,
          answersGiven: answersGiven || 0,

          // Keep 0 until your database has a best-answer column
          bestAnswers: 0,

          // Keep 0 until your leaderboard points column is connected
          pointsEarned: 0,
        });
      } catch (error) {
        console.error("Error fetching user stats:", error);

        // If anything fails, show 0 instead of breaking the page
        setStats({
          questionsAsked: 0,
          answersGiven: 0,
          bestAnswers: 0,
          pointsEarned: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId, getToken]);

  return { stats, loading };
};

export default useUserStats;
