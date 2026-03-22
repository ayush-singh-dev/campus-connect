// hooks/useQuestions.js
import { useState } from "react";
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
          )
        `,
        )
        .in("channel_id", channelIds)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setQuestions(data);
    } catch (err) {
      console.error("Fetch questions error:", err.message);
    } finally {
      setLoading(false);
    }
  };
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
      console.error("Fetch single question error:", err.message);
      return null;
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
        users:users!answers_user_id_fkey (
          full_name,
          profile_image
        )
      `,
        )
        .eq("question_id", questionId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      return data || [];
    } catch (err) {
      console.error("Fetch answers error:", err.message);
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
      console.error("Create answer error:", err.message);
      return { success: false };
    }
  };

  return {
    questions,
    loading,
    fetchQuestions,
    fetchQuestionById,
    fetchAnswers,
    createAnswer,
  };
};
