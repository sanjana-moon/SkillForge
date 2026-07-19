"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    IoMdSpeedometer,
    IoMdPeople,
    IoMdBook,
    IoMdPerson,
    IoMdAdd,
    IoMdList,
    IoMdMenu,
    IoMdClose,
    IoMdHome,
} from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import logo from "@/components/assets/images/Logo.png";

interface DashboardLink {
    key: string;
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

const getLinksForRole = (role?: string): DashboardLink[] => {
    if (role === "admin") {
        return [
            { key: "overview", label: "Overview", href: "/dashboard/admin", icon: IoMdSpeedometer },
            { key: "users", label: "Manage Users", href: "/dashboard/admin/users", icon: IoMdPeople },
            { key: "courses", label: "Manage Courses", href: "/dashboard/admin/courses", icon: IoMdBook },
            { key: "profile", label: "Profile", href: "/dashboard/profile", icon: IoMdPerson },
        ];
    }
    if (role === "instructor") {
        return [
            { key: "overview", label: "Overview", href: "/dashboard/instructor", icon: IoMdSpeedometer },
            { key: "addCourse", label: "Add Course", href: "/dashboard/instructor/add-course", icon: IoMdAdd },
            { key: "manageCourse", label: "Manage Courses", href: "/dashboard/instructor/manage-courses", icon: IoMdList },
            { key: "profile", label: "Profile", href: "/dashboard/profile", icon: IoMdPerson },
        ];
    }
    if (role === "student") {
        return [
            { key: "overview", label: "Overview", href: "/dashboard/student", icon: IoMdSpeedometer },
            { key: "mentor", label: "AI Mentor", href: "/ai-mentor", icon: FaRobot },
            { key: "myCourses", label: "My Courses", href: "/dashboard/student/my-courses", icon: IoMdBook },
            { key: "profile", label: "Profile", href: "/dashboard/profile", icon: IoMdPerson },
        ];
    }
    return [];
};

const DashboardSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { data: session } = authClient.useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!mounted) {
        return (
            <div className="fixed left-0 top-0 z-40 h-full w-[280px] bg-[#0B0F19] border-r border-[#1E293B] flex flex-col p-4 animate-pulse">
                <div className="h-10 bg-[#1E293B] rounded-lg mb-8 w-1/2" />
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-full bg-[#1E293B]" />
                    <div className="flex-1 space-y-2">
                        <div className="h-3 bg-[#1E293B] rounded w-1/2" />
                        <div className="h-3 bg-[#1E293B] rounded w-3/4" />
                    </div>
                </div>
                <div className="space-y-3 flex-1">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="h-12 bg-[#1E293B] rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    const user = session?.user ?? undefined;
    const role = user?.role;
    const dashboardLinks = session?.user ? getLinksForRole(role) : [];

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    const isActive = (href: string) => pathname === href;

    return (
        <>
            {/* Mobile Toggle Button (Positioned cleanly out of text flow paths) */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#111827]/90 backdrop-blur-md border border-slate-800 text-slate-200 hover:text-white transition-all shadow-lg active:scale-95"
            >
                {isMobileOpen ? <IoMdClose className="text-xl" /> : <IoMdMenu className="text-xl" />}
            </button>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Main Sidebar Component */}
            <motion.aside
                initial={false}
                animate={{
                    width: isCollapsed ? 88 : 280,
                    x: typeof window !== "undefined" && window.innerWidth < 1024 ? (isMobileOpen ? 0 : -280) : 0,
                }}
                transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                className="fixed left-0 top-0 z-40 h-full bg-[#0B0F19] border-r border-[#1E293B] shadow-2xl flex flex-col overflow-hidden"
            >
                {/* Header Section (Logo Only) */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E293B] min-h-[73px]">
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src={logo}
                            alt="SkillForge"
                            width={150}
                            height={150}
                            className="h-35 w-auto object-contain rounded-lg"
                        />
                    </Link>

                    {!isMobileOpen && (
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
                        >
                            {isCollapsed ? "→" : "←"}
                        </button>
                    )}
                </div>

                {/* User Profile Area */}
                <div className="p-4 border-b border-[#1E293B] bg-gradient-to-b from-transparent to-slate-900/20">
                    <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
                        <div className="relative shrink-0">
                            <Avatar
                                src={user?.image ?? "/default-avatar.png"}
                                alt={user?.name ?? "User"}
                                className="w-10 h-10 border border-violet-500/30 ring-4 ring-violet-500/5 transition-transform duration-200"
                            />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0B0F19] rounded-full" />
                        </div>

                        <AnimatePresence mode="popLayout">
                            {!isCollapsed && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-1 min-w-0"
                                >
                                    <p className="text-slate-200 text-sm font-semibold truncate leading-tight">
                                        {user?.name}
                                    </p>
                                    <p className="text-slate-400 text-xs truncate mt-0.5">
                                        {user?.email}
                                    </p>
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 capitalize mt-1.5 tracking-wider">
                                        {role}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Links - Augmented Padding for Taller Rows */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
                    {dashboardLinks.map((link) => {
                        const Icon = link.icon || IoMdSpeedometer;
                        const active = isActive(link.href);

                        return (
                            <Link
                                key={link.key}
                                href={link.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={`
                                    relative flex items-center gap-3 px-3.5 py-3.5 rounded-xl transition-all duration-200 group
                                    ${active 
                                        ? "bg-gradient-to-r from-violet-600/15 to-violet-600/5 text-violet-400 font-medium border border-violet-500/20" 
                                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
                                    }
                                    ${isCollapsed ? "justify-center px-0" : ""}
                                `}
                            >
                                {active && (
                                    <motion.div 
                                        layoutId="activeIndicator"
                                        className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-violet-500 rounded-r-md"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                
                                <Icon className={`text-xl shrink-0 transition-transform group-hover:scale-105 duration-200 ${active ? "text-violet-400" : "text-slate-400 group-hover:text-slate-300"}`} />
                                
                                <AnimatePresence mode="popLayout">
                                    {!isCollapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -4 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -4 }}
                                            className="text-sm tracking-wide whitespace-nowrap"
                                        >
                                            {link.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Utilities Area */}
                <div className="p-3 border-t border-[#1E293B] space-y-1.5">
                    {/* Back to Home Action Button */}
                    <Link
                        href="/"
                        className={`
                            flex items-center gap-3 px-3.5 py-3.5 rounded-xl transition-all duration-200 group
                            text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent
                            ${isCollapsed ? "justify-center px-0" : ""}
                        `}
                    >
                        <IoMdHome className="text-xl text-slate-400 group-hover:text-slate-300 shrink-0 transition-transform group-hover:scale-105" />
                        <AnimatePresence mode="popLayout">
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -4 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -4 }}
                                    className="text-sm tracking-wide"
                                >
                                    Back to Home
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>

                    {/* Sign Out Action Button */}
                    <button
                        onClick={handleSignOut}
                        className={`
                            w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl transition-all duration-200
                            text-slate-400 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 group
                            ${isCollapsed ? "justify-center px-0" : ""}
                        `}
                    >
                        <MdLogout className="text-xl text-slate-400 group-hover:text-red-400 shrink-0 transition-transform group-hover:-translate-x-0.5" />
                        <AnimatePresence mode="popLayout">
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -4 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -4 }}
                                    className="text-sm font-medium tracking-wide"
                                >
                                    Logout
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.aside>
        </>
    );
};

export default DashboardSidebar;