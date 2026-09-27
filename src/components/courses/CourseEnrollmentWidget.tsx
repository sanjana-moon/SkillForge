"use client";

import { useEffect, useState } from "react";
import {
    Button,
    Input,
    Label,
    Modal,
    TextArea,
    TextField,
} from "@heroui/react";

import { 
    FaLock, 
    FaUserGraduate, 
    FaClock,
    FaCheckCircle,
} from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import { checkEnrollment } from "@/lib/api/courses/data";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface CourseEnrollmentWidgetProps {
    courseId: string;
    courseTitle: string;
    price: number;
    duration: string;
    level: string;
    instructorName: string;
}

export default function CourseEnrollmentWidget({
    courseId,
    courseTitle,
    price,
    duration,
    level,
    instructorName,
}: CourseEnrollmentWidgetProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [note, setNote] = useState("");
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check if user is already enrolled
    useEffect(() => {
        const checkEnrollmentStatus = async () => {
            if (!user || user.role !== "student") {
                setLoading(false);
                return;
            }

            try {
                const result = await checkEnrollment(courseId);
                setIsEnrolled(result.enrolled);
            } catch (error) {
                console.error("Error checking enrollment:", error);
            } finally {
                setLoading(false);
            }
        };

        checkEnrollmentStatus();
    }, [courseId, user]);

    const handleEnrollment = async () => {
        if (!user) {
            toast.error("Please sign in to enroll in this course");
            router.push("/signin");
            return;
        }

        if (user.role !== "student") {
            toast.error("Only students can enroll in courses");
            return;
        }

        if (isEnrolled) {
            toast.info("You are already enrolled in this course");
            return;
        }

        setSubmitting(true);

        try {
            // âœ… Generate a unique transaction ID
            const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

            // âœ… Create checkout session with all required data
            const bookingData = {
                type: "course_enrollment",
                courseId,
                courseTitle,
                amount: Number(price),
                transactionId,
                studentEmail: user.email,
                studentName: user.name,
                startDate,
                note,
                // âœ… Added userId for metadata
                userId: user.id,
            };

            const res = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            if (res.status === 409) {
                const data = await res.json();
                console.error(data?.message);
                toast.error("Already enrolled or payment in progress");
                return;
            }

            const data = await res.json();

            if (data?.url) {
                // âœ… Redirect to Stripe Checkout
                window.location.href = data.url;
            } else {
                toast.error("Failed to create checkout session");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "beginner":
                return "text-green-400";
            case "intermediate":
                return "text-yellow-400";
            case "advanced":
                return "text-red-400";
            default:
                return "text-[#7BAE9B]";
        }
    };

    // If user is enrolled, show "Already Enrolled" button
    if (!loading && isEnrolled) {
        return (
            <Button
                isDisabled
                className="w-full bg-green-500/20 text-green-400 border border-green-500/30 font-bold h-12 rounded-xl transition-colors cursor-default"
            >
                <FaCheckCircle />
                Already Enrolled
            </Button>
        );
    }

    // Loading state
    if (loading) {
        return (
            <Button
                isDisabled
                className="w-full bg-[#DCEBE4] text-[#263A33]/40 font-bold h-12 rounded-xl transition-colors cursor-default"
            >
                Checking...
            </Button>
        );
    }

    return (
        <>
            <Button
                onPress={() => setIsModalOpen(true)}
                className="w-full bg-[#7BAE9B] text-[#F5F8F5] hover:bg-[#7BAE9B]/80 font-bold h-12 rounded-xl transition-colors"
            >
                Enroll Now - ${price.toFixed(2)}
            </Button>

            <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-125 bg-[#DCEBE4] border border-[#7BAE9B]/20 rounded-2xl">
                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Icon className="bg-[#7BAE9B]/15 text-[#7BAE9B]">
                                    <FaUserGraduate className="size-5" />
                                </Modal.Icon>

                                <Modal.Heading className="text-2xl font-bold text-[#263A33] text-center">
                                    Enroll in Course
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body className="pb-6">
                                {!user ? (
                                    <div className="text-center py-8">
                                        <p className="text-[#263A33]/60 mb-4">
                                            Please sign in to enroll in this course.
                                        </p>
                                        <Button
                                            onPress={() => {
                                                setIsModalOpen(false);
                                                router.push("/signin");
                                            }}
                                            className="bg-[#7BAE9B] text-[#F5F8F5] font-semibold hover:bg-[#7BAE9B]/80"
                                        >
                                            Sign In
                                        </Button>
                                    </div>
                                ) : user.role !== "student" ? (
                                    <div className="text-center py-8">
                                        <p className="text-[#263A33]/60 mb-4">
                                            Only students can enroll in courses.
                                        </p>
                                        <p className="text-sm text-[#263A33]/40">
                                            Your current role: <span className="capitalize text-[#7BAE9B]">{user.role}</span>
                                        </p>
                                    </div>
                                ) : isEnrolled ? (
                                    <div className="text-center py-8">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/30 mb-4">
                                            <FaCheckCircle className="text-3xl text-green-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#263A33] mb-2">
                                            Already Enrolled!
                                        </h3>
                                        <p className="text-[#263A33]/60">
                                            You are already enrolled in <strong>{courseTitle}</strong>
                                        </p>
                                        <Button
                                            onPress={() => {
                                                setIsModalOpen(false);
                                                router.push(`/courses/${courseId}`);
                                            }}
                                            className="mt-4 bg-[#7BAE9B] text-[#F5F8F5] font-semibold hover:bg-[#7BAE9B]/80"
                                        >
                                            Go to Course
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-5">
                                        {/* Course Details */}
                                        <div className="bg-[#F5F8F5] rounded-xl p-4 border border-[#7BAE9B]/10">
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-[#263A33]/50 text-sm">
                                                        Course
                                                    </span>
                                                    <span className="font-semibold text-[#263A33]">
                                                        {courseTitle}
                                                    </span>
                                                </div>
                                                <div className="border-t border-[#7BAE9B]/10" />
                                                <div className="flex justify-between">
                                                    <span className="text-[#263A33]/50 text-sm">
                                                        Price
                                                    </span>
                                                    <span className="text-[#7BAE9B] font-bold text-xl">
                                                        ${price.toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="border-t border-[#7BAE9B]/10" />
                                                <div className="flex justify-between">
                                                    <span className="text-[#263A33]/50 text-sm">
                                                        Duration
                                                    </span>
                                                    <span className="text-[#263A33] flex items-center gap-1">
                                                        <FaClock className="text-[#7BAE9B] text-xs" />
                                                        {duration}
                                                    </span>
                                                </div>
                                                <div className="border-t border-[#7BAE9B]/10" />
                                                <div className="flex justify-between">
                                                    <span className="text-[#263A33]/50 text-sm">
                                                        Level
                                                    </span>
                                                    <span className={`font-medium ${getLevelColor(level)}`}>
                                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                                    </span>
                                                </div>
                                                <div className="border-t border-[#7BAE9B]/10" />
                                                <div className="flex justify-between">
                                                    <span className="text-[#263A33]/50 text-sm">
                                                        Instructor
                                                    </span>
                                                    <span className="text-[#263A33]">
                                                        {instructorName}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Start Date */}
                                        <TextField>
                                            <Label className="text-[#263A33] font-medium">
                                                When would you like to start?
                                            </Label>
                                            <Input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) =>
                                                    setStartDate(e.target.value)
                                                }
                                                className="mt-2 bg-[#F5F8F5]/50 border-[#7BAE9B]/30 text-[#263A33]"
                                            />
                                        </TextField>

                                        {/* Note */}
                                        <TextField>
                                            <Label className="text-[#263A33] font-medium">
                                                Additional Notes (Optional)
                                            </Label>
                                            <TextArea
                                                placeholder="Any special requests or questions..."
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                className="mt-2 bg-[#F5F8F5]/50 border-[#7BAE9B]/30 text-[#263A33] placeholder:text-[#263A33]/40"
                                                rows={3}
                                            />
                                        </TextField>

                                        {/* Enroll Button */}
                                        <Button
                                            isDisabled={submitting}
                                            onPress={handleEnrollment}
                                            className="w-full bg-[#7BAE9B] text-[#F5F8F5] hover:bg-[#7BAE9B]/80 font-bold rounded-xl transition-colors py-6"
                                        >
                                            {submitting ? (
                                                "Processing..."
                                            ) : (
                                                <>
                                                    <FaUserGraduate />
                                                    Proceed to Payment - ${price.toFixed(2)}
                                                </>
                                            )}
                                        </Button>

                                        <div className="flex items-center justify-center gap-2 text-xs text-[#263A33]/40">
                                            <FaLock className="text-[10px]" />
                                            <span>
                                                Secure payment powered by Stripe
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}