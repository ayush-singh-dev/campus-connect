import { useUserContext } from "./UserContext"


export const useUserProfile = ()=>{

    const {dbUser,loading} = useUserContext()
    console.log("useUserProfile: ",dbUser)
    return {
      user: dbUser,
      role: dbUser?.role,
      isStudent: dbUser?.role === "student",
      isTeacher: dbUser?.role === "teacher",
      loading,
    };
}