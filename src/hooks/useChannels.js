import { useEffect, useState } from "react";
import supabaseClient from "@/utils/supabase";
import { useChannelContext } from "@/hooks/ChannelContext";
import { useUser, useAuth } from "@clerk/clerk-react";

export const useChannels = () => {
  const { channels, setChannels, loading, setLoading } = useChannelContext();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [searchResults, setSearchResults] = useState([]);

  const role = user?.publicMetadata?.role;

  //teacher creates channels
  const createChannel = async ({ name, description, accessCode }) => {
    if (role !== "teacher") throw new Error("Unauthorized");
    setLoading(true);
    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);
    const { error } = await supabase.from("channels").insert({
      name,
      description,
      access_code: accessCode,
      created_by: user.id,
    });
    setLoading(false);
    if (error) {
      console.error("Error creating channel:", error);
      return { success: false, error };
    }

    fetchChannels(); // Refresh channel list
  };
  //fetch channels based on role
  const fetchChannels = async (search) => {
    try {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      const { data, error } = await supabase
        .from("channels")
        .select("id,name,description")
        .ilike("name", `%${search}%`)
        .limit(10);

      if (error) throw error;

      setSearchResults(data || []);
    } catch (err) {
      console.error("Search channels error:", err.message);
    }
  };

  const fetchMyChannels = async () => {
    try {
      setLoading(true);

      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      const userId = user?.id; // Clerk user id

      const { data, error } = await supabase
        .from("channel_members")
        .select(
          `
        channel_id,
        channels (
          id,
          name,
          description,
          created_at
        )
      `,
        )
        .eq("user_id", userId); // IMPORTANT

      if (error) throw error;

      const myChannels = data.map((item) => item.channels);

      setChannels(myChannels);

      console.log("My Channels:", myChannels);
      console.log("Clerk user id:", user?.id);
    } catch (error) {
      console.error("Fetch my channels error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const searchChannels = async (query) => {
    try {
      if (!query) {
        setSearchResults([]);
        return;
      }
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      const { data, error } = await supabase
        .from("channels")
        .select("*")
        .ilike("name", `%${query}%`)
        .limit(10);

      if (error) throw error;

      setSearchResults(data || []);
    } catch (err) {
      console.error("Search error:", err.message);
    }
  };

  //student joins channel
  const joinChannel = async ({ channelId, accessCode }) => {
    try {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);
      const { error } = await supabase.rpc("join_channel", {
        p_channel_id: channelId,
        p_access_code: accessCode,
      });

      if (error) {
        console.error("Join error:", error.message);
        throw error;
      }
      fetchMyChannels(); // Refresh my channels after joining
    } catch (error) {
      console.error("Join error:", error.message);
      throw error;
    }
    
  };

  return {
    channels,
    searchResults,
    loading,
    role,
    searchChannels,
    createChannel,
    joinChannel,
    fetchMyChannels,
  };
};
