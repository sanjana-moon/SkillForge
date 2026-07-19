"use server";

import { serverMutation, deleteMutation } from "../server";
import type { Course, ApprovalStatus, PublishStatus, UserRole, AppUser } from "./data";

// ============================
// TYPES
// ============================

export interface CourseResponse {
    success: boolean;
    data?: any;
    message?: string;
    error?: string;
    insertedId?: string;
}

export interface CourseCreateData {
    title: string;
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    price: number;
    duration: string;
    description: string;
    thumbnail: string;
    instructorEmail?: string;
    instructorName?: string;
    instructorId?: string;
}

// ============================
// COURSE ACTIONS (Protected - Instructor)
// ============================

// CREATE a course (instructor only)
export const createCourse = async (data: CourseCreateData): Promise<CourseResponse> => {
    try {
        const result = await serverMutation<any, CourseCreateData>(
            "/api/courses",
            "POST",
            data
        );
        
        return {
            success: true,
            data: result,
            message: "Course created successfully",
        };
    } catch (error) {
        console.error("Create course error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create course",
        };
    }
};

// UPDATE a course (instructor only)
export const updateCourse = async (
    courseId: string,
    data: Partial<Course>
): Promise<CourseResponse> => {
    try {
        const result = await serverMutation<any, Partial<Course>>(
            `/api/courses/${courseId}`,
            "PATCH",
            data
        );
        
        return {
            success: true,
            data: result,
            message: "Course updated successfully",
        };
    } catch (error) {
        console.error("Update course error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update course",
        };
    }
};

// PUBLISH/UNPUBLISH a course (instructor only)
export const togglePublishCourse = async (
    courseId: string,
    publishStatus: PublishStatus
): Promise<CourseResponse> => {
    try {
        const result = await serverMutation<any, { publishStatus: PublishStatus }>(
            `/api/courses/${courseId}/publish`,
            "PATCH",
            { publishStatus }
        );
        
        return {
            success: true,
            data: result,
            message: `Course ${publishStatus === "published" ? "published" : "unpublished"} successfully`,
        };
    } catch (error) {
        console.error("Publish course error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to publish course",
        };
    }
};

// DELETE a course (instructor only)
export const deleteCourse = async (courseId: string): Promise<CourseResponse> => {
    try {
        const result = await deleteMutation<any>(`/api/courses/${courseId}`);
        
        return {
            success: true,
            data: result,
            message: "Course deleted successfully",
        };
    } catch (error) {
        console.error("Delete course error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete course",
        };
    }
};

// ============================
// ENROLLMENT ACTIONS (Protected - Student)
// ============================

// ENROLL in a course (student only)
export const enrollInCourse = async (
    courseId: string,
    courseTitle: string
): Promise<CourseResponse> => {
    try {
        const result = await serverMutation<any, { courseId: string; courseTitle: string }>(
            "/api/enrollments",
            "POST",
            { courseId, courseTitle }
        );
        
        return {
            success: true,
            data: result,
            message: "Successfully enrolled in course",
        };
    } catch (error) {
        console.error("Enrollment error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to enroll in course",
        };
    }
};

// UPDATE enrollment progress (student only)
export const updateEnrollmentProgress = async (
    enrollmentId: string,
    progress: number
): Promise<CourseResponse> => {
    try {
        const result = await serverMutation<any, { progress: number }>(
            `/api/enrollments/${enrollmentId}/progress`,
            "PATCH",
            { progress }
        );
        
        return {
            success: true,
            data: result,
            message: "Progress updated successfully",
        };
    } catch (error) {
        console.error("Update progress error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update progress",
        };
    }
};

// ============================
// ADMIN COURSE ACTIONS (Protected - Admin ONLY)
// ============================

// UPDATE course approval status (admin only) - ✅ FIXED
export const updateCourseApproval = async (
    courseId: string,
    approvalStatus: ApprovalStatus
): Promise<CourseResponse> => {
    try {
        const result = await serverMutation<any, { approvalStatus: ApprovalStatus }>(
            `/api/admin/courses/${courseId}`,
            "PATCH",
            { approvalStatus }
        );
        
        return {
            success: true,
            data: result,
            message: `Course ${approvalStatus} successfully`,
        };
    } catch (error) {
        console.error("Update course approval error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update approval status",
        };
    }
};

