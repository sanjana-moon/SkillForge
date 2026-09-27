"use client";

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
import { useRouter } from "next/navigation";

import {
    SubmitHandler,
    useForm,
} from "react-hook-form";

import { FaGoogle } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";

import { toast } from "react-toastify";

type LoginForm = {
    email: string;
    password: string;
};

const SigninPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        try {
            const { error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (error) {
                toast.error(
                    error.message ||
                    "Signin failed."
                );
                return;
            }
            toast.success(
                "Welcome back to SkillForge!"
            );

            router.push("/");
        } catch (error) {
            console.error(error);

            toast.error(
                "Something went wrong."
            );
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            toast.success(
                "Google Sign In successful."
            );
        } catch (error) {
            console.error(error);

            toast.error(
                "Google Sign In failed."
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F8F5] px-4 py-12">
            <Card className="w-full container md:max-w-3xl rounded-3xl border border-[#7BAE9B]/30 bg-[#DCEBE4] p-8 shadow-xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-[#263A33]">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-[#263A33]/70">
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
                    <TextField
                        isRequired
                        isInvalid={!!errors.email}
                    >
                        <Label className="font-medium text-[#263A33]">
                            Email Address
                        </Label>

                        <Input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="mt-2 bg-[#F5F8F5]/50 border-[#7BAE9B]/30 text-[#263A33] placeholder:text-[#263A33]/40"
                        />

                        <FieldError>
                            {errors.email?.message}
                        </FieldError>
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        isInvalid={!!errors.password}
                    >
                        <Label className="font-medium text-[#263A33]">
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
                            className="mt-2 bg-[#F5F8F5]/50 border-[#7BAE9B]/30 text-[#263A33] placeholder:text-[#263A33]/40"
                        />

                        <Description className="text-[#263A33]/60">
                            Password must contain at least 8 characters.
                        </Description>

                        <FieldError>
                            {errors.password?.message}
                        </FieldError>
                    </TextField>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="mt-2 w-full rounded-md bg-[#7BAE9B] py-6 text-base font-semibold text-[#F5F8F5] transition hover:bg-[#7BAE9B]/80"
                    >
                        <IoLogInOutline className="mr-2 text-xl" />
                        Sign In
                    </Button>
                </Form>
                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#7BAE9B]/20" />
                    <span className="text-sm font-medium text-[#263A33]/40">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-[#7BAE9B]/20" />
                </div>

                {/* Google Sign In */}
                <Button
                    onClick={handleGoogleLogin}
                    className="w-full rounded-md border border-[#7BAE9B]/30 py-6 text-[#263A33] hover:bg-[#F5F8F5]/50"
                >
                    <FaGoogle className="mr-2 text-lg text-[#7BAE9B]" />
                    Continue with Google
                </Button>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-[#263A33]/60">
                    Don't have an account yet?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-[#7BAE9B] hover:text-[#7BAE9B]/80 hover:underline"
                    >
                        Create an Account
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default SigninPage;