"use client";


export default function AIMentorPage() {
  return (
    <div className="min-h-screen bg-[#10182B] flex flex-col justify-between text-[#EDEFF5]">
      <main className="flex-grow flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center max-w-lg bg-[#1C2740] p-8 rounded-3xl border border-[#A78BFA]/20 shadow-xl">
          <h1 className="text-3xl font-bold font-heading mb-4 text-[#A78BFA] animate-pulse">AI Mentor Chat</h1>
          <p className="text-[#EDEFF5]/70 mb-6 font-body">
            Get instant support, code reviews, and explanations from our personalized AI assistant.
          </p>
          <div className="inline-block px-4 py-2 bg-[#4FD1C5]/10 text-[#4FD1C5] rounded-full border border-[#4FD1C5]/20 text-sm">
            AI chat workspace under construction
          </div>
        </div>
      </main>
    </div>
  );
}
