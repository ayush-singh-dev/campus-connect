import React from "react";

import {
  Calendar,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { useUserProfile } from "@/hooks/useUserProfile";

const ProfileCard = () => {
  const { user, isStudent, loading } = useUserProfile();

  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </CardContent>
      </Card>
    );
  }

  /* -----------------------------------------
     Access check
  ----------------------------------------- */
  if (!isStudent) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">Access Denied</p>
        </CardContent>
      </Card>
    );
  }

  /* -----------------------------------------
     User not found
  ----------------------------------------- */
  if (!user) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">Profile not found.</p>
        </CardContent>
      </Card>
    );
  }

  /* -----------------------------------------
     Initials
  ----------------------------------------- */
  const initials =
    user.full_name
      ?.split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <Card className="overflow-hidden">
      {/* =========================================
          PROFILE HEADER
      ========================================= */}
      <CardHeader className="text-center pb-6">
        {/* Profile Image */}
        <div className="relative mx-auto mb-4">
          <Avatar className="h-32 w-32 mx-auto border-4 border-background shadow-md">
            <AvatarImage
              src={user.profile_image || ""}
              alt={user.full_name || "Student"}
              className="object-cover"
            />

            <AvatarFallback className="text-3xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold">{user.full_name || "Student"}</h1>

        {/* Department */}
        <p className="mt-1 text-muted-foreground">
          {user.department || "Department not available"}
        </p>

        {/* College */}
        <p className="text-sm text-muted-foreground">
          {user.college || "College not available"}
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* =========================================
            BASIC INFORMATION
        ========================================= */}

        <div className="space-y-4">
          <ProfileField icon={<Mail />} label="Email" value={user.email} />

          <ProfileField
            icon={<GraduationCap />}
            label="Degree"
            value={user.degree}
          />

          <ProfileField
            icon={<GraduationCap />}
            label="Specialization"
            value={user.specialization}
          />

          <ProfileField
            icon={<MapPin />}
            label="Location"
            value={user.location}
          />

          <ProfileField
            icon={<Calendar />}
            label="Joined Date"
            value={formatDate(user.joining_date)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

/* =========================================
   PROFILE FIELD COMPONENT
========================================= */

const ProfileField = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        {React.cloneElement(icon, {
          className: "h-4 w-4 text-muted-foreground",
        })}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>

        <p className="mt-0.5 break-words text-sm font-medium">
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
};

/* =========================================
   DATE FORMATTER
========================================= */

const formatDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default ProfileCard;
