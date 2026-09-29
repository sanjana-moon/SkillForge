"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Spinner } from "@heroui/react";
import {
    FaRobot,
    FaPlus,
    FaTrash,
    FaPaperPlane,
    FaUser,
    FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
    createMentorSession,
    sendMentorMessage,
    deleteMentorSession,
} from "@/lib/api/courses/actions";
import { getMentorSession } from "@/lib/api/courses/data";
import type { MentorSession, MentorMessage } from "@/lib/api/courses/data";

interface AIMentorClientProps {
    initialSessions: MentorSession[];
}

const AIMentorClient = ({ initialSessions }: AIMentorClientProps) => {
    const router = useRouter();
    const [sessions, setSessions] = useState<MentorSession[]>(initialSessions);
    const [currentSession, setCurrentSession] = useState<MentorSession | null>(
        initialSessions.length > 0 ? initialSessions[0] : null
    );
    const [messages, setMessages] = useState<MentorMessage[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isLoadingSession, setIsLoadingSession] = useState(false);

    // ✅ Ref for the scrollable messages list (was messagesEndRef)
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load session messages when current session changes
    useEffect(() => {
        if (currentSession) {
            setMessages(currentSession.messages || []);
        } else {
            setMessages([]);
        }
    }, [currentSession]);

    // ✅ Scroll only the messages container, never the page
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const isNearBottom =
            container.scrollHeight -
                container.scrollTop -
                container.clientHeight <
            120;

        if (isNearBottom) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    // Focus input on load
    useEffect(() => {
        if (currentSession) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [currentSession]);

    const handleCreateSession = async () => {
        try {
            setIsCreating(true);
            const result = await createMentorSession();

            if (result.success && result.data) {
                const newSession: MentorSession = {
                    _id: result.data.insertedId,
                    userEmail: "",
                    title: "New Conversation",
                    messages: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                setSessions((prev) => [newSession, ...prev]);
                setCurrentSession(newSession);
                toast.success("New conversation started!");
            } else {
                toast.error(result.error || "Failed to create session");
            }
        } catch (error) {
            console.error("Error creating session:", error);
            toast.error("Something went wrong");
        } finally {
            setIsCreating(false);
        }
    };

    const handleSelectSession = async (session: MentorSession) => {
        if (session._id === currentSession?._id) return;

        setIsLoadingSession(true);
        try {
            const fullSession = await getMentorSession(session._id!);
            setCurrentSession(fullSession);
        } catch (error) {
            console.error("Error loading session:", error);
            toast.error("Failed to load session");
        } finally {
            setIsLoadingSession(false);
        }
    };

    const handleDeleteSession = async (sessionId: string) => {
        if (
            !confirm("Are you sure you want to delete this conversation?")
        )
            return;

        try {
            setIsDeleting(sessionId);
            const result = await deleteMentorSession(sessionId);

            if (result.success) {
                setSessions((prev) => prev.filter((s) => s._id !== sessionId));

                if (currentSession?._id === sessionId) {
                    const remainingSessions = sessions.filter(
                        (s) => s._id !== sessionId
                    );
                    setCurrentSession(
                        remainingSessions.length > 0
                            ? remainingSessions[0]
                            : null
                    );
                }

                toast.success("Conversation deleted");
            } else {
                toast.error(result.error || "Failed to delete session");
            }
        } catch (error) {
            console.error("Error deleting session:", error);
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(null);
        }
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;
        if (!currentSession?._id) {
            toast.error("No active session");
            return;
        }

        const userMessage: MentorMessage = {
            role: "user",
            content: inputMessage.trim(),
            createdAt: new Date(),
        };

        // Optimistically add user message
        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsLoading(true);

        try {
            const result = await sendMentorMessage(
                currentSession._id,
                userMessage.content
            );

            if (result.success && result.data) {
                const assistantMessage: MentorMessage = {
                    role: "assistant",
                    content: result.data.reply.content,
                    createdAt: new Date(),
                };

                setMessages((prev) => [...prev, assistantMessage]);

                // Update session list title if needed
                const updatedSessions = sessions.map((s) =>
                    s._id === currentSession._id
                        ? {
                              ...s,
                              title:
                                  s.title === "New Conversation"
                                      ? userMessage.content.slice(0, 40) + "..."
                                      : s.title,
                              updatedAt: new Date(),
                          }
                        : s
                );
                setSessions(updatedSessions);
            } else {
                setMessages((prev) => prev.filter((m) => m !== userMessage));
                toast.error(result.error || "Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => prev.filter((m) => m !== userMessage));
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-[#1C2E24] p-4 md:p-6">
            {/* ✅ dvh instead of vh — prevents mobile viewport jumps */}
            <div className="mx-auto max-w-7xl h-[calc(100dvh-120px)]">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#EBE3D5] flex items-center gap-3">
                                <FaRobot className="text-[#C5A059]" />
                                AI Mentor
                            </h1>
                            <p className="text-[#EBE3D5]/50 text-sm mt-1">
                                Your personal learning assistant powered by AI
                            </p>
                        </div>
                        <Button
                            onPress={handleCreateSession}
                            className="bg-[#C5A059] text-[#1C2E24] font-semibold hover:bg-[#C5A059]/80"
                        >
                            <FaPlus />
                            New Conversation
                        </Button>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 min-h-0">
                        {/* Sidebar - Sessions List */}
                        <Card className="lg:col-span-1 bg-[#3E5C4B] border border-[#C5A059]/20 rounded-2xl p-3 overflow-y-auto max-h-[calc(100dvh-220px)]">
                            {sessions.length === 0 ? (
                                <div className="text-center py-8">
                                    <FaRobot className="text-4xl text-[#EBE3D5]/10 mx-auto mb-3" />
                                    <p className="text-[#EBE3D5]/40 text-sm">
                                        No conversations yet
                                    </p>
                                    <Button
                                        onPress={handleCreateSession}
                                        size="sm"
                                        className="mt-3 bg-[#C5A059] text-[#1C2E24] font-semibold hover:bg-[#C5A059]/80"
                                    >
                                        Start New
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {sessions.map((session) => (
                                        <div
                                            key={session._id}
                                            className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                                                currentSession?._id ===
                                                session._id
                                                    ? "bg-[#C5A059]/15 border border-[#C5A059]/30"
                                                    : "hover:bg-[#1C2E24] border border-transparent"
                                            }`}
                                            onClick={() =>
                                                handleSelectSession(session)
                                            }
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[#EBE3D5] truncate">
                                                    {session.title}
                                                </p>
                                                <p className="text-xs text-[#EBE3D5]/40 flex items-center gap-1 mt-0.5">
                                                    <FaCalendarAlt className="text-[10px]" />
                                                    {formatDate(
                                                        session.updatedAt ||
                                                            session.createdAt
                                                    )}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteSession(
                                                        session._id!
                                                    );
                                                }}
                                                disabled={
                                                    isDeleting === session._id
                                                }
                                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-[#EBE3D5]/40 hover:text-red-400 transition-all"
                                            >
                                                {isDeleting === session._id ? (
                                                    <Spinner
                                                        size="sm"
                                                        color="danger"
                                                    />
                                                ) : (
                                                    <FaTrash className="text-xs" />
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* Chat Area */}
                        <Card className="lg:col-span-3 bg-[#3E5C4B] border border-[#C5A059]/20 rounded-2xl flex flex-col overflow-hidden">
                            {!currentSession ? (
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                    <FaRobot className="text-6xl text-[#EBE3D5]/10 mb-4" />
                                    <h3 className="text-xl font-semibold text-[#EBE3D5] mb-2">
                                        Welcome to AI Mentor
                                    </h3>
                                    <p className="text-[#EBE3D5]/50 max-w-md">
                                        Start a new conversation to get
                                        personalized learning guidance, career
                                        advice, and answers to your questions.
                                    </p>
                                    <Button
                                        onPress={handleCreateSession}
                                        className="mt-6 bg-[#C5A059] text-[#1C2E24] font-semibold hover:bg-[#C5A059]/80"
                                    >
                                        <FaPlus />
                                        Start New Conversation
                                    </Button>
                                </div>
                            ) : isLoadingSession ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <Spinner size="lg" />
                                </div>
                            ) : (
                                <>
                                    {/* ✅ Messages — ref attached here for scoped scroll */}
                                    <div
                                        ref={messagesContainerRef}
                                        className="flex-1 overflow-y-auto p-4 space-y-4"
                                    >
                                        {messages.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full text-center">
                                                <FaRobot className="text-4xl text-[#EBE3D5]/10 mb-3" />
                                                <p className="text-[#EBE3D5]/40 text-sm">
                                                    Ask me anything about
                                                    learning, career, or
                                                    courses!
                                                </p>
                                            </div>
                                        ) : (
                                            <AnimatePresence>
                                                {messages.map(
                                                    (message, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{
                                                                opacity: 0,
                                                                y: 20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.3,
                                                            }}
                                                            className={`flex ${
                                                                message.role ===
                                                                "user"
                                                                    ? "justify-end"
                                                                    : "justify-start"
                                                            }`}
                                                        >
                                                            <div
                                                                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                                                    message.role ===
                                                                    "user"
                                                                        ? "bg-[#C5A059] text-[#1C2E24]"
                                                                        : "bg-[#1C2E24] text-[#EBE3D5] border border-[#C5A059]/10"
                                                                }`}
                                                            >
                                                                <div className="flex items-start gap-2">
                                                                    {message.role ===
                                                                        "assistant" && (
                                                                        <FaRobot className="text-[#C5A059] text-sm mt-0.5 shrink-0" />
                                                                    )}
                                                                    {message.role ===
                                                                        "user" && (
                                                                        <FaUser className="text-[#1C2E24]/60 text-sm mt-0.5 shrink-0" />
                                                                    )}
                                                                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                                                        {
                                                                            message.content
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <p
                                                                    className={`text-[10px] mt-1 ${
                                                                        message.role ===
                                                                        "user"
                                                                            ? "text-[#1C2E24]/60"
                                                                            : "text-[#EBE3D5]/30"
                                                                    }`}
                                                                >
                                                                    {formatDate(
                                                                        message.createdAt
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )
                                                )}
                                            </AnimatePresence>
                                        )}

                                        {isLoading && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 20,
                                                }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex justify-start"
                                            >
                                                <div className="bg-[#1C2E24] border border-[#C5A059]/10 rounded-2xl px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <FaRobot className="text-[#C5A059] text-sm" />
                                                        <div className="flex gap-1">
                                                            <span
                                                                className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce"
                                                                style={{
                                                                    animationDelay:
                                                                        "0ms",
                                                                }}
                                                            />
                                                            <span
                                                                className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce"
                                                                style={{
                                                                    animationDelay:
                                                                        "150ms",
                                                                }}
                                                            />
                                                            <span
                                                                className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce"
                                                                style={{
                                                                    animationDelay:
                                                                        "300ms",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 border-t border-[#C5A059]/10">
                                        <div className="flex gap-3">
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                placeholder="Ask your AI Mentor..."
                                                value={inputMessage}
                                                onChange={(e) =>
                                                    setInputMessage(
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={handleKeyPress}
                                                disabled={isLoading}
                                                className="flex-1 px-4 py-3 bg-[#1C2E24] border border-[#C5A059]/20 rounded-xl text-[#EBE3D5] placeholder:text-[#EBE3D5]/40 focus:outline-none focus:border-[#C5A059] transition-colors disabled:opacity-50"
                                            />
                                            <Button
                                                onPress={handleSendMessage}
                                                isDisabled={
                                                    !inputMessage.trim() ||
                                                    isLoading
                                                }
                                                className="bg-[#C5A059] text-[#1C2E24] font-semibold hover:bg-[#C5A059]/80 px-6 rounded-xl"
                                            >
                                                <FaPaperPlane />
                                                Send
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIMentorClient;
