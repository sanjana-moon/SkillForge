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
        <div className="min-h-screen flex items-center justify-center bg-[#1C2E24] px-4 py-12">
            <Card className="w-full container md:max-w-3xl rounded-3xl border border-[#C5A059]/30 bg-[#3E5C4B] p-8 shadow-xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-[#EBE3D5]">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-[#EBE3D5]/70">
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
                        <Label className="font-medium text-[#EBE3D5]">
                            Email Address
                        </Label>

                        <Input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="mt-2 bg-[#1C2E24]/50 border-[#C5A059]/30 text-[#EBE3D5] placeholder:text-[#EBE3D5]/40"
                        />

                        <FieldError>{errors.email?.message}</FieldError>
                    </TextField>

                    {/* Password */}
                    <TextField isRequired isInvalid={!!errors.password}>
                        <Label className="font-medium text-[#EBE3D5]">
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
                            className="mt-2 bg-[#1C2E24]/50 border-[#C5A059]/30 text-[#EBE3D5] placeholder:text-[#EBE3D5]/40"
                        />

                        <Description className="text-[#EBE3D5]/60">
                            Password must contain at least 8 characters.
                        </Description>

                        <FieldError>{errors.password?.message}</FieldError>
                    </TextField>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="mt-2 w-full rounded-md bg-[#C5A059] py-6 text-base font-semibold text-[#1C2E24] transition hover:bg-[#C5A059]/80"
                    >
                        <IoLogInOutline className="mr-2 text-xl" />
                        Sign In
                    </Button>
                </Form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#C5A059]/20" />
                    <span className="text-sm font-medium text-[#EBE3D5]/40">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-[#C5A059]/20" />
                </div>

                {/* Google Sign In */}
                <Button
                    onClick={handleGoogleLogin}
                    className="w-full rounded-md border border-[#C5A059]/30 py-6 text-[#EBE3D5] hover:bg-[#1C2E24]/50"
                >
                    <FaGoogle className="mr-2 text-lg text-[#C5A059]" />
                    Continue with Google
                </Button>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-[#EBE3D5]/60">
                    Don't have an account yet?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-[#C5A059] hover:text-[#C5A059]/80 hover:underline"
                    >
                        Create an Account
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default SigninPage;