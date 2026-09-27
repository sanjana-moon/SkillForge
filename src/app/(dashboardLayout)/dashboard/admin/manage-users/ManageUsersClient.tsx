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
            return <FaUserShield className="text-[#7BAE9B]" />;
        case "instructor":
            return <FaChalkboardTeacher className="text-[#5F927E]" />;
        case "student":
            return <FaUserGraduate className="text-[#5F927E]" />;
        default:
            return <FaUserCog className="text-[#263A33]/60" />;
    }
};

const getRoleColor = (role: string) => {
    switch (role) {
        case "admin":
            return "bg-[#7BAE9B]/20 text-[#7BAE9B] border-[#7BAE9B]/30";
        case "instructor":
            return "bg-[#5F927E]/20 text-[#5F927E] border-[#5F927E]/30";
        case "student":
            return "bg-[#5F927E]/20 text-[#5F927E] border-[#5F927E]/30";
        default:
            return "bg-[#263A33]/10 text-[#263A33]/60 border-[#263A33]/20";
    }
};

const getRoleBadgeColor = (role: string) => {
    switch (role) {
        case "admin":
            return "bg-[#7BAE9B]";
        case "instructor":
            return "bg-[#5F927E]";
        case "student":
            return "bg-[#5F927E]";
        default:
            return "bg-[#263A33]/20";
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
                <h1 className="text-3xl md:text-4xl font-bold text-[#263A33]">
                    Manage Users
                </h1>
                <p className="text-[#263A33]/60 mt-2">
                    Manage student, instructor, and admin accounts. Update roles or remove users.
                </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card className="bg-[#DCEBE4] border border-[#7BAE9B]/20 rounded-2xl p-4">
                    <p className="text-[#263A33]/60 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-[#263A33]">{totalUsers}</p>
                </Card>
                <Card className="bg-[#DCEBE4] border border-[#7BAE9B]/20 rounded-2xl p-4">
                    <p className="text-[#263A33]/60 text-sm">Admins</p>
                    <p className="text-2xl font-bold text-[#7BAE9B]">{adminCount}</p>
                </Card>
                <Card className="bg-[#DCEBE4] border border-[#7BAE9B]/20 rounded-2xl p-4">
                    <p className="text-[#263A33]/60 text-sm">Instructors</p>
                    <p className="text-2xl font-bold text-[#5F927E]">{instructorCount}</p>
                </Card>
                <Card className="bg-[#DCEBE4] border border-[#7BAE9B]/20 rounded-2xl p-4">
                    <p className="text-[#263A33]/60 text-sm">Students</p>
                    <p className="text-2xl font-bold text-[#5F927E]">{studentCount}</p>
                </Card>
            </div>

            {/* Users Table */}
            <Card className="bg-[#DCEBE4] border border-[#7BAE9B]/20 rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F5F8F5] border-b border-[#7BAE9B]/20">
                            <tr>
                                <th className="px-6 py-4 text-left text-[#263A33] font-semibold text-sm">
                                    User
                                </th>
                                <th className="px-6 py-4 text-left text-[#263A33] font-semibold text-sm">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-[#263A33] font-semibold text-sm">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-left text-[#263A33] font-semibold text-sm">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-center text-[#263A33] font-semibold text-sm">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-[#263A33]/40">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-[#7BAE9B]/10 hover:bg-[#F5F8F5]/50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRoleColor(user.role)}`}>
                                                    {getRoleIcon(user.role)}
                                                </div>
                                                <span className="font-medium text-[#263A33]">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[#263A33]/70">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                className={`px-3 py-2 rounded-lg border outline-none text-sm font-medium cursor-pointer bg-[#F5F8F5]/50 ${getRoleColor(user.role)}`}
                                                value={user.role}
                                                onChange={(e) =>
                                                    handleRoleChange(
                                                        user._id,
                                                        e.target.value as "admin" | "instructor" | "student"
                                                    )
                                                }
                                                disabled={loading === user._id}
                                            >
                                                <option value="student" className="bg-[#DCEBE4] text-[#263A33]">
                                                    Student
                                                </option>
                                                <option value="instructor" className="bg-[#DCEBE4] text-[#263A33]">
                                                    Instructor
                                                </option>
                                                <option value="admin" className="bg-[#DCEBE4] text-[#263A33]">
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
            <div className="flex flex-wrap justify-between items-center text-[#263A33]/40 text-sm gap-4">
                <p>Total Users: {totalUsers}</p>
                <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#7BAE9B]"></span>
                        Admin: {adminCount}
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#5F927E]"></span>
                        Instructor: {instructorCount}
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#5F927E]"></span>
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