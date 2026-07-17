"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

import { Button, Card, Form, Input, Label, TextField, Description, } from "@heroui/react";

import { FaGoogle } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { uploadImage } from "@/components/utils/uploadImage";

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    role: "learner" | "instructor";
    image: FileList;
};

const SignUpPage = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();

    const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
        try {
            setLoading(true);

            if (!data.image?.length) {
                toast.error("Please upload a profile picture.");
                return;
            }

            const imageFile = data.image[0];

            const imageUrl = await uploadImage(imageFile);

            const { error } = await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
                image: imageUrl,
                role: data.role,
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Welcome to SkillForge!");

            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
            });

            toast.success("Logged in successfully.");
        } catch {
            toast.error("Google Sign In failed.");
        }
    };

    return (
        <div className="min-h-screen bg-[#10182B] flex items-center justify-center px-4 py-10">
            <Card className="w-full container md:max-w-4xl rounded-3xl shadow-xl p-8 border border-[#A78BFA]/30 bg-[#1C2740]">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-[#EDEFF5]">
                        Create Your Account
                    </h1>

                    <p className="mt-2 text-[#EDEFF5]/70">
                        AI-assisted workspace to craft and elevate your ideas.
                    </p>
                </div>

                {/* Form */}
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Full Name */}
                    <TextField>
                        <Label className="text-[#EDEFF5] font-medium">
                            Full Name
                        </Label>

                        <Input
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                            className="mt-2 bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5]"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </TextField>

                    {/* Profile Image */}
                    <TextField>
                        <Label className="text-[#EDEFF5] font-medium">
                            Profile Photo
                        </Label>

                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", {
                                required: "Please upload a profile image",
                            })}
                            className="mt-2 w-full rounded-md border-2 border-dashed border-[#A78BFA]/50 bg-[#10182B]/50 p-3 text-[#EDEFF5] file:mr-4 file:rounded-lg file:border-0 file:bg-[#A78BFA] file:px-4 file:py-2 file:text-[#10182B] hover:file:bg-[#A78BFA]/80"
                        />

                        {errors.image && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.image.message}
                            </p>
                        )}
                    </TextField>

                    {/* Email */}
                    <TextField>
                        <Label className="text-[#EDEFF5] font-medium">
                            Email Address
                        </Label>

                        <Input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="mt-2 bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5]"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.email.message}
                            </p>
                        )}
                    </TextField>

                    {/* Password */}
                    <TextField>
                        <Label className="text-[#EDEFF5] font-medium">
                            Password
                        </Label>

                        <Input
                            type="password"
                            placeholder="Create a password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                            })}
                            className="mt-2 bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5]"
                        />

                        <Description className="text-[#EDEFF5]/60">
                            Password must contain at least 8 characters.
                        </Description>

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.password.message}
                            </p>
                        )}
                    </TextField>

                    {/* Role Selection */}
                    <TextField>
                        <Label className="text-[#EDEFF5] font-medium">
                            Select Your Role
                        </Label>

                        <div className="mt-3 grid grid-cols-2 gap-4">
                            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-[#A78BFA]/30 p-4 transition hover:border-[#A78BFA] hover:bg-[#10182B]/30">
                                <input
                                    type="radio"
                                    value="learner"
                                    defaultChecked
                                    {...register("role", {
                                        required: "Please select a role",
                                    })}
                                    className="accent-[#A78BFA]"
                                />

                                <div>
                                    <p className="font-semibold text-[#EDEFF5]">
                                        Learner
                                    </p>
                                    <p className="text-sm text-[#EDEFF5]/60">
                                        Explore courses, learn new skills, and get AI-powered recommendations.
                                    </p>
                                </div>
                            </label>

                            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-[#A78BFA]/30 p-4 transition hover:border-[#A78BFA] hover:bg-[#10182B]/30">
                                <input
                                    type="radio"
                                    value="instructor"
                                    {...register("role", {
                                        required: "Please select a role",
                                    })}
                                    className="accent-[#A78BFA]"
                                />

                                <div>
                                    <p className="font-semibold text-[#EDEFF5]">
                                        Instructor
                                    </p>
                                    <p className="text-sm text-[#EDEFF5]/60">
                                        Create, publish, and manage your technology courses.
                                    </p>
                                </div>
                            </label>
                        </div>

                        {errors.role && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.role.message}
                            </p>
                        )}
                    </TextField>

                    {/* Create Account Button */}
                    <Button
                        type="submit"
                        className="mt-4 w-full rounded-md bg-[#A78BFA] py-6 text-base font-semibold text-[#10182B] transition hover:bg-[#A78BFA]/80"
                    >
                        <IoMdCheckmarkCircleOutline className="mr-2 text-xl" />
                        Create Account
                    </Button>
                </Form>

                {/* Divider */}
                <div className="my-4 flex items-center gap-2">
                    <div className="h-px flex-1 bg-[#A78BFA]/20" />
                    <span className="text-sm text-[#EDEFF5]/40">OR</span>
                    <div className="h-px flex-1 bg-[#A78BFA]/20" />
                </div>

                {/* Google Sign In */}
                <Button
                    onClick={handleGoogleSignin}
                    className="w-full rounded-md border border-[#A78BFA]/30 py-6 text-[#EDEFF5] hover:bg-[#10182B]/50"
                >
                    <FaGoogle className="mr-2 text-lg" />
                    Continue with Google
                </Button>

                {/* Login Link */}
                <p className="mt-1 text-center text-sm text-[#EDEFF5]/60">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-[#A78BFA] hover:text-[#A78BFA]/80"
                    >
                        Login
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default SignUpPage;