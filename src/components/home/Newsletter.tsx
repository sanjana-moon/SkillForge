"use client";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { FaPaperPlane } from "react-icons/fa6";

type NewsletterForm = {
    email: string;
};

export default function Newsletter() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewsletterForm>();

    const onSubmit: SubmitHandler<NewsletterForm> = (data) => {
        toast.success(`Subscribed successfully with: ${data.email}`);
        reset();
    };

    return (
        <section className="relative border-t border-[#0E7CC9]/10 bg-[#FFFFFF] py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl border border-[#0E7CC9]/20 bg-[#FBF8FD] shadow-2xl">
                    {/* Ambient background glows */}
                    <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#0E7CC9]/10 blur-[100px]" />
                    <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 translate-y-1/2 -translate-x-1/2 rounded-full bg-[#7A56CE]/10 blur-[100px]" />

                    {/* Two-column layout */}
                    <div className="relative z-10 grid grid-cols-1 items-center gap-10 px-8 py-12 sm:px-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-16">
                        {/* Image side */}
                        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                            {/* Accent glow behind image */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[#0E7CC9]/20 blur-3xl" />

                            {/* Slightly rounded frame with side fade */}
                            <div className="relative mx-auto aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-2xl">
                                {/* The image itself, fading to the right */}
                                <Image
                                    src="https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Newsletter illustration"
                                    fill
                                    sizes="(max-width: 1024px) 420px, 480px"
                                    className="object-cover"
                                    style={{
                                        WebkitMaskImage:
                                            "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
                                        maskImage:
                                            "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
                                    }}
                                    unoptimized
                                />

                                {/* Fade into the card background on the right edge */}
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 w-1/2"
                                    style={{
                                        background:
                                            "linear-gradient(to right, transparent, #FBF8FD 90%)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Content side */}
                        <div className="text-center lg:text-left">
                            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#4B4B5A] sm:text-4xl">
                                Stay Updated on Tech &amp; AI
                            </h2>

                            <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-[#4B4B5A]/70 lg:mx-0">
                                Subscribe to our newsletter to receive the
                                latest roadmap templates, new course
                                announcements, and expert AI tutorial links
                                directly in your inbox.
                            </p>

                            {/* Newsletter Form */}
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 lg:mx-0 sm:flex-row"
                            >
                                <div className="flex flex-grow flex-col items-start">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        {...register("email", {
                                            required:
                                                "Email address is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message:
                                                    "Please enter a valid email address",
                                            },
                                        })}
                                        className="w-full rounded-xl border border-[#0E7CC9]/20 bg-[#FFFFFF]/60 px-4 py-3 text-sm text-[#4B4B5A] placeholder-[#4B4B5A]/40 outline-none transition duration-200 focus:border-[#0E7CC9]"
                                    />

                                    {errors.email && (
                                        <span className="mt-1 pl-1 text-xs text-red-400">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#0E7CC9] to-[#7A56CE] px-6 py-3.5 text-sm font-bold text-[#FFFFFF] shadow-md shadow-[#0E7CC9]/20 transition duration-200 hover:opacity-95 sm:py-3 self-stretch sm:self-start"
                                >
                                    <FaPaperPlane className="text-xs" />
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}