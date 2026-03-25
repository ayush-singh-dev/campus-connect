import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@clerk/clerk-react';
import { GraduationCap } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const OnBoarding = () => {
    const{user,isLoaded} = useUser();
    const navigate = useNavigate();

    const handleRoleSelection = async(role)=>{
       if (!user) return;
       try {
         await user.update({
           unsafeMetadata: { role },
         });
           await user.reload();
         navigate(
           role === "student" ? "/student/dashboard" : "/teacher/dashboard",
           { replace: true }
         );
       } catch (err) {
         console.error("Error updating user metadata:", err);
       }
    }
    useEffect(() => {
      if (!isLoaded || !user) return;
      const role = user.unsafeMetadata?.role;
      console.log("User role:", role);
      if (role === "student") {
        navigate("/student/dashboard", { replace: true });
      }

      if (role === "teacher") {
        navigate("/teacher/dashboard", { replace: true });
      }
    }, [isLoaded, user, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br items-center justify-center">
      <div className="flex items-center justify-center min-h-screen pt-20 pb-8">
        <div className="w-full max-w-md px-4">
          <Card className="card-shadow">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 primary-gradient rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">
                Join CampusConnect
              </CardTitle>
              <CardDescription>
                Create your account and start learning together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Choose your role:
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex-col space-y-2 transition-smooth hover:scale-105 cursor-pointer"
                    onClick={() => handleRoleSelection("student")}
                  >
                    <span className="text-2xl">👩‍🎓</span>
                    <span className="font-medium">Student</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex-col space-y-2 transition-smooth hover:scale-105 cursor-pointer"
                    onClick={() => handleRoleSelection("teacher")}
                  >
                    <span className="text-2xl">👨‍🏫</span>
                    <span className="font-medium">Teacher</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OnBoarding