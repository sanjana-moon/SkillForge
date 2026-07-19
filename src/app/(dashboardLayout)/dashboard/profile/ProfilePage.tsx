"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    FaUser,
    FaEnvelope,
    FaUserTag,
    FaEdit,
    FaSave,
    FaTimes,
    FaCamera,
    FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { updateProfile } from "@/lib/api/courses/actions";
import { getProfile } from "@/lib/api/courses/data";
import type { AppUser } from "@/lib/api/courses/data";
import { Card, Button, Spinner } from "@heroui/react";

export default function ProfilePage() {
    const [profile, setProfile] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [editData, setEditData] = useState({
        name: "",
        profileImage: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getProfile();
            setProfile(data);
            setImageError(false);
        } catch (err) {
            console.error("Error loading profile:", err);
            setError(err instanceof Error ? err.message : "Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const startEditing = () => {
        if (profile) {
            setEditData({
                name: profile.name,
                profileImage: profile.profileImage || "",
            });
            setIsEditing(true);
            setError(null);
            setSuccessMessage(null);
        }
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditData({
            name: "",
            profileImage: "",
        });
        setError(null);
        setSuccessMessage(null);
    };

    // ✅ Fix: Use a regular async function without event parameter
    const handleUpdateProfile = async () => {
        try {
            setSaving(true);
            setError(null);
            setSuccessMessage(null);

            const result = await updateProfile(
                editData.name,
                editData.profileImage || undefined
            );

            if (result.success && result.data) {
                setProfile(result.data);
                setImageError(false);
                setIsEditing(false);
                setSuccessMessage("Profile updated successfully!");
                toast.success("Profile updated successfully!");

                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } else {
                setError(result.error || "Failed to update profile");
                toast.error(result.error || "Failed to update profile");
            }
        } catch (err) {
            console.error(err);
            const errorMsg = err instanceof Error ? err.message : "Failed to update profile.";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Spinner size="lg"/>
                <p className="mt-4 text-[#EDEFF5]/60">Loading profile...</p>
            </div>
        );
    }

    if (error && !profile) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <Card className="bg-[#1C2740] border border-red-500/20 rounded-2xl p-8 text-center">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold text-red-400 mb-2">
                        Unable to Load Profile
                    </h3>
                    <p className="text-[#EDEFF5]/60 mb-4">{error}</p>
                    <Button
                        onPress={loadProfile}
                        className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                    >
                        Try Again
                    </Button>
                </Card>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <Card className="bg-[#1C2740] border border-yellow-500/20 rounded-2xl p-8 text-center">
                    <div className="text-5xl mb-4">👤</div>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                        Profile Not Found
                    </h3>
                    <p className="text-[#EDEFF5]/60 mb-4">
                        We couldn't find your profile information.
                    </p>
                    <Button
                        onPress={loadProfile}
                        className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                    >
                        Try Again
                    </Button>
                </Card>
            </div>
        );
    }

    const initials = profile.name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="max-w-4xl mx-auto">
            <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-linear-to-r from-[#10182B] to-[#1C2740] p-10 text-center relative border-b border-[#A78BFA]/20">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#A78BFA] to-[#7C3AED]" />

                    {/* Avatar */}
                    <div className="relative inline-">
                        <div className="w-28 h-28 rounded-full mx-auto shadow-lg relative overflow-hidden border-4 border-[#A78BFA]">
                            {profile.profileImage && !imageError ? (
                                <Image
                                    src={profile.profileImage}
                                    alt={profile.name}
                                    fill
                                    className="object-cover"
                                    onError={() => setImageError(true)}
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#10182B] bg-linear-to-br from-[#A78BFA] to-[#7C3AED]">
                                    {initials}
                                </div>
                            )}
                        </div>

                        <button
                            className="absolute bottom-0 right-0 bg-[#A78BFA] p-2 rounded-full shadow-lg hover:bg-[#A78BFA]/80 transition-colors border-2 border-[#10182B]"
                            onClick={startEditing}
                            title="Change profile picture"
                            disabled={isEditing}
                        >
                            <FaCamera className="text-[#10182B] text-sm" />
                        </button>
                    </div>

                    {!isEditing ? (
                        <>
                            <h1 className="text-3xl font-bold text-[#EDEFF5] mt-5">
                                {profile.name}
                            </h1>
                            <p className="text-[#EDEFF5]/60 mt-2 flex items-center justify-center gap-2 capitalize">
                                <FaUserTag className="text-[#A78BFA]" />
                                SkillForge {profile.role}
                            </p>

                            <Button
                                onPress={startEditing}
                                className="mt-4 bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                            >
                                <FaEdit className="mr-2" />
                                Edit Profile
                            </Button>
                        </>
                    ) : (
                        <div className="mt-4">
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <Button
                                    onPress={handleUpdateProfile}

                                    className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                                >
                                    <FaSave className="mr-2" />
                                    Save Changes
                                </Button>
                                <Button
                                    onPress={cancelEditing}
                                    className="bg-[#10182B] border border-[#A78BFA]/30 text-[#EDEFF5] hover:bg-[#10182B]/80 font-semibold"
                                >
                                    <FaTimes className="mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mx-8 mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center flex items-center justify-center gap-2">
                        <FaCheckCircle />
                        {successMessage}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mx-8 mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
                        {error}
                    </div>
                )}

                {/* Profile Details */}
                <div className="p-8 space-y-6">
                    {!isEditing ? (
                        // View Mode
                        <>
                            <div className="space-y-2">
                                <label className=" font-semibold text-[#EDEFF5] text-sm flex items-center gap-2">
                                    <FaUser className="text-[#A78BFA]" />
                                    Full Name
                                </label>
                                <div className="w-full border border-[#A78BFA]/20 rounded-xl px-4 py-3 bg-[#10182B]/50 text-[#EDEFF5]">
                                    {profile.name}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className=" font-semibold text-[#EDEFF5] text-sm flex items-center gap-2">
                                    <FaEnvelope className="text-[#A78BFA]" />
                                    Email
                                </label>
                                <div className="w-full border border-[#A78BFA]/20 rounded-xl px-4 py-3 bg-[#10182B]/50 text-[#EDEFF5]">
                                    {profile.email}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className=" font-semibold text-[#EDEFF5] text-sm flex items-center gap-2">
                                    <FaUserTag className="text-[#A78BFA]" />
                                    Role
                                </label>
                                <div className="w-full border border-[#A78BFA]/20 rounded-xl px-4 py-3 bg-[#10182B]/50 text-[#EDEFF5] capitalize">
                                    {profile.role}
                                </div>
                            </div>

                            {profile.profileImage && (
                                <div className="space-y-2">
                                    <label className=" font-semibold text-[#EDEFF5] text-sm flex items-center gap-2">
                                        <FaCamera className="text-[#A78BFA]" />
                                        Profile Image
                                    </label>
                                    <div className="w-full border border-[#A78BFA]/20 rounded-xl px-4 py-3 bg-[#10182B]/50 text-[#EDEFF5]/60 text-sm break-all">
                                        {profile.profileImage}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        // Edit Mode - ✅ Removed form, using div instead
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className=" font-semibold text-[#EDEFF5] text-sm flex items-center gap-2">
                                    <FaUser className="text-[#A78BFA]" />
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    required
                                    className="w-full border border-[#A78BFA]/30 rounded-xl px-4 py-3 bg-[#10182B]/50 text-[#EDEFF5] focus:outline-none focus:ring-2 focus:ring-[#A78BFA] placeholder:text-[#EDEFF5]/40"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className=" font-semibold text-[#EDEFF5] text-sm flex items-center gap-2">
                                    <FaEnvelope className="text-[#A78BFA]" />
                                    Email
                                </label>
                                <div className="w-full border border-[#A78BFA]/20 rounded-xl px-4 py-3 bg-[#10182B]/30 text-[#EDEFF5]/60 cursor-not-allowed">
                                    {profile.email}
                                </div>
                                <p className="text-xs text-[#EDEFF5]/40 mt-1">
                                    Email cannot be changed.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className=" font-semibold text-[#EDEFF5] text-sm flex items-center gap-2">
                                    <FaUserTag className="text-[#A78BFA]" />
                                    Role
                                </label>
                                <div className="w-full border border-[#A78BFA]/20 rounded-xl px-4 py-3 bg-[#10182B]/30 text-[#EDEFF5]/60 capitalize cursor-not-allowed">
                                    {profile.role}
                                </div>
                                <p className="text-xs text-[#EDEFF5]/40 mt-1">
                                    Role cannot be changed.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className=" font-semibold text-[#EDEFF5] text-sm flex items-center gap-2">
                                    <FaCamera className="text-[#A78BFA]" />
                                    Profile Image URL
                                </label>
                                <input
                                    type="url"
                                    value={editData.profileImage}
                                    onChange={(e) => setEditData({ ...editData, profileImage: e.target.value })}
                                    className="w-full border border-[#A78BFA]/30 rounded-xl px-4 py-3 bg-[#10182B]/50 text-[#EDEFF5] focus:outline-none focus:ring-2 focus:ring-[#A78BFA] placeholder:text-[#EDEFF5]/40"
                                    placeholder="https://example.com/your-image.jpg"
                                />
                                <p className="text-xs text-[#EDEFF5]/40 mt-1">
                                    Enter a URL for your profile picture (optional)
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-4">
                                <Button
                                    onPress={handleUpdateProfile}

                                    className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                                >
                                    <FaSave className="mr-2" />
                                    Save Changes
                                </Button>
                                <Button
                                    onPress={cancelEditing}
                                    className="bg-[#10182B] border border-[#A78BFA]/30 text-[#EDEFF5] hover:bg-[#10182B]/80 font-semibold"
                                >
                                    <FaTimes className="mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}