import React, { useState } from "react";
import { BriefcaseBusiness, GraduationCap, Heart } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
   const role = user?.publicMetadata?.role;
   console.log("Navbar User Role:", role);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
    }
  };
  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b ">
        <div className="container mx-auto px-10 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 transition-smooth hover:scale-105"
          >
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 " />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CampusConnect
            </span>
          </Link>
          <div>
            <SignedOut>
              <Button variant="outline" onClick={() => setShowSignIn(true)}>
                Log In
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-20 h-30",
                  },
                }}
              >
                <UserButton.MenuItems>
                  {role === "teacher"
                    ? [
                        <UserButton.Action
                          key="teacher-dashboard"
                          label="Teacher Dashboard"
                          onClick={() => navigate("/teacher/dashboard")}
                          labelIcon={<BriefcaseBusiness size={16} />}
                        />,
                        <UserButton.Action
                          key="teacher-profile"
                          label="Teacher Profile"
                          onClick={() => navigate("/teacher-profile")}
                          labelIcon={<Heart size={16} />}
                        />,
                      ]
                    : role === "student"
                    ? [
                        <UserButton.Action
                          key="student-dashboard"
                          label="Student Dashboard"
                          onClick={() => navigate("/student/dashboard")}
                          labelIcon={<LayoutDashboard size={16} />}
                        />,
                        <UserButton.Action
                          key="student-profile"
                          label="Student Profile"
                          onClick={() => navigate("/student-profile")}
                          labelIcon={<Heart size={16} />}
                        />,
                      ]
                    : null}

                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
                
              </UserButton>
            </SignedIn>
            {/* <Button variant="default" className="primary-gradient">
              Sign Up
            </Button> */}
          </div>
        </div>
      </nav>
      {/* {showSignIn && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onBoarding"
            fallbackRedirectUrl="/onBoarding"
          />
        </div>
      )} */}
      {showSignIn && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onBoarding"
            fallbackRedirectUrl="/onBoarding"
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
