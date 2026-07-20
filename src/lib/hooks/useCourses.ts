import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCourses, getCourseById, getStudentStats, getStudentEnrollments, checkEnrollment } from "@/lib/api/courses/data";
import { enrollInCourse } from "@/lib/api/courses/actions";

// Query Keys
export const QUERY_KEYS = {
    courses: "courses",
    course: "course",
    studentStats: "student-stats",
    studentEnrollments: "student-enrollments",
    checkEnrollment: "check-enrollment",
};

// Fetch all courses with filters
export const useCourses = (filters?: any) => {
    return useQuery({
        queryKey: [QUERY_KEYS.courses, filters],
        queryFn: () => getCourses(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: true,
    });
};

// Fetch single course by ID
export const useCourse = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.course, id],
        queryFn: () => getCourseById(id),
        enabled: !!id,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Fetch student stats
export const useStudentStats = (email: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.studentStats, email],
        queryFn: () => getStudentStats(email),
        enabled: !!email,
        staleTime: 5 * 60 * 1000,
    });
};

// Fetch student enrollments
export const useStudentEnrollments = (email: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.studentEnrollments, email],
        queryFn: () => getStudentEnrollments(email),
        enabled: !!email,
        staleTime: 5 * 60 * 1000,
    });
};

// Check enrollment status
export const useCheckEnrollment = (courseId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.checkEnrollment, courseId],
        queryFn: () => checkEnrollment(courseId),
        enabled: !!courseId,
        staleTime: 2 * 60 * 1000,
    });
};

// Enroll in course mutation
export const useEnrollCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ courseId, courseTitle }: { courseId: string; courseTitle: string }) =>
            enrollInCourse(courseId, courseTitle),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.studentEnrollments] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.studentStats] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.checkEnrollment, variables.courseId] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.course, variables.courseId] });
        },
    });
};