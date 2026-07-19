"use client";

import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
import { Button } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { TfiAlignLeft } from "react-icons/tfi";
import { RxCross2, RxAvatar } from "react-icons/rx";
import { MdLogin, MdLogout } from "react-icons/md";
import { LuUserRoundPlus } from "react-icons/lu";
import { IoMdSpeedometer } from "react-icons/io";

import Image from "next/image";
import Link from "next/link";

import logo from "@/components/assets/images/logo.jpg";
import { authClient } from "@/lib/auth-client";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const MotionButton = motion.create(Button);

    const [isMounted, setIsMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    const navLinkClass = (href: string) =>
        pathname === href
            ? "text-[#A78BFA] border-b-2 border-[#A78BFA] font-semibold pb-1"
            : "text-[#EDEFF5]/70 hover:text-[#EDEFF5] transition-colors";

    // Public routes (visible to everyone)
    const publicNavLinks = [
        {
            href: "/",
            label: "Home",
        },
        {
            href: "/courses",
            label: "Courses",
        },
        {
            href: "/about",
            label: "About",
        },
    ];

    // Private routes (visible when logged in)
    const privateNavLinks = [
        {
            href: "/",
            label: "Home",
        },
        {
            href: "/courses",
            label: "Courses",
        },
        {
            href: "/ai-mentor",
            label: "AI Mentor",
        },
    ];

    const role = user?.role;

    let dashboardLinks: {
        key: string;
        label: string;
        href: string;
        icon?: any;
    }[] = [];

    if (role === "admin") {
        dashboardLinks = [
            {
                key: "overview",
                label: "Overview",
                href: "/dashboard/admin",
            },
            {
                key: "users",
                label: "Manage Users",
                href: "/dashboard/admin/manage-users",
            },
            {
                key: "courses",
                label: "Manage Courses",
                href: "/dashboard/admin/manage-courses",
            },
            {
                key: "profile",
                label: "Profile",
                href: "/dashboard/profile",
            },
        ];
    } else if (role === "instructor") {
        dashboardLinks = [
            {
                key: "overview",
                label: "Overview",
                href: "/dashboard/instructor",
            },
            {
                key: "addCourse",
                label: "Add Course",
                href: "/dashboard/instructor/add-course",
            },
            {
                key: "manageCourse",
                label: "Manage Courses",
                href: "/dashboard/instructor/manage-courses",
            },
            {
                key: "profile",
                label: "Profile",
                href: "/dashboard/profile",
            },
        ];
    } else {
        dashboardLinks = [
            {
                key: "overview",
                label: "Overview",
                href: "/dashboard/student",
            },
            {
                key: "mentor",
                label: "AI Mentor",
                href: "/ai-mentor",
            },
            {
                key: "myCourses",
                label: "My Courses",
                href: "/dashboard/student/my-courses",
            },
            {
                key: "profile",
                label: "Profile",
                href: "/dashboard/profile",
            },
        ];
    }

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#10182B]/95 backdrop-blur-md border-b border-[#A78BFA]/20 shadow-lg">
            <div className="mx-auto flex container items-center justify-between px-4 py-2">
                {/* LOGO */}
                <Link href="/" className="no-underline shrink-0">
                    <Image
                        src={logo}
                        alt="SkillForge"
                        width={140}
                        height={45}
                        className="h-12 md:h-16 w-auto"
                    />
                </Link>

                {/* DESKTOP NAVIGATION */}
                <ul className="hidden lg:flex items-center gap-8 font-medium">
                    {publicNavLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={navLinkClass(link.href)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}

                    {user && (
                        <li className="relative group">
                            <button className="text-[#EDEFF5]/70 hover:text-[#EDEFF5] transition-colors flex items-center gap-2">
                                <IoMdSpeedometer className="text-[#A78BFA]" />
                                Dashboard
                            </button>

                            <div className="absolute left-0 top-full hidden min-w-56 rounded-xl border border-[#A78BFA]/20 bg-[#1C2740] shadow-2xl group-hover:block overflow-hidden">
                                {dashboardLinks.map((item) => (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        className="flex items-center gap-3 px-5 py-3 text-[#EDEFF5]/70 hover:bg-[#A78BFA]/10 hover:text-[#EDEFF5] transition-colors"
                                    >
                                        {item.icon && <item.icon className="text-[#A78BFA]" />}
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </li>
                    )}
                </ul>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-3">
                    {/* DESKTOP AUTH */}
                    <div className="hidden lg:flex items-center gap-3">
                        {isMounted && user ? (
                            <>
                                <span className="font-medium text-[#EDEFF5]">
                                    Hi, {user.name}
                                </span>

                                <Image
                                    src={user.image ?? "/default-avatar.png"}
                                    alt={user.name ?? "User"}
                                    width={60}
                                    height={60}
                                    className="border-2 border-[#A78BFA] rounded-full"
                                />

                                <MotionButton
                                    whileHover={{
                                        scale: 1.05,
                                        y: -2,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 15,
                                    }}
                                    onClick={handleSignOut}
                                    className="bg-[#A78BFA] text-[#10182B] font-semibold rounded-md hover:bg-[#A78BFA]/80"
                                >
                                    <MdLogout />
                                    Logout
                                </MotionButton>
                            </>
                        ) : (
                            <>
                                <Link href="/signin">
                                    <MotionButton
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 15,
                                        }}
                                        className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                                    >
                                        <MdLogin />
                                        Sign In
                                    </MotionButton>
                                </Link>

                                <Link href="/signup">
                                    <MotionButton
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 15,
                                        }}
                                        className="border border-[#A78BFA] text-[#EDEFF5] bg-transparent hover:bg-[#A78BFA]/10"
                                    >
                                        <LuUserRoundPlus />
                                        Sign Up
                                    </MotionButton>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        className="lg:hidden text-[#EDEFF5]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <RxCross2 className="text-2xl text-[#A78BFA]" />
                        ) : (
                            <TfiAlignLeft className="text-2xl text-[#A78BFA]" />
                        )}
                    </motion.button>

                    {/* MOBILE USER BUTTON */}
                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        className="lg:hidden"
                        onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                    >
                        {user ? (
                            <Image
                                src={user.image ?? "/default-avatar.png"}
                                alt={user.name ?? "User"}
                                height={60}
                                width={60}
                                className="border-2 border-[#A78BFA] rounded-full"
                            />
                        ) : (
                            <RxAvatar className="text-3xl text-[#A78BFA]" />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="overflow-hidden border-t border-[#A78BFA]/20 bg-[#10182B] lg:hidden"
                    >
                        <ul className="flex flex-col gap-4 p-5">
                            {publicNavLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={navLinkClass(link.href)}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}

                            {user && (
                                <>
                                    <li className="border-t border-[#A78BFA]/20 pt-4">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#A78BFA]/60">
                                            Dashboard
                                        </p>
                                    </li>

                                    {dashboardLinks.map((item) => (
                                        <li key={item.key}>
                                            <Link
                                                href={item.href}
                                                className={navLinkClass(item.href)}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MOBILE AUTH MENU */}
            <AnimatePresence>
                {isAuthMenuOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -10,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: -10,
                            scale: 0.95,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="absolute right-4 top-20 z-50 lg:hidden"
                    >
                        <div className="min-w-64 rounded-2xl border border-[#A78BFA]/20 bg-[#1C2740] p-5 shadow-2xl">
                            {user ? (
                                <>
                                    <div className="mb-5 flex flex-col items-center border-b border-[#A78BFA]/20 pb-4">
                                        <Image
                                            src={user.image ?? "/default-avatar.png"}
                                            alt={user.name ?? "User"}
                                            width={60}
                                            height={60}
                                            className="mb-3 border-2 border-[#A78BFA] rounded"
                                        />

                                        <h2 className="text-lg font-semibold text-[#EDEFF5]">
                                            {user.name}
                                        </h2>

                                        <p className="text-sm text-[#EDEFF5]/60">
                                            {user.email}
                                        </p>
                                    </div>

                                    <MotionButton
                                        whileHover={{
                                            scale: 1.03,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        onClick={handleSignOut}
                                        className="w-full bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                                    >
                                        <MdLogout />
                                        Logout
                                    </MotionButton>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link href="/signin">
                                        <Button
                                            className="w-full bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                                        >
                                            <MdLogin />
                                            Sign In
                                        </Button>
                                    </Link>

                                    <Link href="/signup">
                                        <Button
                                            className="w-full border border-[#A78BFA] text-[#EDEFF5] bg-transparent hover:bg-[#A78BFA]/10"
                                        >
                                            <LuUserRoundPlus />
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;