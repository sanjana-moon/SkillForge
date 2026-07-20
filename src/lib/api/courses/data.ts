"use server";

import { serverFetch } from "../server";

// ============================
// TYPES (Matches Backend)
// ============================

export type ApprovalStatus = "pending" | "approved" | "rejected";
export type PublishStatus = "published" | "unpublished";
export type UserRole = "student" | "instructor" | "admin";
export type CourseLevel = "beginner" | "intermediate" | "advanced";

// ✅ Add Content Types
export interface CodeExample {
    id: string;
    title: string;
    code: string;
    language: string;
    explanation: string;
}

export interface PracticeQuestion {
    id: string;
    question: string;
    answer: string;
    hint: string;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    content: string;
    codeExamples: CodeExample[];
    practiceQuestions: PracticeQuestion[];
    youtubeLinks: string[];
    quickTips: string[];
}

export interface CourseContent {
    lessons: Lesson[];
}

export interface Course {
    _id?: string;
    title: string;
    category: string;
    level: CourseLevel;
    price: number;
    duration: string;
    description: string;
    thumbnail: string;
    instructorEmail: string;
    instructorName: string;
    approvalStatus: ApprovalStatus;
    publishStatus: PublishStatus;
    avgRating: number;
    reviewCount: number;
    enrollmentCount?: number;
    createdAt: Date;
    whatYouWillLearn?: string[];
    requirements?: string[];
    targetAudience?: string[];
    content?: CourseContent;
}

export interface Enrollment {
    _id?: string;
    courseId: string;
    courseTitle: string;
    studentEmail: string;
    progress: number;
    completedAt?: Date;
    createdAt: Date;
}

export interface Payment {
    _id?: string;
    studentEmail: string;
    courseId: string;
    courseTitle: string;
    amount: number;
    transactionId: string;
    paymentStatus: string;
    paidAt: Date;
}

export interface AppUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    isBlocked: boolean;
    profileImage?: string | null;
}

export interface MentorMessage {
    role: "user" | "assistant";
    content: string;
    createdAt: Date;
}

export interface MentorSession {
    _id?: string;
    userEmail: string;
    title: string;
    messages: MentorMessage[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CourseListResponse {
    courses: Course[];
    totalCourses: number;
    currentPage: number;
    totalPages: number;
}

export interface CourseFilters {
    search?: string;
    category?: string;
    level?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
}

export interface InstructorStats {
    totalCourses: number;
    totalStudents: number;
    popularCourses: { title: string; enrollments: number }[];
    enrollmentChart: { month: string; enrollments: number }[];
}

export interface StudentStats {
    enrolledCourses: number;
    completedCourses: number;
    inProgress: number;
    recentCourses: Enrollment[];
}

export interface AdminDashboard {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    totalRevenue?: number;
    coursesByCategory: { category: string; value: number }[];
}

// ============================
// PUBLIC COURSE ROUTES
// ============================

// GET all published courses (public)
export const getCourses = async (filters?: CourseFilters): Promise<CourseListResponse> => {
    try {
        const params = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    params.append(key, String(value));
                }
            });
        }

        const queryString = params.toString();
        const url = `/api/courses${queryString ? `?${queryString}` : ""}`;

        const response = await serverFetch<CourseListResponse>(url, false);
        return response;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

// GET featured courses (public)
export const getFeaturedCourses = async (): Promise<Course[]> => {
    try {
        const response = await serverFetch<Course[]>("/api/courses/featured", false);
        return response;
    } catch (error) {
        console.error("Error fetching featured courses:", error);
        throw error;
    }
};

