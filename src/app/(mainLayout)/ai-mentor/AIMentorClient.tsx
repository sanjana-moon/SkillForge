"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Input, Spinner } from "@heroui/react";
import {
    FaRobot,
    FaPlus,
    FaTrash,
    FaPaperPlane,
    FaUser,
    FaSpinner,
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
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load session messages when current session changes
    useEffect(() => {
        if (currentSession) {
            setMessages(currentSession.messages || []);
        } else {
            setMessages([]);
        }
    }, [currentSession]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
            // Fetch full session with messages
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
        if (!confirm("Are you sure you want to delete this conversation?")) return;

        try {
            setIsDeleting(sessionId);
            const result = await deleteMentorSession(sessionId);

            if (result.success) {
                setSessions((prev) => prev.filter((s) => s._id !== sessionId));

                if (currentSession?._id === sessionId) {
                    const remainingSessions = sessions.filter((s) => s._id !== sessionId);
                    setCurrentSession(remainingSessions.length > 0 ? remainingSessions[0] : null);
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
            const result = await sendMentorMessage(currentSession._id, userMessage.content);

            if (result.success && result.data) {
                const assistantMessage: MentorMessage = {
                    role: "assistant",
                    content: result.data.reply.content,
                    createdAt: new Date(),
                };

                setMessages((prev) => [...prev, assistantMessage]);

                // Update session list with new title if needed
                if (currentSession.title === "New Conversation") {
                    const updatedSessions = sessions.map((s) =>
                        s._id === currentSession._id
                            ? { ...s, title: userMessage.content.slice(0, 40) + "..." }
                            : s
                    );
                    setSessions(updatedSessions);
                }

                // Update session updated time
                const updatedSessions = sessions.map((s) =>
                    s._id === currentSession._id
                        ? { ...s, updatedAt: new Date() }
                        : s
                );
                setSessions(updatedSessions);
            } else {
                // Remove optimistic message on error
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
        <div className="min-h-screen bg-[#10182B] p-4 md:p-6">
            <div className="mx-auto max-w-7xl h-[calc(100vh-120px)]">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#EDEFF5] flex items-center gap-3">
                                <FaRobot className="text-[#A78BFA]" />
                                AI Mentor
                            </h1>
                            <p className="text-[#EDEFF5]/50 text-sm mt-1">
                                Your personal learning assistant powered by AI
                            </p>
                        </div>
                        <Button
                            onPress={handleCreateSession}
                            className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                        >
                            <FaPlus />
                            New Conversation
                        </Button>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 min-h-0">
                        {/* Sidebar - Sessions List */}
                        <Card className="lg:col-span-1 bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl p-3 overflow-y-auto max-h-[calc(100vh-220px)]">
                            {sessions.length === 0 ? (
                                <div className="text-center py-8">
                                    <FaRobot className="text-4xl text-[#EDEFF5]/10 mx-auto mb-3" />
                                    <p className="text-[#EDEFF5]/40 text-sm">
                                        No conversations yet
                                    </p>
                                    <Button
                                        onPress={handleCreateSession}
                                        size="sm"
                                        className="mt-3 bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
                                    >
                                        Start New
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {sessions.map((session) => (
                                        <div
                                            key={session._id}
                                            className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${currentSession?._id === session._id
                                                    ? "bg-[#A78BFA]/15 border border-[#A78BFA]/30"
                                                    : "hover:bg-[#10182B] border border-transparent"
                                                }`}
                                            onClick={() => handleSelectSession(session)}
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[#EDEFF5] truncate">
                                                    {session.title}
                                                </p>
                                                <p className="text-xs text-[#EDEFF5]/40 flex items-center gap-1 mt-0.5">
                                                    <FaCalendarAlt className="text-[10px]" />
                                                    {formatDate(session.updatedAt || session.createdAt)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteSession(session._id!);
                                                }}
                                                disabled={isDeleting === session._id}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-[#EDEFF5]/40 hover:text-red-400 transition-all"
                                            >
                                                {isDeleting === session._id ? (
                                                    <Spinner size="sm" color="danger" />
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
                        <Card className="lg:col-span-3 bg-[#1C2740] border border-[#A78BFA]/20 rounded-2xl flex flex-col overflow-hidden">
                            {!currentSession ? (
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                    <FaRobot className="text-6xl text-[#EDEFF5]/10 mb-4" />
                                    <h3 className="text-xl font-semibold text-[#EDEFF5] mb-2">
                                        Welcome to AI Mentor
                                    </h3>
                                    <p className="text-[#EDEFF5]/50 max-w-md">
                                        Start a new conversation to get personalized learning guidance,
                                        career advice, and answers to your questions.
                                    </p>
                                    <Button
                                        onPress={handleCreateSession}
                                        className="mt-6 bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80"
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
                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        {messages.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full text-center">
                                                <FaRobot className="text-4xl text-[#EDEFF5]/10 mb-3" />
                                                <p className="text-[#EDEFF5]/40 text-sm">
                                                    Ask me anything about learning, career, or courses!
                                                </p>
                                            </div>
                                        ) : (
                                            <AnimatePresence>
                                                {messages.map((message, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={`flex ${message.role === "user"
                                                                ? "justify-end"
                                                                : "justify-start"
                                                            }`}
                                                    >
                                                        <div
                                                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                                                                    ? "bg-[#A78BFA] text-[#10182B]"
                                                                    : "bg-[#10182B] text-[#EDEFF5] border border-[#A78BFA]/10"
                                                                }`}
                                                        >
                                                            <div className="flex items-start gap-2">
                                                                {message.role === "assistant" && (
                                                                    <FaRobot className="text-[#A78BFA] text-sm mt-0.5 shrink-0" />
                                                                )}
                                                                {message.role === "user" && (
                                                                    <FaUser className="text-[#10182B]/60 text-sm mt-0.5 shrink-0" />
                                                                )}
                                                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                                                    {message.content}
                                                                </div>
                                                            </div>
                                                            <p className={`text-[10px] mt-1 ${message.role === "user"
                                                                    ? "text-[#10182B]/60"
                                                                    : "text-[#EDEFF5]/30"
                                                                }`}>
                                                                {formatDate(message.createdAt)}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        )}
                                        {isLoading && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex justify-start"
                                            >
                                                <div className="bg-[#10182B] border border-[#A78BFA]/10 rounded-2xl px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <FaRobot className="text-[#A78BFA] text-sm" />
                                                        <div className="flex gap-1">
                                                            <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                            <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                            <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 border-t border-[#A78BFA]/10">
                                        <div className="flex gap-3">
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                placeholder="Ask your AI Mentor..."
                                                value={inputMessage}
                                                onChange={(e) => setInputMessage(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                disabled={isLoading}
                                                className="flex-1 px-4 py-3 bg-[#10182B] border border-[#A78BFA]/20 rounded-xl text-[#EDEFF5] placeholder:text-[#EDEFF5]/40 focus:outline-none focus:border-[#A78BFA] transition-colors disabled:opacity-50"
                                            />
                                            <Button
                                                onPress={handleSendMessage}
                                                isDisabled={!inputMessage.trim() || isLoading}
                                                className="bg-[#A78BFA] text-[#10182B] font-semibold hover:bg-[#A78BFA]/80 px-6 rounded-xl"
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