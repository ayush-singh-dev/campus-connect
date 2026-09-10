import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Award, Settings, Target } from "lucide-react";
import ProfileCard from "@/components/studentsComponent/profileCard";
import Achievements from "@/components/studentsComponent/achievements";
import Stats from "@/components/studentsComponent/stats";
import supabaseClient from "@/utils/supabase";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQuestions } from "@/hooks/useQuestions";
import { useAuth } from "@clerk/clerk-react";
import SettingsTab from "@/components/studentsComponent/SettingTab";

const StudentProfile = () => {
  const { questions, fetchQuestions } = useQuestions();
  const [joinedChannels, setJoinedChannels] = useState([]);
  const [channelsLoading, setChannelsLoading] = useState(true);
  const { userId, getToken } = useAuth();
  // const [profile, setProfile] = useState({
  //   firstName: "Alex",
  //   lastName: "Johnson",
  //   email: "alex.johnson@university.edu",
  //   phone: "+1 (555) 123-4567",
  //   bio: "Computer Science student passionate about AI and machine learning. Active in coding competitions and open source projects.",
  //   university: "MIT",
  //   major: "Computer Science",
  //   year: "Junior",
  //   gpa: "3.8",
  //   location: "Cambridge, MA",
  //   joinDate: "September 2022",
  // });

  const fetchJoinedChannels = async () => {
    if (!userId) return;

    try {
      setChannelsLoading(true);

      const token = await getToken();
      const supabase = await supabaseClient(token);

      const { data, error } = await supabase
        .from("channel_members")
        .select(
          `
        channel_id,
        channels (
          id,
          name,
          description,
          created_at
        )
      `,
        )
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching joined channels:", error);
        return;
      }

      const channels = (data || [])
        .map((item) => item.channels)
        .filter(Boolean);

      setJoinedChannels(channels);
    } catch (error) {
      console.error("Error fetching joined channels:", error);
    } finally {
      setChannelsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchJoinedChannels();
    }
  }, [userId]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

   const { user, isStudent, loading } = useUserProfile();
   const [isEditing, setIsEditing] = useState(false);
   const [saving, setSaving] = useState(false);

   const [profile, setProfile] = useState({
     full_name: "",
     email: "",
     phone: "",
     bio: "",
     college: "",
     department: "",
     degree: "",
     specialization: "",
     location: "",
     joining_date: "",
     achievements: [],
     profile_image: "",
   });
   useEffect(() => {
     if (!user) return;

     setProfile({
       full_name: user.full_name || "",
       email: user.email || "",
       phone: user.phone || "",
       bio: user.bio || "",
       college: user.college || "",
       department: user.department || "",
       degree: user.degree || "",
       specialization: user.specialization || "",
       location: user.location || "",
       joining_date: user.joining_date || "",
       achievements: user.achievements || [],
       profile_image: user.profile_image || "",
     });
   }, [user]);

   const handleSave = async () => {
     try {
       setSaving(true);

       const token = await getToken();
       const supabase = await supabaseClient(token);

       const cleanedAchievements = profile.achievements
         .map((item) => item.trim())
         .filter(Boolean);

       const { error } = await supabase
         .from("users")
         .update({
           full_name: profile.full_name,
           phone: profile.phone,
           bio: profile.bio,
           college: profile.college,
           department: profile.department,
           degree: profile.degree,
           specialization: profile.specialization,
           location: profile.location,
           joining_date: profile.joining_date || null,
           achievements: cleanedAchievements,
         })
         .eq("user_id", user.user_id);

       if (error) {
         console.error("Error updating profile:", error);
         return;
       }

       setProfile((prev) => ({
         ...prev,
         achievements: cleanedAchievements,
       }));

       setIsEditing(false);

       window.location.reload();
     } catch (error) {
       console.error("Save profile error:", error);
     } finally {
       setSaving(false);
     }
   };


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <ProfileCard />
            {/* Achievements */}
            <Achievements />
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <Stats />
            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 ">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="questions">My Questions</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Information</CardTitle>
                    <CardDescription>
                      Your current academic status and progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>University</Label>
                      <p className="text-sm font-medium">
                        {user?.college || "Not available"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Major</Label>
                      <p className="text-sm font-medium">{profile.major}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Academic Year</Label>
                      <p className="text-sm font-medium">{profile.year}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Current GPA</Label>
                      <p className="text-sm font-medium">
                        {user?.gpa || "Not available"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Courses</CardTitle>
                    <CardDescription>
                      Your enrolled channels for this semester
                    </CardDescription>
                  </CardHeader>
                  <TabsContent value="courses" className="space-y-4">
                    <Card>
                      <CardContent>
                        {channelsLoading ? (
                          <div className="py-8 text-center text-muted-foreground">
                            Loading your channels...
                          </div>
                        ) : joinedChannels.length === 0 ? (
                          <div className="py-8 text-center">
                            <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

                            <h4 className="font-medium">
                              No channels joined yet
                            </h4>

                            <p className="mt-1 text-sm text-muted-foreground">
                              Join an academic channel to see it here.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {joinedChannels.map((channel) => (
                              <Card
                                key={channel.id}
                                className="border hover:shadow-sm transition-shadow"
                              >
                                <CardContent className="flex items-center justify-between p-4">
                                  <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                                      <BookOpen className="h-5 w-5 text-primary" />
                                    </div>

                                    <div>
                                      <h4 className="font-semibold">
                                        {channel.name}
                                      </h4>

                                      {channel.description && (
                                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                          {channel.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      // navigate to your channel page
                                    }}
                                  >
                                    View Channel
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Card>
              </TabsContent>

              <TabsContent value="questions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Questions</CardTitle>
                    <CardDescription>
                      Questions you've posted and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {questions.length === 0 ? (
                      <div className="text-center py-10">
                        <BookOpen className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />

                        <p className="font-medium">No questions yet</p>

                        <p className="text-sm text-muted-foreground">
                          Questions you ask will appear here.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {questions.map((question) => (
                          <div
                            key={question.question_id}
                            className="p-4 rounded-lg border hover:shadow-md transition"
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h4 className="font-medium text-lg">
                                {question.question || "Untitled Question"}
                              </h4>
                            </div>

                            {/* Tags */}

                            {question.tags?.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {question.tags.map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {/* Question information */}

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span>👍 {question.votes_count || 0}</span>

                              <span>💬 {question.answers_count || 0}</span>

                              {question.channels?.name && (
                                <Badge variant="outline">
                                  {question.channels.name}
                                </Badge>
                              )}

                              <span>
                                {question.created_at
                                  ? new Date(
                                      question.created_at,
                                    ).toLocaleDateString()
                                  : ""}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings" className="space-y-6">
               <SettingsTab/>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
