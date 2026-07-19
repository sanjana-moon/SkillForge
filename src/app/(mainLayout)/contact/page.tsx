"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Card,
    Button,
    Input,
    TextArea,
    Chip,
} from "@heroui/react";
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaClock,
    FaPaperPlane,
    FaCheckCircle,
    FaGithub,
    FaTwitter,
    FaLinkedin,
    FaYoutube,
} from "react-icons/fa";
import { toast } from "react-toastify";

const ContactClient = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }
        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            toast.success("Message sent successfully! We'll get back to you soon.");
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: <FaEnvelope className="text-xl" />,
            label: "Email",
            value: "support@skillforge.com",
            href: "mailto:support@skillforge.com",
        },
        {
            icon: <FaPhone className="text-xl" />,
            label: "Phone",
            value: "+1 (555) 123-4567",
            href: "tel:+15551234567",
        },
        {
            icon: <FaMapMarkerAlt className="text-xl" />,
            label: "Location",
            value: "San Francisco, CA",
            href: "#",
        },
        {
            icon: <FaClock className="text-xl" />,
            label: "Working Hours",
            value: "Mon - Fri, 9:00 AM - 6:00 PM",
            href: "#",
        },
    ];

    const socialLinks = [
        {
            icon: <FaGithub className="text-xl" />,
            label: "GitHub",
            href: "https://github.com/skillforge",
            color: "hover:text-[#EDEFF5]",
        },
        {
            icon: <FaTwitter className="text-xl" />,
            label: "Twitter",
            href: "https://twitter.com/skillforge",
            color: "hover:text-[#1DA1F2]",
        },
        {
            icon: <FaLinkedin className="text-xl" />,
            label: "LinkedIn",
            href: "https://linkedin.com/company/skillforge",
            color: "hover:text-[#0A66C2]",
        },
        {
            icon: <FaYoutube className="text-xl" />,
            label: "YouTube",
            href: "https://youtube.com/@skillforge",
            color: "hover:text-[#FF0000]",
        },
    ];

    return (
        <div className="min-h-screen bg-[#10182B]">
            <div className="container mx-auto px-4 py-10 md:py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-[#EDEFF5]">
                        Get in Touch
                    </h1>
                    <p className="text-[#EDEFF5]/60 mt-4 max-w-2xl mx-auto text-base md:text-lg">
                        Have questions, feedback, or need support? We'd love to hear from you.
                        Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-[#EDEFF5] mb-6">
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[#A78BFA]/10 flex items-center justify-center text-[#A78BFA] flex-shrink-0">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <p className="text-[#EDEFF5]/50 text-sm">
                                                {info.label}
                                            </p>
                                            {info.href && info.href !== "#" ? (
                                                <a
                                                    href={info.href}
                                                    className="text-[#EDEFF5] hover:text-[#A78BFA] transition-colors font-medium"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-[#EDEFF5] font-medium">
                                                    {info.value}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="mt-8 pt-8 border-t border-[#A78BFA]/10">
                                <h3 className="text-sm font-medium text-[#EDEFF5]/50 mb-4">
                                    Connect With Us
                                </h3>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-12 h-12 rounded-xl bg-[#10182B] flex items-center justify-center text-[#EDEFF5]/40 ${social.color} transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#A78BFA]/5 border border-[#A78BFA]/10 hover:border-[#A78BFA]/30`}
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-6 p-4 bg-[#10182B] rounded-xl border border-[#A78BFA]/10">
                                <div className="flex items-center gap-3">
                                    <FaCheckCircle className="text-green-400 text-lg" />
                                    <p className="text-sm text-[#EDEFF5]/60">
                                        We typically respond within 24 hours
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2"
                    >
                        <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[#EDEFF5] text-sm font-medium mb-2">
                                            Full Name *
                                        </label>
                                        <Input
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#EDEFF5] text-sm font-medium mb-2">
                                            Email Address *
                                        </label>
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-[#EDEFF5] text-sm font-medium mb-2">
                                        Subject *
                                    </label>
                                    <Input
                                        name="subject"
                                        placeholder="What is this about?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-[#EDEFF5] text-sm font-medium mb-2">
                                        Message *
                                    </label>
                                    <TextArea
                                        name="message"
                                        placeholder="Tell us how we can help you..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                    />
                                    <p className="text-[#EDEFF5]/40 text-xs mt-1">
                                        Minimum 10 characters
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-[#A78BFA] text-[#10182B] font-semibold py-6 rounded-xl hover:bg-[#A78BFA]/80 transition-all text-base"
                                >
                                    <FaPaperPlane className="mr-2" />
                                    {loading ? "Sending..." : "Send Message"}
                                </Button>

                                {/* Form footer */}
                                <p className="text-[#EDEFF5]/30 text-xs text-center">
                                    By submitting this form, you agree to our Privacy Policy.
                                    We'll never share your information with third parties.
                                </p>
                            </form>
                        </Card>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-[#EDEFF5] text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                question: "How do I enroll in a course?",
                                answer: "Simply browse our course catalog, select a course you're interested in, and click the 'Enroll Now' button. You'll be guided through the payment process.",
                            },
                            {
                                question: "What payment methods do you accept?",
                                answer: "We accept all major credit cards (Visa, Mastercard, American Express) and debit cards through our secure Stripe payment processor.",
                            },
                            {
                                question: "Can I get a refund?",
                                answer: "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied, contact our support team for a full refund.",
                            },
                            {
                                question: "How long do I have access to a course?",
                                answer: "Once enrolled, you have lifetime access to the course materials, including all future updates and additional content.",
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                            >
                                <Card className="bg-[#1C2740] border border-[#A78BFA]/10 hover:border-[#A78BFA]/30 rounded-2xl p-6 transition-all duration-300">
                                    <h3 className="text-[#EDEFF5] font-semibold mb-2">
                                        {faq.question}
                                    </h3>
                                    <p className="text-[#EDEFF5]/60 text-sm leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactClient;