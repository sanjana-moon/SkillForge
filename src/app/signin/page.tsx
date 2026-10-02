"use client";

import { useEffect } from "react";

import { authClient } from "@/lib/auth-client";
import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";

import { FaGoogle } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";

import { toast } from "react-toastify";

type LoginForm = {
    email: string;
    password: string;
};

const SigninPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    // ── Detect return from Google OAuth on THIS page ──
    const { data: session } = authClient.useSession();

    useEffect(() => {
        if (searchParams.get("social") === "success" && session?.user) {
            toast.success("Welcome back to SkillForge!");
            router.replace("/");
        }
    }, [searchParams, session, router]);
    // ─────────────────────────────────────────────────

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        try {
            const { error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (error) {
                toast.error(error.message || "Signin failed.");
                return;
            }

            toast.success("Welcome back to SkillForge!");
            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/signin?social=success", // ← back to THIS page
            });
        } catch (error) {
            console.error(error);
            toast.error("Google Sign In failed.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] px-4 py-12">
            <Card className="w-full container md:max-w-3xl rounded-3xl border border-[#0E7CC9]/30 bg-[#FBF8FD] p-8 shadow-xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-[#4B4B5A]">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-[#4B4B5A]/70">
                        Sign in to your SkillForge account and <br />
                        continue crafting and elevating your ideas.
                    </p>
                </div>

                {/* Login Form */}
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    {/* Email */}
                    <TextField isRequired isInvalid={!!errors.email}>
                        <Label className="font-medium text-[#4B4B5A]">
                            Email Address
                        </Label>

                        <Input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="mt-2 bg-[#FFFFFF]/50 border-[#0E7CC9]/30 text-[#4B4B5A] placeholder:text-[#4B4B5A]/40"
                        />

                        <FieldError>{errors.email?.message}</FieldError>
                    </TextField>

                    {/* Password */}
                    <TextField isRequired isInvalid={!!errors.password}>
                        <Label className="font-medium text-[#4B4B5A]">
                            Password
                        </Label>

                        <Input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters.",
                                },
                            })}
                            className="mt-2 bg-[#FFFFFF]/50 border-[#0E7CC9]/30 text-[#4B4B5A] placeholder:text-[#4B4B5A]/40"
                        />

                        <Description className="text-[#4B4B5A]/60">
                            Password must contain at least 8 characters.
                        </Description>

                        <FieldError>{errors.password?.message}</FieldError>
                    </TextField>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="mt-2 w-full rounded-md bg-[image:var(--brand-gradient)] py-6 text-base font-semibold text-[#FFFFFF] transition hover:opacity-90"
                    >
                        <IoLogInOutline className="mr-2 text-xl" />
                        Sign In
                    </Button>
                </Form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#0E7CC9]/20" />
                    <span className="text-sm font-medium text-[#4B4B5A]/40">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-[#0E7CC9]/20" />
                </div>

                {/* Google Sign In */}
                <Button
                    onClick={handleGoogleLogin}
                    className="w-full rounded-md border border-[#0E7CC9]/30 py-6 text-[#4B4B5A] hover:bg-[#FFFFFF]/50"
                >
                    <FaGoogle className="mr-2 text-lg text-[#0E7CC9]" />
                    Continue with Google
                </Button>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-[#4B4B5A]/60">
                    Don't have an account yet?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-[#0E7CC9] hover:text-[#0E7CC9]/80 hover:underline"
                    >
                        Create an Account
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default SigninPage;