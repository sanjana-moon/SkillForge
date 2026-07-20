"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    Button,
    Input,
    TextArea,
    Chip,
    Spinner,
} from "@heroui/react";
import {
    FaPlus,
    FaTrash,
    FaCode,
    FaQuestionCircle,
    FaYoutube,
    FaLightbulb,
    FaRobot,
    FaArrowLeft,
    FaSave,
    FaPlay,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { saveCourseContent } from "@/lib/api/courses/actions";

interface CodeExample {
    id: string;
    title: string;
    code: string;
    language: string;
    explanation: string;
}

interface PracticeQuestion {
    id: string;
    question: string;
    answer: string;
    hint: string;
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    content: string;
    codeExamples: CodeExample[];
    practiceQuestions: PracticeQuestion[];
    youtubeLinks: string[];
    quickTips: string[];
}

interface AddCourseContentClientProps {
    courseId: string;
    courseTitle: string;
}

const AddCourseContentClient = ({
    courseId,
    courseTitle,
}: AddCourseContentClientProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [lessons, setLessons] = useState<Lesson[]>([
        {
            id: crypto.randomUUID(),
            title: "",
            description: "",
            content: "",
            codeExamples: [],
            practiceQuestions: [],
            youtubeLinks: [],
            quickTips: [],
        },
    ]);
    const [activeLessonIndex, setActiveLessonIndex] = useState(0);

    const handleAddLesson = () => {
        setLessons([
            ...lessons,
            {
                id: crypto.randomUUID(),
                title: "",
                description: "",
                content: "",
                codeExamples: [],
                practiceQuestions: [],
                youtubeLinks: [],
                quickTips: [],
            },
        ]);
        setActiveLessonIndex(lessons.length);
    };

    const handleRemoveLesson = (index: number) => {
        if (lessons.length === 1) {
            toast.error("You need at least one lesson");
            return;
        }
        const newLessons = lessons.filter((_, i) => i !== index);
        setLessons(newLessons);
        if (activeLessonIndex >= newLessons.length) {
            setActiveLessonIndex(newLessons.length - 1);
        }
    };

    const handleLessonChange = (index: number, field: keyof Lesson, value: any) => {
        const updatedLessons = [...lessons];
        updatedLessons[index] = { ...updatedLessons[index], [field]: value };
        setLessons(updatedLessons);
    };

    const handleAddCodeExample = (lessonIndex: number) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].codeExamples.push({
            id: crypto.randomUUID(),
            title: "",
            code: "",
            language: "javascript",
            explanation: "",
        });
        setLessons(updatedLessons);
    };

    const handleRemoveCodeExample = (lessonIndex: number, exampleIndex: number) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].codeExamples = updatedLessons[lessonIndex].codeExamples.filter(
            (_, i) => i !== exampleIndex
        );
        setLessons(updatedLessons);
    };

    const handleCodeExampleChange = (
        lessonIndex: number,
        exampleIndex: number,
        field: keyof CodeExample,
        value: string
    ) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].codeExamples[exampleIndex] = {
            ...updatedLessons[lessonIndex].codeExamples[exampleIndex],
            [field]: value,
        };
        setLessons(updatedLessons);
    };

    const handleAddPracticeQuestion = (lessonIndex: number) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].practiceQuestions.push({
            id: crypto.randomUUID(),
            question: "",
            answer: "",
            hint: "",
        });
        setLessons(updatedLessons);
    };

    const handleRemovePracticeQuestion = (lessonIndex: number, questionIndex: number) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].practiceQuestions = updatedLessons[lessonIndex].practiceQuestions.filter(
            (_, i) => i !== questionIndex
        );
        setLessons(updatedLessons);
    };

    const handlePracticeQuestionChange = (
        lessonIndex: number,
        questionIndex: number,
        field: keyof PracticeQuestion,
        value: string
    ) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].practiceQuestions[questionIndex] = {
            ...updatedLessons[lessonIndex].practiceQuestions[questionIndex],
            [field]: value,
        };
        setLessons(updatedLessons);
    };

    const handleAddYoutubeLink = (lessonIndex: number) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].youtubeLinks.push("");
        setLessons(updatedLessons);
    };

    const handleRemoveYoutubeLink = (lessonIndex: number, linkIndex: number) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].youtubeLinks = updatedLessons[lessonIndex].youtubeLinks.filter(
            (_, i) => i !== linkIndex
        );
        setLessons(updatedLessons);
    };

    const handleYoutubeLinkChange = (lessonIndex: number, linkIndex: number, value: string) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].youtubeLinks[linkIndex] = value;
        setLessons(updatedLessons);
    };

    const handleAddQuickTip = (lessonIndex: number) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].quickTips.push("");
        setLessons(updatedLessons);
    };

    const handleRemoveQuickTip = (lessonIndex: number, tipIndex: number) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].quickTips = updatedLessons[lessonIndex].quickTips.filter(
            (_, i) => i !== tipIndex
        );
        setLessons(updatedLessons);
    };

    const handleQuickTipChange = (lessonIndex: number, tipIndex: number, value: string) => {
        const updatedLessons = [...lessons];
        updatedLessons[lessonIndex].quickTips[tipIndex] = value;
        setLessons(updatedLessons);
    };

    const handleSave = async () => {
        // Validate lessons
        for (const lesson of lessons) {
            if (!lesson.title.trim()) {
                toast.error("Please add a title for all lessons");
                return;
            }
            if (!lesson.description.trim()) {
                toast.error(`Please add a description for "${lesson.title}"`);
                return;
            }
            if (!lesson.content.trim()) {
                toast.error(`Please add content for "${lesson.title}"`);
                return;
            }
        }

        setSaving(true);
        try {
            const content = { lessons };
            const result = await saveCourseContent(courseId, content);

            if (result.success) {
                toast.success("Course content saved successfully!");
                router.push(`/dashboard/instructor/manage-courses`);
            } else {
                toast.error(result.error || "Failed to save course content");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to save course content");
        } finally {
            setSaving(false);
        }
    };

    const handleAskAI = (lessonContent: string) => {
        router.push(`/ai-mentor?context=course&content=${encodeURIComponent(lessonContent)}`);
    };

    const languages = [
        "javascript",
        "python",
        "java",
        "csharp",
        "cpp",
        "typescript",
        "html",
        "css",
        "sql",
        "php",
        "ruby",
        "go",
        "rust",
    ];

    console.log("courseId:", courseId);

    return (
        <div className="min-h-screen bg-[#10182B] p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-[#EDEFF5]/60 hover:text-[#EDEFF5] transition-colors mb-2"
                        >
                            <FaArrowLeft className="text-sm" />
                            <span>Back</span>
                        </button>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#EDEFF5]">
                            Add Course Content
                        </h1>
                        <p className="text-[#EDEFF5]/60 text-sm mt-1">
                            {courseTitle} - Add lessons, code examples, practice questions, and more
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onPress={handleAddLesson}
                            className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/30 hover:bg-[#A78BFA]/20"
                        >
                            <FaPlus />
                            Add Lesson
                        </Button>
                        <Button
                            onPress={handleSave}
                            className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                        >
                            <FaSave />
                            Save Content
                        </Button>
                    </div>
                </div>

                {/* Lesson Navigation */}
                <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
                    {lessons.map((lesson, index) => (
                        <Button
                            key={lesson.id}
                            onPress={() => setActiveLessonIndex(index)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeLessonIndex === index
                                ? "bg-[#A78BFA] text-[#10182B]"
                                : "bg-[#1C2740] text-[#EDEFF5]/60 hover:text-[#EDEFF5] border border-[#A78BFA]/20"
                                }`}
                        >
                            Lesson {index + 1}
                            {lesson.title && (
                                <span className="ml-2 text-xs opacity-70">- {lesson.title}</span>
                            )}
                        </Button>
                    ))}
                </div>

                {/* Lesson Content */}
                {lessons.map((lesson, index) => (
                    <div
                        key={lesson.id}
                        className={activeLessonIndex === index ? "block" : "hidden"}
                    >
                        <Card className="bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-6 shadow-xl">
                            {/* Lesson Header */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#A78BFA]/10">
                                <h2 className="text-xl font-bold text-[#EDEFF5]">
                                    Lesson {index + 1}
                                </h2>
                                <Button
                                    onPress={() => handleRemoveLesson(index)}
                                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                >
                                    <FaTrash />
                                    Remove Lesson
                                </Button>
                            </div>

                            {/* Lesson Title */}
                            <div className="mb-4">
                                <label className="block text-[#EDEFF5] text-sm font-medium mb-2">
                                    Lesson Title *
                                </label>
                                <Input
                                    placeholder="Enter lesson title"
                                    value={lesson.title}
                                    onChange={(e) =>
                                        handleLessonChange(index, "title", e.target.value)
                                    }
                                    className="bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40 w-full"
                                />
                            </div>

                            {/* Lesson Description */}
                            <div className="mb-4">
                                <label className="block text-[#EDEFF5] text-sm font-medium mb-2">
                                    Lesson Description *
                                </label>
                                <TextArea
                                    placeholder="Brief description of what this lesson covers"
                                    value={lesson.description}
                                    onChange={(e) =>
                                        handleLessonChange(index, "description", e.target.value)
                                    }
                                    rows={2}
                                    className="bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40 w-full"
                                />
                            </div>

                            {/* Lesson Content */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-[#EDEFF5] text-sm font-medium">
                                        Lesson Content *
                                    </label>
                                    <Button
                                        onPress={() => handleAskAI(lesson.content)}
                                        className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/30 hover:bg-[#A78BFA]/20 text-sm"
                                    >
                                        <FaRobot />
                                        Ask AI Mentor
                                    </Button>
                                </div>
                                <TextArea
                                    placeholder="Write the main content of the lesson..."
                                    value={lesson.content}
                                    onChange={(e) =>
                                        handleLessonChange(index, "content", e.target.value)
                                    }
                                    rows={8}
                                    className="bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40 font-mono w-full"
                                />
                            </div>

                            {/* Code Examples */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
                                        <FaCode className="text-indigo-400 text-lg" />
                                        Code Examples
                                    </h3>
                                    <Button
                                        onPress={() => handleAddCodeExample(index)}
                                        size="sm"
                                        className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/30 hover:bg-[#A78BFA]/20"
                                    >
                                        <FaPlus className="text-xs" />
                                        Add Example
                                    </Button>
                                </div>

                                {lesson.codeExamples.length === 0 ? (
                                    <div className="text-center py-6 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                                        <p className="text-slate-500 text-sm">
                                            No code examples added yet
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {lesson.codeExamples.map((example, exIndex) => (
                                            <Card
                                                key={example.id}
                                                className="bg-slate-900/60 border border-slate-800 shadow-xl rounded-xl p-5 backdrop-blur-sm"
                                            >
                                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                                                    <h4 className="text-sm font-semibold text-indigo-400 tracking-wide uppercase">
                                                        Example {exIndex + 1}
                                                    </h4>
                                                    <Button
                                                        onPress={() =>
                                                            handleRemoveCodeExample(index, exIndex)
                                                        }
                                                        isIconOnly
                                                        size="sm"
                                                        className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 min-w-0 w-8 h-8 rounded-lg border border-rose-500/20 transition-colors"
                                                    >
                                                        <FaTrash className="text-xs" />
                                                    </Button>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-slate-400 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                                                            Example Title
                                                        </label>
                                                        <Input
                                                            placeholder="e.g., Hello World Example"
                                                            value={example.title}
                                                            onChange={(e) =>
                                                                handleCodeExampleChange(
                                                                    index,
                                                                    exIndex,
                                                                    "title",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-slate-400 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                                                                Language
                                                            </label>
                                                            <select
                                                                value={example.language}
                                                                onChange={(e) =>
                                                                    handleCodeExampleChange(
                                                                        index,
                                                                        exIndex,
                                                                        "language",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-slate-950 text-slate-200 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                                                            >
                                                                {languages.map((lang) => (
                                                                    <option key={lang} value={lang} className="bg-slate-950 text-slate-200">
                                                                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-slate-400 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                                                            Code
                                                        </label>
                                                        <TextArea
                                                            placeholder="Paste your code here..."
                                                            value={example.code}
                                                            onChange={(e) =>
                                                                handleCodeExampleChange(
                                                                    index,
                                                                    exIndex,
                                                                    "code",
                                                                    e.target.value
                                                                )
                                                            }
                                                            rows={4}
                                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 placeholder:text-slate-600 font-mono text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-slate-400 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                                                            Explanation
                                                        </label>
                                                        <TextArea
                                                            placeholder="Explain what this code does..."
                                                            value={example.explanation}
                                                            onChange={(e) =>
                                                                handleCodeExampleChange(
                                                                    index,
                                                                    exIndex,
                                                                    "explanation",
                                                                    e.target.value
                                                                )
                                                            }
                                                            rows={2}
                                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Practice Questions */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
                                        <FaQuestionCircle className="text-indigo-400 text-lg" />
                                        Practice Questions
                                    </h3>
                                    <Button
                                        onPress={() => handleAddPracticeQuestion(index)}
                                        size="sm"
                                        className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/30 hover:bg-[#A78BFA]/20"
                                    >
                                        <FaPlus className="text-xs" />
                                        Add Question
                                    </Button>
                                </div>

                                {lesson.practiceQuestions.length === 0 ? (
                                    <div className="text-center py-6 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                                        <p className="text-slate-500 text-sm">
                                            No practice questions added yet
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {lesson.practiceQuestions.map((question, qIndex) => (
                                            <Card
                                                key={question.id}
                                                className="bg-slate-900/60 border border-slate-800 shadow-xl rounded-xl p-5 backdrop-blur-sm"
                                            >
                                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                                                    <h4 className="text-sm font-semibold text-indigo-400 tracking-wide uppercase">
                                                        Question {qIndex + 1}
                                                    </h4>
                                                    <Button
                                                        onPress={() =>
                                                            handleRemovePracticeQuestion(index, qIndex)
                                                        }
                                                        isIconOnly
                                                        size="sm"
                                                        className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 min-w-0 w-8 h-8 rounded-lg border border-rose-500/20 transition-colors"
                                                    >
                                                        <FaTrash className="text-xs" />
                                                    </Button>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-slate-400 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                                                            Question
                                                        </label>
                                                        <TextArea
                                                            placeholder="Enter the question..."
                                                            value={question.question}
                                                            onChange={(e) =>
                                                                handlePracticeQuestionChange(
                                                                    index,
                                                                    qIndex,
                                                                    "question",
                                                                    e.target.value
                                                                )
                                                            }
                                                            rows={2}
                                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-slate-400 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                                                            Answer
                                                        </label>
                                                        <TextArea
                                                            placeholder="Enter the answer..."
                                                            value={question.answer}
                                                            onChange={(e) =>
                                                                handlePracticeQuestionChange(
                                                                    index,
                                                                    qIndex,
                                                                    "answer",
                                                                    e.target.value
                                                                )
                                                            }
                                                            rows={2}
                                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-slate-400 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                                                            Hint (Optional)
                                                        </label>
                                                        <Input
                                                            placeholder="Provide a hint..."
                                                            value={question.hint}
                                                            onChange={(e) =>
                                                                handlePracticeQuestionChange(
                                                                    index,
                                                                    qIndex,
                                                                    "hint",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* YouTube Links */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-[#EDEFF5] flex items-center gap-2">
                                        <FaYoutube className="text-red-400" />
                                        YouTube Links
                                    </h3>
                                    <Button
                                        onPress={() => handleAddYoutubeLink(index)}
                                        size="sm"
                                        className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/30 hover:bg-[#A78BFA]/20"
                                    >
                                        <FaPlus />
                                        Add Link
                                    </Button>
                                </div>

                                {lesson.youtubeLinks.length === 0 ? (
                                    <p className="text-[#EDEFF5]/40 text-sm text-center py-4">
                                        No YouTube links added yet
                                    </p>
                                ) : (
                                    lesson.youtubeLinks.map((link, linkIndex) => (
                                        <div key={linkIndex} className="flex gap-2 mb-2">
                                            <Input
                                                placeholder="https://www.youtube.com/watch?v=..."
                                                value={link}
                                                onChange={(e) =>
                                                    handleYoutubeLinkChange(index, linkIndex, e.target.value)
                                                }
                                                className="flex-1 bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                            />
                                            <Button
                                                onPress={() => handleRemoveYoutubeLink(index, linkIndex)}
                                                isIconOnly
                                                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 min-w-0 w-10 h-10 rounded-lg"
                                            >
                                                <FaTrash className="text-sm" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Quick Tips */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-[#EDEFF5] flex items-center gap-2">
                                        <FaLightbulb className="text-yellow-400" />
                                        Quick Tips
                                    </h3>
                                    <Button
                                        onPress={() => handleAddQuickTip(index)}
                                        size="sm"
                                        className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/30 hover:bg-[#A78BFA]/20"
                                    >
                                        <FaPlus />
                                        Add Tip
                                    </Button>
                                </div>

                                {lesson.quickTips.length === 0 ? (
                                    <p className="text-[#EDEFF5]/40 text-sm text-center py-4">
                                        No quick tips added yet
                                    </p>
                                ) : (
                                    lesson.quickTips.map((tip, tipIndex) => (
                                        <div key={tipIndex} className="flex gap-2 mb-2">
                                            <Input
                                                placeholder="Enter a quick tip..."
                                                value={tip}
                                                onChange={(e) =>
                                                    handleQuickTipChange(index, tipIndex, e.target.value)
                                                }
                                                className="flex-1 bg-[#10182B]/50 border-[#A78BFA]/30 text-[#EDEFF5] placeholder:text-[#EDEFF5]/40"
                                            />
                                            <Button
                                                onPress={() => handleRemoveQuickTip(index, tipIndex)}
                                                isIconOnly
                                                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 min-w-0 w-10 h-10 rounded-lg"
                                            >
                                                <FaTrash className="text-sm" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>
                    </div>
                ))}

                {/* Bottom Actions */}
                <div className="flex justify-between mt-6">
                    <Button
                        onPress={handleAddLesson}
                        className="bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/30 hover:bg-[#A78BFA]/20"
                    >
                        <FaPlus />
                        Add Lesson
                    </Button>
                    <Button
                        onPress={handleSave}
                        className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80 px-8"
                    >
                        <FaSave />
                        Save All Content
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddCourseContentClient;