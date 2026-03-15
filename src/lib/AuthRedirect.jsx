import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const AuthRedirect = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  const role = user?.publicMetadata?.role;

  if (!role) {
    return <Navigate to="/onBoarding" replace />;
  }

  if (role === "student") {
    return <Navigate to="/student/dashboard" replace />;
  }

  if (role === "teacher") {
    return <Navigate to="/teacher/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default AuthRedirect;
