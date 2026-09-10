import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import supabaseClient from "@/utils/supabase";

export const useXP = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let channel;

    const init = async () => {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      // Initial fetch
      await fetchXP(supabase);

      // Listen for XP updates
      channel = supabase
        .channel("xp-updates")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "users",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            setXp(payload.new.xp_point);
            console.log("XP Updated:", payload);
            setXp(Number(payload.new.xp_point) || 0);
          },
        )
        .subscribe();
    };

    init();

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [user, getToken]);

  const fetchXP = async (client) => {
    try {
      const supabase =
        client ||
        (await supabaseClient(await getToken({ template: "supabase" })));

      const { data, error } = await supabase
        .from("users")
        .select("xp_point")
        .eq("user_id", user.id)
        .single();
      if (error) throw error;

      setXp(data.xp_point || 0);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return {
    xp,
    loading,
    refreshXP: fetchXP,
  };
};
