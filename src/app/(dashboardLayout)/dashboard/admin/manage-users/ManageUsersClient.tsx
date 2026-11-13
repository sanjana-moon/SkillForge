"use client";

import { useState } from "react";
import { Card, Button, Spinner } from "@heroui/react";
import { FaTrash, FaUserShield, FaChalkboardTeacher, FaUserGraduate, FaUserCog } from "react-icons/fa";
import { toast } from "react-toastify";

import {
    changeUserRole,
    deleteUser,
} from "@/lib/api/courses/actions";

import { AppUser } from "@/lib/api/courses/data";

interface ManageUsersClientProps {
    users: AppUser[];
}

const getRoleIcon = (role: string) => {
    switch (role) {
        case "admin":
            return <FaUserShield className="text-teal" />;
        case "instructor":
            return <FaChalkboardTeacher className="text-teal" />;
        case "student":
            return <FaUserGraduate className="text-teal" />;
        default:
            return <FaUserCog className="text-navy/60" />;
    }
};

const getRoleColor = (role: string) => {
    switch (role) {
        case "admin":
            return "bg-teal/20 text-teal border-teal/30";
        case "instructor":
            return "bg-teal/20 text-teal border-teal/30";
        case "student":
            return "bg-teal/20 text-teal border-teal/30";
        default:
            return "bg-navy/10 text-navy/60 border-navy/20";
    }
};

const getRoleBadgeColor = (role: string) => {
    switch (role) {
        case "admin":
            return "bg-[image:var(--brand-gradient)]";
        case "instructor":
            return "bg-teal";
        case "student":
            return "bg-teal";
        default:
            return "bg-navy/20";
    }
};

export default function ManageUsersClient({
    users: initialUsers,
}: ManageUsersClientProps) {
    const [users, setUsers] = useState<AppUser[]>(initialUsers ?? []);
    const [loading, setLoading] = useState<string | null>(null);

    const handleRoleChange = async (
        userId: string,
        role: "admin" | "instructor" | "student"
    ) => {
        try {
            setLoading(userId);
            const result = await changeUserRole(userId, role);

            if (result.success) {
                setUsers((prev) =>
                    prev.map((u) =>
                        u._id === userId
                            ? { ...u, role }
                            : u
                    )
                );
                toast.success(`User role updated to ${role}.`);
            } else {
                toast.error(result.error || "Failed to update role.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update role.");
        } finally {
            setLoading(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            setLoading(id);
            const result = await deleteUser(id);

            if (result.success) {
                setUsers((prev) =>
                    prev.filter((user) => user._id !== id)
                );
                toast.success("User deleted successfully.");
            } else {
                toast.error(result.error || "Failed to delete user.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete user.");
        } finally {
            setLoading(null);
        }
    };

    // Stats
    const totalUsers = users.length;
    const adminCount = users.filter(u => u.role === "admin").length;
    const instructorCount = users.filter(u => u.role === "instructor").length;
    const studentCount = users.filter(u => u.role === "student").length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-navy">
                    Manage Users
                </h1>
                <p className="text-navy/60 mt-2">
                    Manage student, instructor, and admin accounts. Update roles or remove users.
                </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card className="bg-white border border-teal/20 rounded-2xl p-4">
                    <p className="text-navy/60 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-navy">{totalUsers}</p>
                </Card>
                <Card className="bg-white border border-teal/20 rounded-2xl p-4">
                    <p className="text-navy/60 text-sm">Admins</p>
                    <p className="text-2xl font-bold text-teal">{adminCount}</p>
                </Card>
                <Card className="bg-white border border-teal/20 rounded-2xl p-4">
                    <p className="text-navy/60 text-sm">Instructors</p>
                    <p className="text-2xl font-bold text-teal">{instructorCount}</p>
                </Card>
                <Card className="bg-white border border-teal/20 rounded-2xl p-4">
                    <p className="text-navy/60 text-sm">Students</p>
                    <p className="text-2xl font-bold text-teal">{studentCount}</p>
                </Card>
            </div>

            {/* Users Table */}
            <Card className="bg-white border border-teal/20 rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white border-b border-teal/20">
                            <tr>
                                <th className="px-6 py-4 text-left text-navy font-semibold text-sm">
                                    User
                                </th>
                                <th className="px-6 py-4 text-left text-navy font-semibold text-sm">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-navy font-semibold text-sm">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-left text-navy font-semibold text-sm">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-center text-navy font-semibold text-sm">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-navy/40">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-teal/10 hover:bg-white/50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRoleColor(user.role)}`}>
                                                    {getRoleIcon(user.role)}
                                                </div>
                                                <span className="font-medium text-navy">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-navy/70">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                className={`px-3 py-2 rounded-lg border outline-none text-sm font-medium cursor-pointer bg-white/50 ${getRoleColor(user.role)}`}
                                                value={user.role}
                                                onChange={(e) =>
                                                    handleRoleChange(
                                                        user._id,
                                                        e.target.value as "admin" | "instructor" | "student"
                                                    )
                                                }
                                                disabled={loading === user._id}
                                            >
                                                <option value="student" className="bg-white text-navy">
                                                    Student
                                                </option>
                                                <option value="instructor" className="bg-white text-navy">
                                                    Instructor
                                                </option>
                                                <option value="admin" className="bg-white text-navy">
                                                    Admin
                                                </option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isBlocked ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                                {user.isBlocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    onPress={() => handleDelete(user._id)}
                                                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 min-w-0 w-9 h-9 rounded-lg"
                                                >
                                                    <FaTrash className="text-sm" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Footer Stats */}
            <div className="flex flex-wrap justify-between items-center text-navy/40 text-sm gap-4">
                <p>Total Users: {totalUsers}</p>
                <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[image:var(--brand-gradient)]"></span>
                        Admin: {adminCount}
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-teal"></span>
                        Instructor: {instructorCount}
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-teal"></span>
                        Student: {studentCount}
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                        Active: {users.filter(u => !u.isBlocked).length}
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-400"></span>
                        Blocked: {users.filter(u => u.isBlocked).length}
                    </span>
                </div>
            </div>
        </div>
    );
}
