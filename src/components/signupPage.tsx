"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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
    role: "student" | "instructor";
    image: FileList;
};

export default function SignUpPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();

    // ── Social login toast (fires only after Google redirects back) ──
    const { data: session } = authClient.useSession();

    useEffect(() => {
        if (searchParams.get("social") === "success" && session?.user) {
            toast.success("Logged in successfully.");
            router.replace("/");
        }
    }, [searchParams, session, router]);
    // ─────────────────────────────────────────────────────────────────

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
                callbackURL: "/signup?social=success", // ← back to /signup
            });
            // No toast here — user hasn't logged in yet.
        } catch {
            toast.error("Google Sign In failed.");
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
            <Card className="w-full container md:max-w-4xl rounded-3xl shadow-xl p-8 border border-teal/30 bg-white">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-navy">
                        Create Your Account
                    </h1>
                    <p className="mt-2 text-navy/70">
                        AI-assisted workspace to craft and elevate your ideas.
                    </p>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <TextField>
                        <Label className="text-navy font-medium">
                            Full Name
                        </Label>
                        <Input
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                            className="mt-2 bg-white/50 border-teal/30 text-navy"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </TextField>

                    <TextField>
                        <Label className="text-navy font-medium">
                            Profile Photo
                        </Label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", {
                                required: "Please upload a profile image",
                            })}
                            className="mt-2 w-full rounded-md border-2 border-dashed border-teal/50 bg-white/50 p-3 text-navy file:mr-4 file:rounded-lg file:border-0 file:bg-[image:var(--brand-gradient)] file:px-4 file:py-2 file:text-white hover:file:bg-teal/80"
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.image.message}
                            </p>
                        )}
                    </TextField>

                    <TextField>
                        <Label className="text-navy font-medium">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="mt-2 bg-white/50 border-teal/30 text-navy"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.email.message}
                            </p>
                        )}
                    </TextField>

                    <TextField>
                        <Label className="text-navy font-medium">
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
                            className="mt-2 bg-white/50 border-teal/30 text-navy"
                        />
                        <Description className="text-navy/60">
                            Password must contain at least 8 characters.
                        </Description>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.password.message}
                            </p>
                        )}
                    </TextField>

                    <TextField>
                        <Label className="text-navy font-medium">
                            Select Your Role
                        </Label>
                        <div className="mt-3 grid grid-cols-2 gap-4">
                            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-teal/30 p-4 transition hover:border-teal hover:bg-white/30">
                                <input
                                    type="radio"
                                    value="student"
                                    defaultChecked
                                    {...register("role", {
                                        required: "Please select a role",
                                    })}
                                    className="accent-teal"
                                />
                                <div>
                                    <p className="font-semibold text-navy">
                                        Learner
                                    </p>
                                    <p className="text-sm text-navy/60">
                                        Explore courses, learn new skills.
                                    </p>
                                </div>
                            </label>

                            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-teal/30 p-4 transition hover:border-teal hover:bg-white/30">
                                <input
                                    type="radio"
                                    value="instructor"
                                    {...register("role", {
                                        required: "Please select a role",
                                    })}
                                    className="accent-teal"
                                />
                                <div>
                                    <p className="font-semibold text-navy">
                                        Instructor
                                    </p>
                                    <p className="text-sm text-navy/60">
                                        Create and manage courses.
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

                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="mt-4 w-full rounded-md bg-[image:var(--brand-gradient)] py-6 text-base font-semibold text-white transition hover:opacity-90"
                    >
                        <IoMdCheckmarkCircleOutline className="mr-2 text-xl" />
                        {loading ? "Creating account..." : "Create Account"}
                    </Button>
                </Form>

                <div className="my-4 flex items-center gap-2">
                    <div className="h-px flex-1 bg-teal/20" />
                    <span className="text-sm text-navy/40">OR</span>
                    <div className="h-px flex-1 bg-teal/20" />
                </div>

                <Button
                    onClick={handleGoogleSignin}
                    className="w-full rounded-md border border-teal/30 py-6 text-white! hover:text-teal! hover:bg-white/50"
                >
                    <FaGoogle className="mr-2 text-lg" />
                    Continue with Google
                </Button>

                <p className="mt-1 text-center text-sm text-navy/60">
                    Already have an account?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold text-teal! hover:text-teal/80! hover:underline"
                    >
                        Signin
                    </Link>
                </p>
            </Card>
        </div>
    );
}