import { Metadata } from "next";
import AddCourseForm from "./AddCourseForm";

export const metadata: Metadata = {
    title: "Add New Course | SkillForge",
    description: "Create and publish a new course on SkillForge",
};

const AddCoursePage = () => {
    return (
        <div>
            <AddCourseForm />
        </div>
    );
};

export default AddCoursePage;