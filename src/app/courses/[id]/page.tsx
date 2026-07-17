"use client";

import { useParams } from "next/navigation";

export default function CourseDetailsPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#10182B] flex flex-col justify-between text-[#EDEFF5]">
      <main className="flex-grow flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center max-w-lg bg-[#1C2740] p-8 rounded-3xl border border-[#A78BFA]/20 shadow-xl">
          <h1 className="text-3xl font-bold font-heading mb-4 text-[#A78BFA]">Course Details</h1>
          <p className="text-[#EDEFF5]/70 mb-4">
            Viewing course outline and chapters for ID: <span className="font-mono text-[#4FD1C5] font-semibold">{id}</span>
          </p>
          <div className="inline-block px-4 py-2 bg-[#4FD1C5]/10 text-[#4FD1C5] rounded-full border border-[#4FD1C5]/20 text-sm">
            Course curriculum builder is coming soon
          </div>
        </div>
      </main>
    </div>
  );
}
