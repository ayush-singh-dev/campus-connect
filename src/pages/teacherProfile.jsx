import Achievements from '@/components/teachersComponent/achievements';
import ProfileCard from '@/components/teachersComponent/profileCard';
import Stats from '@/components/teachersComponent/stats';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Award, Badge, BookOpen, Building, Calendar, Camera, Clock, Mail, MapPin, MessageSquare, Phone, Settings, Star, Users } from 'lucide-react';
import React, { useState } from 'react'

const TeacherProfile = () => {
  const [profile, setProfile] = useState({
        firstName: "Dr. Sarah",
        lastName: "Mitchell",
        email: "s.mitchell@university.edu",
        phone: "+1 (555) 987-6543",
        bio: "Professor of Computer Science with 15+ years of experience in machine learning and artificial intelligence. Published researcher and passionate educator committed to inspiring the next generation of technologists.",
        university: "Stanford University",
        department: "Computer Science Department",
        position: "Associate Professor",
        officeLocation: "Gates Building, Room 392",
        officeHours: "Tue/Thu 2-4 PM",
        specialization: "Machine Learning, AI, Data Science",
        joinDate: "August 2010",
      });
  const [isEditing, setIsEditing] = useState(false);

  const courses = [
    {
      name: "Introduction to Machine Learning",
      code: "CS 229",
      students: 450,
      semester: "Fall 2024",
    },
    {
      name: "Advanced AI",
      code: "CS 331",
      students: 125,
      semester: "Fall 2024",
    },
    {
      name: "Data Mining",
      code: "CS 246",
      students: 380,
      semester: "Spring 2024",
    },
    {
      name: "Deep Learning",
      code: "CS 230",
      students: 290,
      semester: "Spring 2024",
    },
  ];

  const publications = [
    {
      title: "Attention Mechanisms in Neural Machine Translation",
      journal: "Journal of Machine Learning Research",
      year: "2024",
      citations: 127,
    },
    {
      title: "Federated Learning for Healthcare Applications",
      journal: "Nature Machine Intelligence",
      year: "2023",
      citations: 89,
    },
    {
      title: "Explainable AI in Educational Systems",
      journal: "ACM Transactions on Computing Education",
      year: "2023",
      citations: 156,
    },
  ];
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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Channels</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                    <CardDescription>
                      Your current position and academic details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <p className="text-sm font-medium">{profile.position}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <p className="text-sm font-medium">
                        {profile.department}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>University</Label>
                      <p className="text-sm font-medium">
                        {profile.university}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Office Location</Label>
                      <p className="text-sm font-medium">
                        {profile.officeLocation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Teaching Portfolio</CardTitle>
                    <CardDescription>
                      Current and recent courses you're teaching
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {courses.map((course, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg border"
                        >
                          <div>
                            <p className="font-medium">{course.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {course.code} • {course.semester}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="mb-1">
                              {course.students} students
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="research" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Publications</CardTitle>
                    <CardDescription>
                      Your latest research contributions and publications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {publications.map((pub, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border bg-muted/20"
                        >
                          <h4 className="font-medium mb-2">{pub.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {pub.journal} ({pub.year})
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {pub.citations} citations
                          </Badge>
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
                      Your latest teaching and research activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Answered 15 student questions
                          </p>
                          <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Published new lecture notes for CS 229
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Yesterday
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <Star className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Received research paper acceptance
                          </p>
                          <p className="text-xs text-muted-foreground">
                            3 days ago
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
                          Update your professional information
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
                      <div className="space-y-2">
                        <Label htmlFor="officeHours">Office Hours</Label>
                        <Input
                          id="officeHours"
                          value={profile.officeHours}
                          onChange={(e) =>
                            handleInputChange("officeHours", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input
                          id="specialization"
                          value={profile.specialization}
                          onChange={(e) =>
                            handleInputChange("specialization", e.target.value)
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
                        rows={4}
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
}

export default TeacherProfile