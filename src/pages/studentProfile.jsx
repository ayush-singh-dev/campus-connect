import { useState } from "react";
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
import {
  BookOpen,
  Award,
  Settings,
  Target,
} from "lucide-react";
import ProfileCard from "@/components/studentsComponent/profileCard";
import Achievements from "@/components/studentsComponent/achievements";
import Stats from "@/components/studentsComponent/stats";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    bio: "Computer Science student passionate about AI and machine learning. Active in coding competitions and open source projects.",
    university: "MIT",
    major: "Computer Science",
    year: "Junior",
    gpa: "3.8",
    location: "Cambridge, MA",
    joinDate: "September 2022",
  });

  
  

  const courses = [
    { name: "Machine Learning", code: "CS 6.034", grade: "A", credits: 4 },
    { name: "Algorithms", code: "CS 6.006", grade: "A-", credits: 4 },
    { name: "Database Systems", code: "CS 6.830", grade: "B+", credits: 3 },
    { name: "Web Development", code: "CS 6.170", grade: "A", credits: 3 },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
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
            <Stats/>
            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="questions">My Questions</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
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
                        {profile.university}
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
                      <p className="text-sm font-medium">{profile.gpa}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Courses</CardTitle>
                    <CardDescription>
                      Your enrolled courses for this semester
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {courses.map((course, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div>
                            <p className="font-medium">{course.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {course.code}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="mb-1">
                              {course.grade}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {course.credits} credits
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
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
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          title:
                            "How to optimize React components for better performance?",
                          channel: "Computer Science",
                          votes: 12,
                          answers: 5,
                          views: 234,
                          time: "2 days ago",
                          status: "answered",
                          tags: ["react", "optimization"],
                        },
                        {
                          id: 2,
                          title:
                            "Best practices for machine learning model deployment?",
                          channel: "Machine Learning",
                          votes: 8,
                          answers: 2,
                          views: 156,
                          time: "1 week ago",
                          status: "open",
                          tags: ["ml", "deployment"],
                        },
                        {
                          id: 3,
                          title:
                            "Understanding time complexity in sorting algorithms",
                          channel: "Algorithms",
                          votes: 15,
                          answers: 7,
                          views: 445,
                          time: "2 weeks ago",
                          status: "solved",
                          tags: ["algorithms", "complexity"],
                        },
                      ].map((question) => (
                        <div
                          key={question.id}
                          className="p-4 rounded-lg border hover:shadow-md transition-smooth"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-lg hover:text-primary cursor-pointer">
                              {question.title}
                            </h4>
                            <Badge
                              variant={
                                question.status === "solved"
                                  ? "default"
                                  : question.status === "answered"
                                  ? "secondary"
                                  : "outline"
                              }
                              className="ml-2"
                            >
                              {question.status}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {question.tags.map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <span>👍 {question.votes}</span>
                              <span>💬 {question.answers}</span>
                              <span>👀 {question.views}</span>
                              <Badge variant="outline" className="text-xs">
                                {question.channel}
                              </Badge>
                            </div>
                            <span>{question.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your latest interactions and contributions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Award className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Earned "Best Answer" badge
                          </p>
                          <p className="text-xs text-muted-foreground">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Asked a question in Machine Learning
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Yesterday
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <Target className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Helped 3 students with Algorithm problems
                          </p>
                          <p className="text-xs text-muted-foreground">
                            2 days ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Profile Settings</CardTitle>
                        <CardDescription>
                          Update your personal information
                        </CardDescription>
                      </div>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={() =>
                          isEditing ? handleSave() : setIsEditing(true)
                        }
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        {isEditing ? "Save Changes" : "Edit Profile"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={profile.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
