import { useEffect } from "react";
import { useChatContext } from "./ChatContext";
import supabaseClient from "@/utils/supabase";
import { useAuth, useUser } from "@clerk/clerk-react";

export const useChannelChat = (channelId) => {
  const { questions, setQuestions, answers, setAnswers } = useChatContext();

  const { getToken } = useAuth();
  const { user } = useUser();

  // 🔹 Fetch initial data
  const fetchMessages = async () => {
    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);

    const { data: qData } = await supabase
      .from("questions")
      .select("*")
      .eq("channel_id", channelId)
      .order("created_at");

    const { data: aData } = await supabase
      .from("answers")
      .select("*")
      .order("created_at");

    setQuestions(qData || []);
    setAnswers(aData || []);
  };

  // 🔹 Ask question
  const askQuestion = async (text) => {
    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);

    await supabase.from("questions").insert({
      question: text,
      channel_id: channelId,
      user_id: user.id,
    });
  };

  // 🔹 Answer
  const answerQuestion = async (questionId, text) => {
    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);

    await supabase.from("answers").insert({
      question_id: questionId,
      answer: text,
      user_id: user.id,
    });
  };

  // 🔥 Realtime
  useEffect(() => {
    let supabase;

    const setupRealtime = async () => {
      const token = await getToken({ template: "supabase" });
      supabase = await supabaseClient(token);

      supabase
        .channel("questions-live")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "questions" },
          (payload) => {
            if (payload.new.channel_id === channelId) {
              setQuestions((prev) => [...prev, payload.new]);
            }
          },
        )
        .subscribe();

      supabase
        .channel("answers-live")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "answers" },
          (payload) => {
            setAnswers((prev) => [...prev, payload.new]);
          },
        )
        .subscribe();
    };

    fetchMessages();
    setupRealtime();

    return () => {
      if (supabase) supabase.removeAllChannels();
    };
  }, [channelId]);

  return {
    questions,
    answers,
    askQuestion,
    answerQuestion,
  };
};
