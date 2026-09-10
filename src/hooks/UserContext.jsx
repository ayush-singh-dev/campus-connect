// import { syncUserToSupabase } from "@/lib/syncUserToSupabase";
// import supabaseClient from "@/utils/supabase";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import { createContext, useContext, useEffect, useState } from "react";

// const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const { isLoaded, user, isSignedIn } = useUser();
//   console.log("userContext:: ", user);
//   const { getToken } = useAuth();
//   console.log("getToken:", getToken);
//   const [dbUser, setDbUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isLoaded) {
//       return;
//     }
//     if (!isSignedIn) {
//       setDbUser(null);
//       setLoading(false);
//       return;
//     }
//     const initUser = async () => {
//       setLoading(true);
//       await syncUserToSupabase(user, getToken);

//       const token = await getToken({ template: "supabase" });
//       const supabase = await supabaseClient(token);

//       const { data, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("user_id", user.id)
//         .single();
//       console.log("user Context Fetched user from Supabase:", data, error);
//       if (!error) {
//         setDbUser(data);
//         console.log("databaseUser:", data);
//         setLoading(false);
//       }
//     };
//     initUser();
//   }, [isLoaded, isSignedIn, user, getToken]);

//   return (
//     <UserContext.Provider value={{ dbUser, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => useContext(UserContext);

import { syncUserToSupabase } from "@/lib/syncUserToSupabase";
import supabaseClient from "@/utils/supabase";
import { useAuth, useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isLoaded, user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      setDbUser(null);
      setLoading(false);
      return;
    }

    const initUser = async () => {
      try {
        setLoading(true);

        // Sync Clerk user to Supabase
        await syncUserToSupabase(user, getToken);

        // Get Clerk JWT for Supabase
        const token = await getToken({
          template: "supabase",
        });

        if (!token) {
          throw new Error("Supabase Clerk token was not generated.");
        }

        // Create Supabase client
        const supabase = await supabaseClient(token);

        // Fetch database user
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("UserContext Supabase error:", error);
          setDbUser(null);
          return;
        }

        console.log("Database user:", data);

        setDbUser(data);
      } catch (error) {
        console.error("initUser error:", error);
        setDbUser(null);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, [isLoaded, isSignedIn, user, getToken]);

  return (
    <UserContext.Provider
      value={{
        dbUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
