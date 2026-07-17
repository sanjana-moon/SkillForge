"use client";

import { motion } from "motion/react";
import {
    Button,
    Input,
    TextArea,
} from "@heroui/react";

import {
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaPaperPlane,
} from "react-icons/fa";

export default function ContactSection() {
    return (
        <section className="relative overflow-hidden bg-white py-24">

            {/* Background Blur */}

            <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

            <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#0A2F1D]/10 blur-[130px]" />

            <div className="mx-auto max-w-7xl px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: .8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >

                    <p className="font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                        Contact Us
                    </p>

                    <h2 className="mt-4 text-5xl font-black text-[#0A2F1D]">
                        Let's Plan Something Amazing
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#12201B]/70">
                        Have questions or need assistance finding the perfect
                        venue? We'd love to hear from you. Send us a message and
                        our team will get back to you as soon as possible.
                    </p>

                </motion.div>

                <div className="mt-20 grid gap-12 lg:grid-cols-5">

                    {/* Left */}

                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: .8 }}
                        viewport={{ once: true }}
                        className="space-y-6 lg:col-span-2"
                    >

                        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#F8F6F2] p-6 shadow-lg">

                            <div className="flex items-center gap-4">

                                <div className="rounded-full bg-[#0A2F1D] p-4 text-white">
                                    <FaMapMarkerAlt />
                                </div>

                                <div>

                                    <h3 className="font-bold text-[#0A2F1D]">
                                        Address
                                    </h3>

                                    <p className="text-[#12201B]/70">
                                        Dhaka, Bangladesh
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#F8F6F2] p-6 shadow-lg">

                            <div className="flex items-center gap-4">

                                <div className="rounded-full bg-[#0A2F1D] p-4 text-white">
                                    <FaEnvelope />
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#0A2F1D]">
                                        Email
                                    </h3>
                                    <p className="text-[#12201B]/70">
                                        support@dreamvenue.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#F8F6F2] p-6 shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-[#0A2F1D] p-4 text-white">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#0A2F1D]">
                                        Phone
                                    </h3>
                                    <p className="text-[#12201B]/70">
                                        +880 1234-567890
                                    </p>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    {/* Right */}

                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: .8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >

                        <div className="rounded-[32px] border border-[#D4AF37]/20 bg-[#F8F6F2] p-10 shadow-xl">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Input
                                    placeholder="John Doe"
                                />

                                <Input
                                    type="email"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="mt-6">

                                <Input
                                    placeholder="How can we help you?"
                                />

                            </div>

                            <div className="mt-6">
                                <TextArea
                                className='w-full'
                                    placeholder="Write your message..."
                                    rows={6}
                                />
                            </div>

                            <Button
                                className="mt-8 bg-[#0A2F1D] px-8 text-white hover:bg-[#14452E]"
                            >
                                Send Message
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}