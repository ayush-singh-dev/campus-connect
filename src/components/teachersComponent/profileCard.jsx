import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar,  Gamepad, Mail, MapPin, Phone, RollerCoaster, Timer, TimerIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { useUserProfile } from '@/hooks/useUserProfile';

const ProfileCard = () => {
   const { user, isTeacher, loading } = useUserProfile();
    if (loading) return <p>Loading...</p>;
    if (!isTeacher) return <p>Access Denied</p>;
    console.log("teacherPeofile:", user)
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
  return (
    <div>
      <Card>
        <CardHeader className="text-center">
          <div className="relative mx-auto">
            <Avatar className="w-28 h-28 mx-auto">
              <AvatarImage
                src={user.profile_image}
                alt={user.full_name}
              />
              <AvatarFallback className="text-2xl">
                {user.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.full_name}</h1>
            <p className="text-muted-foreground">{profile.position}</p>
            <p className="text-sm text-muted-foreground">{user.department}</p>
            <p className="text-sm text-muted-foreground">{user.university}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{profile.officeLocation}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <RollerCoaster className="w-4 h-4 text-muted-foreground" />
            <span>Role: {user.role}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Joining Date: {user.joining_date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TimerIcon className="w-4 h-4 text-muted-foreground" />
            <span>Since {user.year_teaching} Years</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Gamepad className="w-4 h-4 text-muted-foreground" />
            <span>XP Points: {user.xp_point} </span>
          </div>
          <Separator />
          <div>
            <Label className="text-sm font-medium">Specialization</Label>
            <p className="text-sm mt-1">{user.specialization}</p>
          </div>
          <Separator />
          <p className="text-sm">{user.bio}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileCard