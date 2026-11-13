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
            const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

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
                return "text-success";
            case "intermediate":
                return "text-warning";
            case "advanced":
                return "text-error";
            default:
                return "text-accent";
        }
    };

    // If user is enrolled, show "Already Enrolled" button
    if (!loading && isEnrolled) {
        return (
            <Button
                isDisabled
                className="w-full bg-success/10 text-success border border-success/30 font-bold h-12 rounded-xl transition-colors cursor-default *:text-success"
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
                className="w-full bg-surface border border-main text-main/40 font-bold h-12 rounded-xl transition-colors cursor-default"
            >
                Checking...
            </Button>
        );
    }

    return (
        <>
            <Button
                onPress={() => setIsModalOpen(true)}
                className="w-full bg-action-primary font-bold h-12 rounded-xl transition-colors hover:opacity-90"
            >
                Enroll Now - ${price.toFixed(2)}
            </Button>

            <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-125 bg-surface border border-main rounded-2xl">
                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Icon className="bg-accent/10 text-accent">
                                    <FaUserGraduate className="size-5" />
                                </Modal.Icon>

                                <Modal.Heading className="text-2xl font-bold text-main text-center">
                                    Enroll in Course
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body className="pb-6">
                                {!user ? (
                                    <div className="text-center py-8">
                                        <p className="text-main/60 mb-4">
                                            Please sign in to enroll in this course.
                                        </p>
                                        <Button
                                            onPress={() => {
                                                setIsModalOpen(false);
                                                router.push("/signin");
                                            }}
                                            className="bg-action-primary font-semibold hover:opacity-90"
                                        >
                                            Sign In
                                        </Button>
                                    </div>
                                ) : user.role !== "student" ? (
                                    <div className="text-center py-8">
                                        <p className="text-main/60 mb-4">
                                            Only students can enroll in courses.
                                        </p>
                                        <p className="text-sm text-main/40">
                                            Your current role: <span className="capitalize text-accent">{user.role}</span>
                                        </p>
                                    </div>
                                ) : isEnrolled ? (
                                    <div className="text-center py-8">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 border-2 border-success/30 mb-4">
                                            <FaCheckCircle className="text-3xl text-success" />
                                        </div>
                                        <h3 className="text-xl font-bold text-main mb-2">
                                            Already Enrolled!
                                        </h3>
                                        <p className="text-main/60">
                                            You are already enrolled in <strong>{courseTitle}</strong>
                                        </p>
                                        <Button
                                            onPress={() => {
                                                setIsModalOpen(false);
                                                router.push(`/courses/${courseId}`);
                                            }}
                                            className="mt-4 bg-action-primary font-semibold hover:opacity-90"
                                        >
                                            Go to Course
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-5">
                                        {/* Course Details */}
                                        <div className="bg-main rounded-xl p-4 border border-main">
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-main/50 text-sm">
                                                        Course
                                                    </span>
                                                    <span className="font-semibold text-main">
                                                        {courseTitle}
                                                    </span>
                                                </div>
                                                <div className="border-t border-main" />
                                                <div className="flex justify-between">
                                                    <span className="text-main/50 text-sm">
                                                        Price
                                                    </span>
                                                    <span className="text-accent font-bold text-xl">
                                                        ${price.toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="border-t border-main" />
                                                <div className="flex justify-between">
                                                    <span className="text-main/50 text-sm">
                                                        Duration
                                                    </span>
                                                    <span className="text-main flex items-center gap-1">
                                                        <FaClock className="text-accent text-xs" />
                                                        {duration}
                                                    </span>
                                                </div>
                                                <div className="border-t border-main" />
                                                <div className="flex justify-between">
                                                    <span className="text-main/50 text-sm">
                                                        Level
                                                    </span>
                                                    <span className={`font-medium ${getLevelColor(level)}`}>
                                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                                    </span>
                                                </div>
                                                <div className="border-t border-main" />
                                                <div className="flex justify-between">
                                                    <span className="text-main/50 text-sm">
                                                        Instructor
                                                    </span>
                                                    <span className="text-main">
                                                        {instructorName}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Start Date */}
                                        <TextField>
                                            <Label className="text-main font-medium">
                                                When would you like to start?
                                            </Label>
                                            <Input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) =>
                                                    setStartDate(e.target.value)
                                                }
                                                className="mt-2 bg-surface border-main text-main"
                                            />
                                        </TextField>

                                        {/* Note */}
                                        <TextField>
                                            <Label className="text-main font-medium">
                                                Additional Notes (Optional)
                                            </Label>
                                            <TextArea
                                                placeholder="Any special requests or questions..."
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                className="mt-2 bg-surface border-main text-main placeholder:text-main/40"
                                                rows={3}
                                            />
                                        </TextField>

                                        {/* Enroll Button */}
                                        <Button
                                            isDisabled={submitting}
                                            onPress={handleEnrollment}
                                            className="w-full bg-action-primary font-bold rounded-xl transition-colors py-6 hover:opacity-90"
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

                                        <div className="flex items-center justify-center gap-2 text-xs text-main/40">
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