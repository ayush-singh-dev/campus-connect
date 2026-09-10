import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  User,
  GraduationCap,
  MapPin,
  Mail,
  Calendar,
  Award,
  Plus,
  Trash2,
  Save,
  X,
  Pencil,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useUserProfile } from "@/hooks/useUserProfile";

import supabaseClient from "@/utils/supabase";

const SettingsTab = () => {
  const { user, isStudent, loading: profileLoading } = useUserProfile();
  const { getToken } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    college: "",
    department: "",
    degree: "",
    specialization: "",
    location: "",
    joining_date: "",
    profile_image: "",
    achievements: [],
  });

  /*
   * Load current profile data
   */
  useEffect(() => {
    if (!user) return;

    setProfile({
      full_name: user.full_name || "",
      email: user.email || "",
      college: user.college || "",
      department: user.department || "",
      degree: user.degree || "",
      specialization: user.specialization || "",
      location: user.location || "",
      joining_date: user.joining_date || "",
      profile_image: user.profile_image || "",
      achievements: Array.isArray(user.achievements) ? user.achievements : [],
    });
  }, [user]);

  /*
   * Update a normal profile field
   */
  const handleInputChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
   * Add new achievement
   */
  const addAchievement = () => {
    setProfile((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""],
    }));
  };

  /*
   * Update achievement
   */
  const updateAchievement = (index, value) => {
    setProfile((prev) => {
      const updatedAchievements = [...prev.achievements];

      updatedAchievements[index] = value;

      return {
        ...prev,
        achievements: updatedAchievements,
      };
    });
  };

  /*
   * Remove achievement
   */
  const removeAchievement = (index) => {
    setProfile((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  /*
   * Cancel editing
   *
   * Restore values from the actual user profile.
   */
  const handleCancel = () => {
    if (!user) return;

    setProfile({
      full_name: user.full_name || "",
      email: user.email || "",
      college: user.college || "",
      department: user.department || "",
      degree: user.degree || "",
      specialization: user.specialization || "",
      location: user.location || "",
      joining_date: user.joining_date || "",
      profile_image: user.profile_image || "",
      achievements: Array.isArray(user.achievements) ? user.achievements : [],
    });

    setIsEditing(false);
  };

  /*
   * Save profile
   */
  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);

      const token = await getToken();

      const supabase = await supabaseClient(token);

      /*
       * Remove empty achievements
       */
      const cleanedAchievements = profile.achievements
        .map((achievement) => achievement.trim())
        .filter(Boolean);

      const { error } = await supabase
        .from("users")
        .update({
          full_name: profile.full_name.trim(),
          college: profile.college.trim(),
          department: profile.department.trim(),
          degree: profile.degree.trim(),
          specialization: profile.specialization.trim(),
          location: profile.location.trim(),
          joining_date: profile.joining_date || null,
          achievements: cleanedAchievements,
        })
        .eq("user_id", user.user_id);

      if (error) {
        console.error("Profile update error:", error);

        alert("Failed to update profile.");

        return;
      }

      /*
       * Update local state as well
       */
      setProfile((prev) => ({
        ...prev,
        achievements: cleanedAchievements,
      }));

      setIsEditing(false);

      /*
       * Reload so useUserProfile() gets the
       * latest values from Supabase.
       */
      window.location.reload();
    } catch (error) {
      console.error("Error saving profile:", error);

      alert("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  /*
   * Loading
   */
  if (profileLoading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading profile settings...
        </CardContent>
      </Card>
    );
  }

  /*
   * Student access
   */
  if (!isStudent) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">
            You don't have access to profile settings.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {/* =========================================
          HEADER
      ========================================= */}
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Profile Settings</h3>

            <p className="text-sm text-muted-foreground">
              Manage your profile information, academic details and
              achievements.
            </p>
          </div>

          {/* Edit button */}
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* =========================================
            PERSONAL INFORMATION
        ========================================= */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />

            <div>
              <h4 className="font-semibold">Personal Information</h4>

              <p className="text-sm text-muted-foreground">
                Your basic profile information.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>

              <Input
                id="full_name"
                value={profile.full_name}
                disabled={!isEditing}
                placeholder="Enter your full name"
                onChange={(e) => handleInputChange("full_name", e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  value={profile.email}
                  disabled
                  className="pl-9"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Email is managed by your account.
              </p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="location"
                  value={profile.location}
                  disabled={!isEditing}
                  placeholder="e.g. Haridwar, Uttarakhand"
                  className="pl-9"
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* =========================================
            ACADEMIC INFORMATION
        ========================================= */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />

            <div>
              <h4 className="font-semibold">Academic Information</h4>

              <p className="text-sm text-muted-foreground">
                Information about your education.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* College */}
            <div className="space-y-2">
              <Label htmlFor="college">College / University</Label>

              <Input
                id="college"
                value={profile.college}
                disabled={!isEditing}
                placeholder="Enter your college"
                onChange={(e) => handleInputChange("college", e.target.value)}
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>

              <Input
                id="department"
                value={profile.department}
                disabled={!isEditing}
                placeholder="e.g. Computer Science"
                onChange={(e) =>
                  handleInputChange("department", e.target.value)
                }
              />
            </div>

            {/* Degree */}
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>

              <Input
                id="degree"
                value={profile.degree}
                disabled={!isEditing}
                placeholder="e.g. B.Tech"
                onChange={(e) => handleInputChange("degree", e.target.value)}
              />
            </div>

            {/* Specialization */}
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>

              <Input
                id="specialization"
                value={profile.specialization}
                disabled={!isEditing}
                placeholder="e.g. AI & Machine Learning"
                onChange={(e) =>
                  handleInputChange("specialization", e.target.value)
                }
              />
            </div>

            {/* Joining Date */}
            <div className="space-y-2">
              <Label htmlFor="joining_date">Joining Date</Label>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="joining_date"
                  type="date"
                  value={profile.joining_date || ""}
                  disabled={!isEditing}
                  className="pl-9"
                  onChange={(e) =>
                    handleInputChange("joining_date", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* =========================================
            ACHIEVEMENTS
        ========================================= */}
        <section className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />

              <div>
                <h4 className="font-semibold">Achievements</h4>

                <p className="text-sm text-muted-foreground">
                  Add your academic and extracurricular achievements.
                </p>
              </div>
            </div>

            {isEditing && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAchievement}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {profile.achievements.length === 0 ? (
              <div className="rounded-lg border border-dashed p-6 text-center">
                <Award className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />

                <p className="text-sm text-muted-foreground">
                  No achievements added yet.
                </p>

                {isEditing && (
                  <Button type="button" variant="link" onClick={addAchievement}>
                    Add your first achievement
                  </Button>
                )}
              </div>
            ) : (
              profile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>

                  <Input
                    value={achievement}
                    disabled={!isEditing}
                    placeholder="e.g. Winner of Hackathon"
                    onChange={(e) => updateAchievement(index, e.target.value)}
                  />

                  {isEditing && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeAchievement(index)}
                      title="Remove achievement"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* =========================================
            SAVE / CANCEL
        ========================================= */}
        {isEditing && (
          <>
            <Separator />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={saving}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="gap-2"
              >
                <Save className="h-4 w-4" />

                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
