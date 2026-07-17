"use client";

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
    <section className="py-20 bg-[#10182B] relative border-t border-[#A78BFA]/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#1C2740] border border-[#A78BFA]/20 px-8 py-12 sm:px-16 sm:py-16 shadow-2xl text-center flex flex-col items-center">
          {/* Subtle backgrounds inside the callout */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-[#A78BFA]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-[#4FD1C5]/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Heading */}
          <h2 className="text-3xl font-bold font-heading text-[#EDEFF5] tracking-tight sm:text-4xl">
            Stay Updated on Tech & AI
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#EDEFF5]/70 font-body leading-relaxed">
            Subscribe to our newsletter to receive the latest roadmap templates, new course announcements, and expert AI tutorial links directly in your inbox.
          </p>

          {/* Newsletter Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 w-full max-w-md flex flex-col sm:flex-row gap-3 relative z-10"
          >
            <div className="flex-grow flex flex-col items-start">
              <input
                type="email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                className="w-full rounded-xl bg-[#10182B]/60 border border-[#A78BFA]/20 focus:border-[#A78BFA] px-4 py-3 text-sm text-[#EDEFF5] placeholder-[#EDEFF5]/40 outline-none transition duration-200"
              />
              {errors.email && (
                <span className="mt-1 text-xs text-red-400 pl-1">{errors.email.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:opacity-95 text-[#10182B] text-sm font-bold px-6 py-3.5 sm:py-3 transition duration-200 shadow-md shadow-[#A78BFA]/20 self-stretch sm:self-start whitespace-nowrap"
            >
              <FaPaperPlane className="text-xs" />
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
