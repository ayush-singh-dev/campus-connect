import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { useUserProfile } from '@/hooks/useUserProfile';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '../ui/button';
import { Calendar, Camera, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import { Separator } from '../ui/separator';
const ProfileCard = () => {
    const { user, isStudent, loading } = useUserProfile();
    if (loading) return <p>Loading...</p>;
    if (!isStudent) return <p>Access Denied</p>;
    console.log("studentProfile:", user)
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
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="relative mx-auto">
          <Avatar className="w-32 h-32 mx-auto">
            <AvatarImage src={user.profile_image} alt={user.full_name} />
            <AvatarFallback className="text-2xl">
              {user.full_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.full_name}</h1>
          <p className="text-muted-foreground">{user.department}</p>
          <p className="text-sm text-muted-foreground">{user.college}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <span>Degree: {user.degree}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <span>Specialization: {user.specialization}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span>{user.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>Joined {user.joining_date}</span>
        </div>
    
        <Separator />
        <p className="text-sm">{user.bio}</p>
      </CardContent>
    </Card>
  );
}

export default ProfileCard