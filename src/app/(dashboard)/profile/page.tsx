"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import InputGroup from "@/components/InputGroup/InputGroup";
import Spinner from "@/components/Spinner/Spinner";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ProfileIcon from "@/assets/svgs/ProfileIcon";
import PhoneIcon from "@/assets/svgs/PhoneIcon";
import EmailIcon from "@/assets/svgs/EmailIcon";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { authFetch } from "@/lib/auth/authFetch";
import toast from "react-hot-toast";

interface Profile {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: string;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const dispatch = useAppDispatch();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Fetch profile
  useEffect(() => {
    if (!user?.id) return;

    async function fetchProfile() {
      try {
        const response = await authFetch("/api/user/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setName(data.name);
          setPhone(data.phone || "");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [user?.id]);

  const handleSave = async () => {
    setError("");

    if (!name.trim() || name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      setError("Phone must be a valid 10-digit number");
      return;
    }

    setIsSaving(true);

    try {
      const response = await authFetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone || null }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to update profile");
        setIsSaving(false);
        return;
      }

      // Update local state
      setProfile(result.user);
      setIsEditing(false);

      // Update Redux state so header reflects new name
      dispatch(
        setUser({
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role as "driver" | "host",
        })
      );

      toast.success("Profile updated!");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName(profile?.name || "");
    setPhone(profile?.phone || "");
    setError("");
    setIsEditing(false);
  };

  const dashboardLink = user?.role === "host" ? "/host" : "/driver";

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="#365314" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <section className="min-h-screen py-20 bg-[#FAFAFA]">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Back */}
            <button
              onClick={() => router.push(dashboardLink)}
              className="flex items-center gap-2 text-black-600 hover:text-black-900 mb-6"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>

            {/* Header */}
            <Typography variant="h2" weight={600} className="text-black-900 mb-6">
              My Profile
            </Typography>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E5E5] mb-6">
              {/* Avatar + Role */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E5E5E5]">
                <div className="w-16 h-16 bg-[#d9f99d] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#365314]">
                    {profile?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <Typography variant="h3" weight={600} className="text-black-900">
                    {profile?.name}
                  </Typography>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-3 py-1 bg-[#d9f99d] text-[#365314] text-xs font-medium rounded-full capitalize">
                      {profile?.role}
                    </span>
                    <Typography variant="chip" className="text-black-400">
                      Member since {memberSince}
                    </Typography>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <Typography variant="para" className="text-red-600">
                    {error}
                  </Typography>
                </div>
              )}

              {/* Fields */}
              <div className="flex flex-col gap-5">
                {/* Email (read-only) */}
                <div>
                  <Typography variant="chip" weight={500} className="text-black-700 mb-2 block">
                    Email
                  </Typography>
                  <div className="flex items-center gap-3 px-4 py-3.5 bg-[#F9F9F9] rounded-lg">
                    <EmailIcon stroke="currentColor" />
                    <Typography variant="para" className="text-black-600">
                      {profile?.email}
                    </Typography>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Typography variant="chip" weight={500} className="text-black-700 mb-2 block">
                    Name
                  </Typography>
                  {isEditing ? (
                    <InputGroup
                      placeholder="Full Name"
                      type="text"
                      Icon={ProfileIcon}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3.5 bg-[#F9F9F9] rounded-lg">
                      <ProfileIcon stroke="currentColor" />
                      <Typography variant="para" className="text-black-800">
                        {profile?.name}
                      </Typography>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Typography variant="chip" weight={500} className="text-black-700 mb-2 block">
                    Phone
                  </Typography>
                  {isEditing ? (
                    <InputGroup
                      placeholder="10-digit phone number"
                      type="tel"
                      Icon={PhoneIcon}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3.5 bg-[#F9F9F9] rounded-lg">
                      <PhoneIcon stroke="currentColor"/>
                      <Typography variant="para" className={profile?.phone ? "text-black-800" : "text-black-400"}>
                        {profile?.phone || "Not added yet"}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-[#E5E5E5]">
                {isEditing ? (
                  <>
                    <Button
                      text={isSaving ? "Saving..." : "Save Changes"}
                      bg="#d9f99d"
                      color="#101010"
                      hoverBg="#bef264"
                      variant="sm"
                      onClick={handleSave}
                      icon={isSaving ? <Spinner size="sm" color="#101010" /> : undefined}
                      iconPosition="left"
                    />
                    <Button
                      text="Cancel"
                      bg="#FFFFFF"
                      color="#365314"
                      hoverBg="#F9F9F9"
                      boxShadow="inset 0 0 0 1px #E5E5E5"
                      variant="sm"
                      onClick={handleCancel}
                    />
                  </>
                ) : (
                  <Button
                    text="Edit Profile"
                    bg="#d9f99d"
                    color="#101010"
                    hoverBg="#bef264"
                    variant="sm"
                    onClick={() => setIsEditing(true)}
                  />
                )}
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E5E5] mb-6">
              <Typography variant="h4" weight={600} className="text-black-900 mb-4">
                Security
              </Typography>
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="para" weight={500} className="text-black-800">
                    Password
                  </Typography>
                  <Typography variant="chip" className="text-black-500">
                    Change your account password
                  </Typography>
                </div>
                <Link href="/forgot-password">
                  <Button
                    text="Change Password"
                    bg="#FFFFFF"
                    color="#365314"
                    hoverBg="#F9F9F9"
                    boxShadow="inset 0 0 0 1px #E5E5E5"
                    variant="sm"
                  />
                </Link>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="para" weight={500} className="text-black-800">
                    Logout
                  </Typography>
                  <Typography variant="chip" className="text-black-500">
                    Sign out of your account
                  </Typography>
                </div>
                <Button
                  text="Logout"
                  bg="#FFFFFF"
                  color="#DC2626"
                  hoverBg="#FEE2E2"
                  boxShadow="inset 0 0 0 1px #E5E5E5"
                  variant="sm"
                  onClick={logout}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}