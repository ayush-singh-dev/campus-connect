import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoaded, user, isSignedIn } = useUser();
  //   const { pathname } = useLocation();
  const location = useLocation();
  if (!isLoaded) return null;
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  const role = user?.publicMetadata?.role;

  if (!role && location.pathname !== "/onBoarding") {
    return <Navigate to="/onBoarding" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <Navigate
        to={role === "student" ? "/student/dashboard" : "/teacher/dashboard"}
        replace
      />
    );
  }

  // if(!isLoaded && !isSignedIn && isSignedIn !== undefined  ){
  //     return <Navigate to="/" replace />;
  // }

  // if(user !==undefined && !user?.unsafeMetadata?.role && pathname !== "/onBoarding"){
  //     return <Navigate to="/onBoarding" replace />;
  // }
  return children;
};

export default ProtectedRoute;
