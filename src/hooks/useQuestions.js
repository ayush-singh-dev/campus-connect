// hooks/useQuestions.js
import { useState,useEffect } from "react";
import supabaseClient from "@/utils/supabase";
import { useAuth, useUser } from "@clerk/clerk-react";

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();
  const { user } = useUser();

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      // 🔥 STEP 1: get user channels
      const { data: memberships, error: mError } = await supabase
        .from("channel_members")
        .select("channel_id")
        .eq("user_id", user.id);

      if (mError) throw mError;

      const channelIds = memberships.map((c) => c.channel_id);

      if (channelIds.length === 0) {
        setQuestions([]);
        return;
      }

      // 🔥 STEP 2: get questions
      const { data, error } = await supabase
        .from("questions")
        .select(
          `
         question_id,
          question,
          description,
          tags,
          created_at,
          user_id,
          users:users!questions_user_id_fkey (
      full_name,
      profile_image
    ),
          channels (
            id,
            name
          ),
          question_votes(vote)
        `,
        )
        .in("channel_id", channelIds)
        .order("created_at", { ascending: false })
        .limit(5);
      const formatted = (data || []).map((q) => ({
        ...q,
        votes_count: q.question_votes?.reduce((sum, v) => sum + v.vote, 0) || 0,
      }));

      if (error) {
        throw error;
      }
      setQuestions(formatted);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // QUESTIONS REALTIME
  // =========================================================

  useEffect(() => {
    if (!user?.id) return;

    let supabase;
    let realtimeChannel;

    const setupRealtime = async () => {
      try {
        const token = await getToken({
          template: "supabase",
        });

        supabase = await supabaseClient(token);

        realtimeChannel = supabase
          .channel(`questions-realtime-${user.id}`)

          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "questions",
            },
            (payload) => {
              console.log("🔥 QUESTIONS REALTIME EVENT:", payload);

              // Refresh the questions list
              fetchQuestions();
            },
          )

          .subscribe((status) => {
            // console.log("📡 QUESTIONS REALTIME STATUS:", status);
          });
      } catch (error) {
        console.error("❌ Questions realtime setup error:", error);
      }
    };

    setupRealtime();

    return () => {
      if (supabase && realtimeChannel) {
        console.log("🧹 Removing questions realtime channel");

        supabase.removeChannel(realtimeChannel);
      }
    };
  }, [user?.id]);


  const fetchQuestionById = async (questionId) => {
    try {
      setLoading(true);

      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      const { data, error } = await supabase
        .from("questions")
        .select(
          `
        question_id,
        question,
        description,
        tags,
        created_at,
        users:users!questions_user_id_fkey (
          full_name,
          profile_image
        ),
        channels (
          name
        )
      `,
        )
        .eq("question_id", questionId)
        .single();

      if (error) throw error;

      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const fetchAnswers = async (questionId) => {
    try {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      const { data, error } = await supabase
        .from("answers")
        .select(
          `
        answer_id,
        answer,
        created_at,
        user_id,
        users:users!answers_user_id_fkey (
          full_name,
          profile_image,
          role
        )
      `,
        )
        .eq("question_id", questionId)
        .order("created_at", {
          ascending: true,
        });

      if (error) throw error;

      return data || [];
    } catch (err) {
      return [];
    }
  };
  const createAnswer = async (questionId, answerText) => {
    try {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      const { error } = await supabase.from("answers").insert({
        answer: answerText,
        question_id: questionId,
        user_id: user.id,
      });

      if (error) throw error;

      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };
  const voteQuestion = async (questionId, voteType) => {
    // ✅ optimistic update here
    setQuestions((prev) =>
      prev.map((q) =>
        q.question_id === questionId
          ? { ...q, votes_count: (q.votes_count || 0) + voteType }
          : q,
      ),
    );
    try {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      await supabase.rpc("vote_question", {
        p_user_id: user.id,
        p_question_id: questionId,
        p_vote: voteType,
      });
    } catch (err) {
      throw err;
    }
  };
  const fetchUserVotes = async () => {
    try {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);

      const { data, error } = await supabase
        .from("question_votes")
        .select("question_id, vote")
        .eq("user_id", user.id);

      if (error) throw error;

      // convert array → object
      const votesMap = {};
      data.forEach((v) => {
        votesMap[v.question_id] = v.vote;
      });

      return votesMap;
    } catch (err) {
      console.error("Fetch votes error:", err.message);
      return {};
    }
  };

  const fetchQuestionsFromMyChannels = async () => {
    try {
      setLoading(true);

      const token = await getToken({
        template: "supabase",
      });

      const supabase = await supabaseClient(token);

      if (!user?.id) {
        console.log("User is not available");
        setQuestions([]);
        return [];
      }

      // 1. Get channels created by this teacher
      const { data: myChannels, error: channelError } = await supabase
        .from("channels")
        .select("id")
        .eq("created_by", user.id);

      if (channelError) {
        throw channelError;
      }

      if (!myChannels || myChannels.length === 0) {
        setQuestions([]);
        return [];
      }

      // 2. Extract channel IDs
      const channelIds = myChannels.map((channel) => channel.id);

      // 3. Get questions from those channels
      const { data: questionData, error: questionError } = await supabase
        .from("questions")
        .select(
          `
        question_id,
        user_id,
        channel_id,
        question,
        description,
        tags,
        created_at,
        updated_at,
        channels (
          id,
          name
        ),
        users (
          full_name
        )
      `,
        )
        .in("channel_id", channelIds)
        .order("created_at", {
          ascending: false,
        });

      if (questionError) {
        throw questionError;
      }

      setQuestions(questionData || []);

      return questionData || [];
    } catch (error) {
      console.error("Fetch questions from my channels error:", error);

      setQuestions([]);

      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchMyQuestions = async () => {
    if (!user?.id) return [];

    try {
      const { data, error } = await supabase
        .from("questions")
        .select(
          `
        *,
        channels (
          id,
          name
        ),
        question_votes (
          id
        )
      `,
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedQuestions = (data || []).map((question) => ({
        ...question,
        votes_count: question.question_votes?.length || 0,
      }));

      setQuestions(formattedQuestions);

      return formattedQuestions;
    } catch (error) {
      console.error("Error fetching my questions:", error);
      return [];
    }
  };

  return {
    questions,
    loading,
    fetchQuestions,
    fetchQuestionById,
    fetchAnswers,
    createAnswer,
    voteQuestion,
    setQuestions,
    fetchUserVotes,
    fetchQuestionsFromMyChannels,
    fetchMyQuestions,
  };
};;
