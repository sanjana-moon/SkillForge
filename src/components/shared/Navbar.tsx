"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { TfiAlignLeft } from "react-icons/tfi";
import { RxCross2, RxAvatar } from "react-icons/rx";
import { MdLogin, MdLogout } from "react-icons/md";
import { LuUserRoundPlus } from "react-icons/lu";

import Image from "next/image";
import Link from "next/link";

import logo from "@/components/assets/images/Logooo.png";
import { authClient } from "@/lib/auth-client";
import { useMyRole } from "@/lib/hooks/useCourses";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const queryClient = useQueryClient();

    const MotionButton = motion.create(Button);

    const [isMounted, setIsMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

    const { data: session } = authClient.useSession();
    const sessionUser = session?.user;

    // ⭐ Role fetched once, cached 30 min
    const { data: role } = useMyRole(!!sessionUser);

    const user = sessionUser ? { ...sessionUser, role } : null;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut();
        queryClient.removeQueries({ queryKey: ["my-role"] });
        router.push("/");
    };

    const navLinkClass = (href: string) =>
        pathname === href
            ? "text-color-text-accent border-b-2 border-color-text-accent font-semibold pb-1"
            : "text-color-text-muted hover:text-color-text-main transition-colors";

    // Public routes (visible to everyone) — My Courses inserted for students
    const publicNavLinks = [
        { href: "/", label: "Home" },
        { href: "/courses", label: "Courses" },
        { href: "/contact", label: "Contact" },
        ...(role === "student"
            ? [{ href: "/dashboard/student/my-courses", label: "My Courses" }]
            : []),
    ];

    let dashboardLinks: {
        key: string;
        label: string;
        href: string;
        icon?: any;
    }[] = [];

    if (role === "admin") {
        dashboardLinks = [
            { key: "overview", label: "Overview", href: "/dashboard/admin" },
            { key: "users", label: "Manage Users", href: "/dashboard/admin/manage-users" },
            { key: "courses", label: "Manage Courses", href: "/dashboard/admin/manage-courses" },
            { key: "profile", label: "Profile", href: "/dashboard/profile" },
        ];
    } else if (role === "instructor") {
        dashboardLinks = [
            { key: "overview", label: "Overview", href: "/dashboard/instructor" },
            { key: "addCourse", label: "Add Course", href: "/dashboard/instructor/add-course" },
            { key: "manageCourse", label: "Manage Courses", href: "/dashboard/instructor/manage-courses" },
            { key: "profile", label: "Profile", href: "/dashboard/profile" },
        ];
    } else if (role === "student") {
        dashboardLinks = [
            { key: "overview", label: "Overview", href: "/dashboard/student" },
            { key: "profile", label: "Profile", href: "/dashboard/profile" },
            { key: "myCourses", label: "My Courses", href: "/dashboard/student/my-courses" },
        ];
    }

    return (
        <nav className="sticky top-0 z-50 w-full bg-[var(--color-bg-surface)]/95 backdrop-blur-md border-b border-[var(--color-border-main)] shadow-lg">
            {/* Applied section-container with !py-2 to override large padding */}
            <div className="section-container !py-2 flex items-center justify-between">
                {/* LOGO */}
                <Link href="/">
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
                            <Link href={link.href} className={navLinkClass(link.href)}>
                                {link.label}
                            </Link>
                        </li>
                    ))}

                    {user && (
                        <li>
                            <Link href="/ai-mentor" className={navLinkClass("/ai-mentor")}>
                                <div className="flex items-center gap-1.5">
                                    AI Mentor
                                </div>
                            </Link>
                        </li>
                    )}

                    {user && dashboardLinks.length > 0 && (
                        <li className="relative group">
                            <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors flex items-center gap-2">
                                Dashboard
                            </button>

                            <div className="absolute left-0 top-full hidden min-w-56 rounded-xl border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] shadow-2xl group-hover:block overflow-hidden">
                                {dashboardLinks.map((item) => (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        className="flex items-center gap-3 px-5 py-3 text-[var(--color-text-muted)] hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text-main)] transition-colors"
                                    >
                                        {item.icon && <item.icon className="text-[var(--color-text-accent)]" />}
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
                                <span className="font-medium text-[var(--color-text-main)]">
                                    Hi, {user.name}
                                </span>

                                <Image
                                    src={user.image ?? "/default-avatar.png"}
                                    alt={user.name ?? "User"}
                                    width={40}
                                    height={40}
                                    className="border-2 border-[var(--color-text-accent)] rounded-full object-cover"
                                />

                                <MotionButton
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    onClick={handleSignOut}
                                    className="bg-[var(--color-action-primary)] font-semibold rounded-md hover:opacity-90 text-[var(--color-text-inverse)]"
                                >
                                    <MdLogout />
                                    Logout
                                </MotionButton>
                            </>
                        ) : (
                            <>
                                <Link href="/signin">
                                    <MotionButton
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        className="bg-[var(--color-action-primary)] font-semibold hover:opacity-90 text-[var(--color-text-inverse)]"
                                    >
                                        <MdLogin />
                                        Sign In
                                    </MotionButton>
                                </Link>

                                <Link href="/signup">
                                    <MotionButton
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        className="border border-[var(--color-text-accent)] text-[var(--color-text-main)] bg-transparent hover:bg-[var(--color-bg-alt)]"
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
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="lg:hidden text-[var(--color-text-main)]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <RxCross2 className="text-2xl text-[var(--color-text-accent)]" />
                        ) : (
                            <TfiAlignLeft className="text-2xl text-[var(--color-text-accent)]" />
                        )}
                    </motion.button>

                    {/* MOBILE USER BUTTON */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="lg:hidden"
                        onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                    >
                        {user ? (
                            <Image
                                src={user.image ?? "/default-avatar.png"}
                                alt={user.name ?? "User"}
                                width={40}
                                height={40}
                                className="border-2 border-[var(--color-text-accent)] rounded-full object-cover"
                            />
                        ) : (
                            <RxAvatar className="text-3xl text-[var(--color-text-accent)]" />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-[var(--color-border-main)] bg-[var(--color-bg-surface)] lg:hidden"
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
                                <li>
                                    <Link
                                        href="/ai-mentor"
                                        className={navLinkClass("/ai-mentor")}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <div className="flex items-center gap-1.5">
                                            AI Mentor
                                        </div>
                                    </Link>
                                </li>
                            )}

                            {user && dashboardLinks.length > 0 && (
                                <>
                                    <li className="border-t border-[var(--color-border-main)] pt-4">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-accent)]/60">
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
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-4 top-20 z-50 lg:hidden"
                    >
                        <div className="min-w-64 rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] p-5 shadow-2xl">
                            {user ? (
                                <>
                                    <div className="mb-5 flex flex-col items-center border-b border-[var(--color-border-main)] pb-4">
                                        <Image
                                            src={user.image ?? "/default-avatar.png"}
                                            alt={user.name ?? "User"}
                                            width={50}
                                            height={50}
                                            className="mb-3 border-2 border-[var(--color-text-accent)] rounded-full object-cover"
                                        />

                                        <h2 className="text-lg font-semibold text-[var(--color-text-main)]">
                                            {user.name}
                                        </h2>

                                        <p className="text-sm text-[var(--color-text-muted)]">
                                            {user.email}
                                        </p>
                                    </div>

                                    <MotionButton
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSignOut}
                                        className="w-full bg-[var(--color-action-primary)] font-semibold hover:opacity-90 text-[var(--color-text-inverse)]"
                                    >
                                        <MdLogout />
                                        Logout
                                    </MotionButton>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link href="/signin">
                                        <Button className="w-full bg-[var(--color-action-primary)] font-semibold hover:opacity-90 text-[var(--color-text-inverse)]">
                                            <MdLogin />
                                            Sign In
                                        </Button>
                                    </Link>

                                    <Link href="/signup">
                                        <Button className="w-full border border-[var(--color-text-accent)] text-[var(--color-text-main)] bg-transparent hover:bg-[var(--color-bg-alt)]">
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