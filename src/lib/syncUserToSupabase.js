import supabaseClient from "../utils/supabase.js";

export const syncUserToSupabase = async (clerkUser, getToken) => {
  if (!clerkUser) return;

  const token = await getToken({ template: "supabase" });
  console.log(":::::::::::::::::::::::",JSON.parse(atob(token.split(".")[1])));
  const supabase = await supabaseClient(token);
  console.log("syncUserToSupabase: ", supabase);

  const userData = {
    user_id: clerkUser.id,
    full_name: clerkUser.fullName || "",
    email: clerkUser.primaryEmailAddress?.emailAddress || "",
    role: clerkUser.unsafeMetadata?.role,
    profile_image: clerkUser.imageUrl || null,
  };

  const { error } = await supabase
    .from("users")
    .upsert(userData, { onConflict: "user_id" });

  if (error) {
    console.error("Supabase sync error:", error);
  }
};