// DELETE course (admin only) - ✅ FIXED - use admin endpoint
export const deleteCourseAdmin = async (courseId: string): Promise<CourseResponse> => {
    try {
        const result = await deleteMutation<any>(`/api/admin/courses/${courseId}`);
        
        return {
            success: true,
            data: result,
            message: "Course deleted successfully",
        };
    } catch (error) {
        console.error("Delete course error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete course",
        };
    }
};

// ============================
// ADMIN USER ACTIONS (Protected - Admin ONLY)
// ============================

// CHANGE user role (admin only)
export const changeUserRole = async (
    userId: string,
    role: UserRole
): Promise<CourseResponse> => {
    try {
        const result = await serverMutation<any, { role: UserRole }>(
            `/api/admin/users/${userId}/role`,
            "PATCH",
            { role }
        );
        
        return {
            success: true,
            data: result,
            message: `User role changed to ${role}`,
        };
    } catch (error) {
        console.error("Change user role error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to change user role",
        };
    }
};

// BLOCK/UNBLOCK user (admin only)
export const toggleUserBlock = async (
    userId: string,
    isBlocked: boolean
): Promise<CourseResponse> => {
    try {
        const result = await serverMutation<any, { isBlocked: boolean }>(
            `/api/admin/users/${userId}/block`,
            "PATCH",
            { isBlocked }
        );
        
        return {
            success: true,
            data: result,
            message: isBlocked ? "User blocked successfully" : "User unblocked successfully",
        };
    } catch (error) {
        console.error("Toggle user block error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update user block status",
        };
    }
};

// DELETE user (admin only)
export const deleteUser = async (userId: string): Promise<CourseResponse> => {
    try {
        const result = await deleteMutation<any>(`/api/admin/users/${userId}`);
        
        return {
            success: true,
            data: result,
            message: "User deleted successfully",
        };
    } catch (error) {
        console.error("Delete user error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete user",
        };
    }
};

// ============================
// PROFILE ACTIONS (Protected)
// ============================

// UPDATE profile (protected)
export const updateProfile = async (
    name: string,
    profileImage?: string,
    newEmail?: string
): Promise<CourseResponse> => {
    try {
        const data: { name: string; email?: string; profileImage?: string } = { name };
        if (newEmail) data.email = newEmail;
        if (profileImage !== undefined) data.profileImage = profileImage;

        const result = await serverMutation<any, { name: string; email?: string; profileImage?: string }>(
            "/api/profile",
            "PUT",
            data
        );
        
        return {
            success: true,
            data: result,
            message: "Profile updated successfully",
        };
    } catch (error) {
        console.error("Update profile error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update profile",
        };
    }
};

// ============================
// AI MENTOR ACTIONS (Protected)
// ============================

// CREATE a mentor session (protected)
export const createMentorSession = async (): Promise<CourseResponse> => {
    try {
        const result = await serverMutation<any>(
            "/api/ai-mentor/sessions",
            "POST"
        );
        
        return {
            success: true,
            data: result,
            message: "Session created successfully",
        };
    } catch (error) {
        console.error("Create mentor session error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create session",
        };
    }
};

// SEND a message in mentor session (protected)
export const sendMentorMessage = async (
    sessionId: string,
    message: string
): Promise<CourseResponse> => {
    try {
        const result = await serverMutation<any, { message: string }>(
            `/api/ai-mentor/sessions/${sessionId}/messages`,
            "POST",
            { message }
        );
        
        return {
            success: true,
            data: result,
            message: "Message sent successfully",
        };
    } catch (error) {
        console.error("Send mentor message error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to send message",
        };
    }
};

// DELETE a mentor session (protected)
export const deleteMentorSession = async (sessionId: string): Promise<CourseResponse> => {
    try {
        const result = await deleteMutation<any>(`/api/ai-mentor/sessions/${sessionId}`);
        
        return {
            success: true,
            data: result,
            message: "Session deleted successfully",
        };
    } catch (error) {
        console.error("Delete mentor session error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete session",
        };
    }
};