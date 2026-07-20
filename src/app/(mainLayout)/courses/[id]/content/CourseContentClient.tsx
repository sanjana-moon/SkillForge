"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Card,
    Button,
    Chip,
    Spinner,
} from "@heroui/react";
import {
    FaArrowLeft,
    FaPlay,
    FaCheckCircle,
    FaCode,
    FaQuestionCircle,
    FaYoutube,
    FaLightbulb,
    FaBook,
    FaChevronRight,
    FaChevronLeft,
} from "react-icons/fa";
import type { Course, CourseContent } from "@/lib/api/courses/data";

interface CourseContentClientProps {
    course: Course;
    content: CourseContent;
    user: {
        name: string;
        email: string;
        role?: string;
    };
}

const CourseContentClient = ({
    course,
    content,
    user,
}: CourseContentClientProps) => {
    const router = useRouter();
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [expandedSections, setExpandedSections] = useState<{
        code: boolean;
        questions: boolean;
        youtube: boolean;
        tips: boolean;
    }>({
        code: false,
        questions: false,
        youtube: false,
        tips: false,
    });

    const lessons = content?.lessons || [];
    const currentLesson = lessons[currentLessonIndex] || null;

    const totalLessons = lessons.length;
    const completedLessons = 0; // Will be fetched from backend

    const handleNextLesson = () => {
        if (currentLessonIndex < totalLessons - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
        }
    };

    const handlePrevLesson = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
        }
    };

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    if (totalLessons === 0) {
        return (
            <div className="min-h-screen bg-[#10182B] p-4 md:p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-[#EDEFF5]/60 hover:text-[#EDEFF5] transition-colors"
                        >
                            <FaArrowLeft className="text-sm" />
                            <span>Back</span>
                        </button>
                    </div>
                    <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-12 text-center">
                        <FaBook className="text-5xl text-[#EDEFF5]/10 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-[#EDEFF5] mb-2">
                            No Content Available Yet
                        </h2>
                        <p className="text-[#EDEFF5]/60">
                            The instructor is still preparing the course content.
                            Please check back later.
                        </p>
                        <Link href={`/courses/${course._id}`}>
                            <Button className="mt-6 bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80">
                                Back to Course Details
                            </Button>
                        </Link>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#10182B] p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-[#EDEFF5]/60 hover:text-[#EDEFF5] transition-colors mb-2"
                        >
                            <FaArrowLeft className="text-sm" />
                            <span>Back to Course</span>
                        </button>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#EDEFF5]">
                            {course.title}
                        </h1>
                        <p className="text-[#EDEFF5]/50 text-sm mt-1">
                            {totalLessons} lessons • {completedLessons} completed
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Chip className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20">
                            {course.level}
                        </Chip>
                        <Chip className="bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {course.category}
                        </Chip>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar - Lesson List */}
                    <div className="lg:col-span-1">
                        <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-4 sticky top-24 max-h-[calc(100vh-180px)] overflow-y-auto">
                            <h3 className="text-sm font-semibold text-[#EDEFF5] mb-3 px-2">
                                Course Content
                            </h3>
                            <div className="space-y-1">
                                {lessons.map((lesson, index) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setCurrentLessonIndex(index)}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                                            index === currentLessonIndex
                                                ? "bg-[#A78BFA]/15 text-[#A78BFA] border border-[#A78BFA]/30"
                                                : "text-[#EDEFF5]/60 hover:text-[#EDEFF5] hover:bg-[#10182B]"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-[#EDEFF5]/40">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-sm truncate flex-1">
                                                {lesson.title || `Lesson ${index + 1}`}
                                            </span>
                                            {lesson.codeExamples?.length > 0 && (
                                                <FaCode className="text-[#A78BFA] text-[10px]" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {currentLesson && (
                            <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6">
                                {/* Lesson Header */}
                                <div className="mb-6 pb-4 border-b border-[#A78BFA]/10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm text-[#EDEFF5]/40">
                                            Lesson {currentLessonIndex + 1} of {totalLessons}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#EDEFF5]">
                                        {currentLesson.title}
                                    </h2>
                                    <p className="text-[#EDEFF5]/60 mt-1">
                                        {currentLesson.description}
                                    </p>
                                </div>

                                {/* Lesson Content */}
                                <div className="prose prose-invert max-w-none">
                                    <div className="text-[#EDEFF5]/80 leading-relaxed whitespace-pre-wrap">
                                        {currentLesson.content || "No content available for this lesson."}
                                    </div>
                                </div>

                                {/* Code Examples */}
                                {currentLesson.codeExamples && currentLesson.codeExamples.length > 0 && (
                                    <div className="mt-6">
                                        <button
                                            onClick={() => toggleSection("code")}
                                            className="flex items-center justify-between w-full text-left text-[#EDEFF5] font-semibold p-3 bg-[#10182B] rounded-xl hover:bg-[#10182B]/80 transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                <FaCode className="text-[#A78BFA]" />
                                                Code Examples ({currentLesson.codeExamples.length})
                                            </span>
                                            <span className="text-[#EDEFF5]/40">
                                                {expandedSections.code ? <FaChevronLeft /> : <FaChevronRight />}
                                            </span>
                                        </button>
                                        {expandedSections.code && (
                                            <div className="mt-3 space-y-4">
                                                {currentLesson.codeExamples.map((example, idx) => (
                                                    <div
                                                        key={example.id}
                                                        className="bg-[#10182B] border border-[#A78BFA]/10 rounded-xl p-4"
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-sm font-medium text-[#EDEFF5]">
                                                                Example {idx + 1}: {example.title || "Untitled"}
                                                            </span>
                                                            <Chip size="sm" className="bg-[#A78BFA]/10 text-[#A78BFA] border-0">
                                                                {example.language}
                                                            </Chip>
                                                        </div>
                                                        <pre className="bg-[#0B0F19] rounded-lg p-4 overflow-x-auto">
                                                            <code className="text-sm text-[#EDEFF5]/80 font-mono whitespace-pre">
                                                                {example.code || "// No code provided"}
                                                            </code>
                                                        </pre>
                                                        {example.explanation && (
                                                            <p className="text-[#EDEFF5]/60 text-sm mt-3">
                                                                {example.explanation}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Practice Questions */}
                                {currentLesson.practiceQuestions && currentLesson.practiceQuestions.length > 0 && (
                                    <div className="mt-6">
                                        <button
                                            onClick={() => toggleSection("questions")}
                                            className="flex items-center justify-between w-full text-left text-[#EDEFF5] font-semibold p-3 bg-[#10182B] rounded-xl hover:bg-[#10182B]/80 transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                <FaQuestionCircle className="text-[#A78BFA]" />
                                                Practice Questions ({currentLesson.practiceQuestions.length})
                                            </span>
                                            <span className="text-[#EDEFF5]/40">
                                                {expandedSections.questions ? <FaChevronLeft /> : <FaChevronRight />}
                                            </span>
                                        </button>
                                        {expandedSections.questions && (
                                            <div className="mt-3 space-y-4">
                                                {currentLesson.practiceQuestions.map((q, idx) => (
                                                    <div
                                                        key={q.id}
                                                        className="bg-[#10182B] border border-[#A78BFA]/10 rounded-xl p-4"
                                                    >
                                                        <p className="text-[#EDEFF5] font-medium mb-2">
                                                            {idx + 1}. {q.question}
                                                        </p>
                                                        <div className="bg-[#0B0F19] rounded-lg p-3">
                                                            <p className="text-[#EDEFF5]/70 text-sm">
                                                                <span className="text-[#A78BFA]">Answer:</span> {q.answer}
                                                            </p>
                                                            {q.hint && (
                                                                <p className="text-[#EDEFF5]/40 text-sm mt-1">
                                                                    <span className="text-yellow-400">Hint:</span> {q.hint}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* YouTube Links */}
                                {currentLesson.youtubeLinks && currentLesson.youtubeLinks.length > 0 && (
                                    <div className="mt-6">
                                        <button
                                            onClick={() => toggleSection("youtube")}
                                            className="flex items-center justify-between w-full text-left text-[#EDEFF5] font-semibold p-3 bg-[#10182B] rounded-xl hover:bg-[#10182B]/80 transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                <FaYoutube className="text-red-400" />
                                                YouTube Resources ({currentLesson.youtubeLinks.length})
                                            </span>
                                            <span className="text-[#EDEFF5]/40">
                                                {expandedSections.youtube ? <FaChevronLeft /> : <FaChevronRight />}
                                            </span>
                                        </button>
                                        {expandedSections.youtube && (
                                            <div className="mt-3 space-y-2">
                                                {currentLesson.youtubeLinks.map((link, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 text-[#EDEFF5]/60 hover:text-[#A78BFA] transition-colors p-2 rounded-lg hover:bg-[#A78BFA]/5"
                                                    >
                                                        <FaYoutube className="text-red-400" />
                                                        <span className="text-sm truncate">{link}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Quick Tips */}
                                {currentLesson.quickTips && currentLesson.quickTips.length > 0 && (
                                    <div className="mt-6">
                                        <button
                                            onClick={() => toggleSection("tips")}
                                            className="flex items-center justify-between w-full text-left text-[#EDEFF5] font-semibold p-3 bg-[#10182B] rounded-xl hover:bg-[#10182B]/80 transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                <FaLightbulb className="text-yellow-400" />
                                                Quick Tips ({currentLesson.quickTips.length})
                                            </span>
                                            <span className="text-[#EDEFF5]/40">
                                                {expandedSections.tips ? <FaChevronLeft /> : <FaChevronRight />}
                                            </span>
                                        </button>
                                        {expandedSections.tips && (
                                            <div className="mt-3 space-y-2">
                                                {currentLesson.quickTips.map((tip, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-start gap-3 p-3 bg-[#10182B] rounded-lg border border-[#A78BFA]/10"
                                                    >
                                                        <FaLightbulb className="text-yellow-400 text-sm mt-0.5" />
                                                        <span className="text-[#EDEFF5]/70 text-sm">{tip}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#A78BFA]/10">
                                    <Button
                                        onPress={handlePrevLesson}
                                        isDisabled={currentLessonIndex === 0}
                                        className="bg-[#10182B] border border-[#A78BFA]/20 text-[#EDEFF5] hover:bg-[#A78BFA]/10"
                                    >
                                        <FaChevronLeft />
                                        Previous
                                    </Button>
                                    <div className="text-sm text-[#EDEFF5]/40">
                                        {currentLessonIndex + 1} / {totalLessons}
                                    </div>
                                    <Button
                                        onPress={handleNextLesson}
                                        isDisabled={currentLessonIndex === totalLessons - 1}
                                        className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                                    >
                                        Next
                                        <FaChevronRight />
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseContentClient;