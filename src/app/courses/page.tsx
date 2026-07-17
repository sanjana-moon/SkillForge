"use client";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#10182B] flex flex-col justify-between text-[#EDEFF5]">
      <main className="flex-grow flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center max-w-lg bg-[#1C2740] p-8 rounded-3xl border border-[#A78BFA]/20 shadow-xl">
          <h1 className="text-3xl font-bold font-heading mb-4 text-[#A78BFA]">Courses Catalog</h1>
          <p className="text-[#EDEFF5]/70 mb-6">
            Explore our curated catalog of technology courses and start learning today.
          </p>
          <div className="inline-block px-4 py-2 bg-[#A78BFA]/10 text-[#A78BFA] rounded-full border border-[#A78BFA]/20 text-sm">
            Course directory under development
          </div>
        </div>
      </main>
    </div>
  );
}
