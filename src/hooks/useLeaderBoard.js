import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import supabaseClient from "@/utils/supabase";

export const useLeaderboard = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);

    // Top 5 users
    const { data: topUsers, error } = await supabase
      .from("users")
      .select("user_id, full_name, profile_image, xp_point")
      .order("xp_point", { ascending: false })
      .limit(5);

    if (error) throw error;

    // All users (to calculate rank)
    const { data: allUsers } = await supabase
      .from("users")
      .select("user_id, full_name, profile_image, xp_point")
      .order("xp_point", { ascending: false });

    const rankedUsers = allUsers.map((u, index) => ({
      ...u,
      rank: index + 1,
    }));

    const currentUser = rankedUsers.find((u) => u.user_id === user.id);

    let finalLeaderboard = topUsers.map((u, index) => ({
      ...u,
      rank: index + 1,
    }));

    const alreadyInTop5 = finalLeaderboard.some((u) => u.user_id === user.id);

    if (!alreadyInTop5 && currentUser) {
      finalLeaderboard.push(currentUser);
    }

    setLeaderboard(finalLeaderboard);
  };

  return {
    leaderboard,
    fetchLeaderboard,
  };
};