// GET course by ID (public)
export const getCourseById = async (courseId: string): Promise<Course> => {
    try {
        const response = await serverFetch<Course>(`/api/courses/${courseId}`, false);
        return response;
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
};

// GET all categories (public)
export const getCategories = async (): Promise<string[]> => {
    try {
        const response = await serverFetch<string[]>("/api/categories", false);
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// ============================
// COURSE CONTENT ROUTES (Public)
// ============================

// ✅ GET course content (public)
export const getCourseContent = async (courseId: string): Promise<CourseContent> => {
    try {
        const response = await serverFetch<{ content: CourseContent }>(
            `/api/courses/${courseId}/content`,
            false
        );
        return response.content || { lessons: [] };
    } catch (error) {
        console.error("Error fetching course content:", error);
        return { lessons: [] };
    }
};

// ✅ GET a specific lesson (public)
export const getLessonById = async (courseId: string, lessonId: string): Promise<Lesson | null> => {
    try {
        const response = await serverFetch<Lesson>(
            `/api/courses/${courseId}/lessons/${lessonId}`,
            false
        );
        return response;
    } catch (error) {
        console.error("Error fetching lesson:", error);
        return null;
    }
};

// ============================
// INSTRUCTOR ROUTES (Protected)
// ============================

// GET instructor's courses (protected)
export const getInstructorCourses = async (email: string): Promise<Course[]> => {
    try {
        const response = await serverFetch<Course[]>(
            `/api/courses/instructor/${email}`,
            true
        );
        return response;
    } catch (error) {
        console.error("Error fetching instructor courses:", error);
        throw error;
    }
};

// GET instructor stats (protected)
export const getInstructorStats = async (email: string): Promise<InstructorStats> => {
    try {
        const response = await serverFetch<InstructorStats>(
            `/api/instructor-stats/${email}`,
            true
        );
        return response;
    } catch (error) {
        console.error("Error fetching instructor stats:", error);
        throw error;
    }
};

// ============================
// STUDENT ROUTES (Protected)
// ============================

// GET student enrollments (protected)
export const getStudentEnrollments = async (email: string): Promise<Enrollment[]> => {
    try {
        const response = await serverFetch<Enrollment[]>(
            `/api/enrollments/student/${email}`,
            true
        );
        return response;
    } catch (error) {
        console.error("Error fetching student enrollments:", error);
        throw error;
    }
};

// GET student stats (protected)
export const getStudentStats = async (email: string): Promise<StudentStats> => {
    try {
        const response = await serverFetch<StudentStats>(
            `/api/student-stats/${email}`,
            true
        );
        return response;
    } catch (error) {
        console.error("Error fetching student stats:", error);
        throw error;
    }
};

// ============================
// ADMIN ROUTES (Protected)
// ============================

// GET all courses (admin only)
export const fetchAllCourses = async (): Promise<Course[]> => {
    try {
        const response = await serverFetch<Course[]>("/api/admin/courses", true);
        return response;
    } catch (error) {
        console.error("Error fetching all courses:", error);
        throw error;
    }
};

// GET pending courses (admin only)
export const getPendingCourses = async (): Promise<Course[]> => {
    try {
        const response = await serverFetch<Course[]>("/api/admin/pending-courses", true);
        return response;
    } catch (error) {
        console.error("Error fetching pending courses:", error);
        throw error;
    }
};

// GET all users (admin only)
export const fetchUsers = async (): Promise<AppUser[]> => {
    try {
        const response = await serverFetch<AppUser[]>("/api/admin/users", true);
        return response;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// GET admin dashboard stats (admin only)
export const fetchAdminDashboard = async (): Promise<AdminDashboard> => {
    try {
        const response = await serverFetch<AdminDashboard>(
            "/api/admin/dashboard",
            true
        );
        return response;
    } catch (error) {
        console.error("Error fetching admin dashboard:", error);
        throw error;
    }
};

// ============================
// PROFILE ROUTES (Protected)
// ============================

// GET profile (protected)
export const getProfile = async (): Promise<AppUser> => {
    try {
        const response = await serverFetch<AppUser>("/api/profile", true);
        return response;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};

// ============================
// AI MENTOR ROUTES (Protected)
// ============================

// GET mentor sessions (protected)
export const getMentorSessions = async (): Promise<MentorSession[]> => {
    try {
        const response = await serverFetch<MentorSession[]>("/api/ai-mentor/sessions", true);
        return response;
    } catch (error) {
        console.error("Error fetching mentor sessions:", error);
        throw error;
    }
};

// GET mentor session by ID (protected)
export const getMentorSession = async (sessionId: string): Promise<MentorSession> => {
    try {
        const response = await serverFetch<MentorSession>(
            `/api/ai-mentor/sessions/${sessionId}`,
            true
        );
        return response;
    } catch (error) {
        console.error("Error fetching mentor session:", error);
        throw error;
    }
};

// ============================
// ENROLLMENT CHECK ROUTES (Protected)
// ============================

// CHECK if user is enrolled in a course (protected)
export const checkEnrollment = async (courseId: string): Promise<{ enrolled: boolean }> => {
    try {
        const response = await serverFetch<{ enrolled: boolean }>(
            `/api/enrollments/check/${courseId}`,
            true
        );
        return response;
    } catch (error) {
        console.error("Error checking enrollment:", error);
        return { enrolled: false };
    }
};

// GET user's enrolled courses (protected)
export const getUserEnrollments = async (): Promise<Enrollment[]> => {
    try {
        const response = await serverFetch<Enrollment[]>(
            "/api/enrollments/my",
            true
        );
        return response;
    } catch (error) {
        console.error("Error fetching user enrollments:", error);
        throw error;
    }
};

// GET student payments (protected)
export const getStudentPayments = async (email: string): Promise<Payment[]> => {
    try {
        const response = await serverFetch<Payment[]>(
            `/api/payments/student/${email}`,
            true
        );
        return response;
    } catch (error) {
        console.error("Error fetching student payments:", error);
        throw error;
    }
};