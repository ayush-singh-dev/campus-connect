import { useEffect, useState } from "react";
import supabaseClient from "@/utils/supabase";
import { useChannelContext } from "@/hooks/channelContext";
import { useUser, useAuth } from "@clerk/clerk-react";

export const useChannels = () => {
  const { channels, setChannels, loading, setLoading } = useChannelContext();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [searchResults, setSearchResults] = useState([]);

  const role = user?.unsafeMetadata?.role;

  //teacher creates channels
  const createChannel = async ({ name, description, accessCode }) => {
    if (role !== "teacher") {
      throw new Error("Unauthorized");
    }

    try {
      setLoading(true);

      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      // Create channel
      const { data, error } = await supabase
        .from("channels")
        .insert({
          name,
          description,
          access_code: accessCode,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Add teacher as a member
      const { error: memberError } = await supabase
        .from("channel_members")
        .insert({
          channel_id: data.id,
          user_id: user.id,
        });

      if (memberError) {
        throw memberError;
      }

      // Refresh teacher's channel list
      await fetchMyChannels();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
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
      throw err;
    }
  };

  const fetchMyChannels = async () => {
    try {
      setLoading(true);

      const token = await getToken({
        template: "supabase",
      });

      const supabase = await supabaseClient(token);

      const userId = user?.id;

      if (!userId) {
        return;
      }
      let data;
      let error;

      // =========================
      // TEACHER
      // =========================
      if (role === "teacher") {
        const result = await supabase
          .from("channels")
          .select(
            `
          id,
          name,
          description,
          created_at,
          created_by
        `,
          )
          .eq("created_by", userId)
          .order("created_at", {
            ascending: false,
          });

        data = result.data;
        error = result.error;
      }

      // =========================
      // STUDENT
      // =========================
      else {
        const result = await supabase
          .from("channel_members")
          .select(
            `
          channel_id,
          channels (
            id,
            name,
            description,
            created_at,
            created_by
          )
        `,
          )
          .eq("user_id", userId);

        error = result.error;

        if (!error) {
          data = result.data.map((item) => item.channels).filter(Boolean);
        }
      }

      if (error) {
        throw error;
      }
      setChannels(data || []);
    } catch (error) {
      throw error;
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
      throw err;
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
        throw error;
      }
      fetchMyChannels(); // Refresh my channels after joining
    } catch (error) {
      throw error;
    }
  };

  return {
    channels,
    searchResults,
    loading,
    role,
    fetchChannels,
    searchChannels,
    createChannel,
    joinChannel,
    fetchMyChannels,
  };
};
