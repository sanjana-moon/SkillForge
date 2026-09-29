"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa6";
import logo from "@/components/assets/images/Logo (2).png";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1C2E24] border-t border-[#C5A059]/10 text-[#EBE3D5]/70 py-16 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Brand & Desc */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold font-heading text-[#EBE3D5] group">
              <Link href="/" className="">
                <Image
                  src={logo}
                  alt="SkillForge"
                  width={140}
                  height={45}
                  className="h-12 md:h-16 w-auto"
                />
              </Link>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#EBE3D5]/65">
              Personalized learning roadmaps, smart recommendations, and 24/7 AI mentorship designed to accelerate your tech career.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold font-mono text-[#EBE3D5] tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#C5A059] transition">Home</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#C5A059] transition">Courses Directory</Link>
              </li>
              <li>
                <Link href="/ai-mentor" className="hover:text-[#C5A059] transition">AI Mentor Room</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#C5A059] transition">Student Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div>
            <h3 className="text-sm font-bold font-mono text-[#EBE3D5] tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#C5A059] transition">About Us</Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A059] transition">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A059] transition">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A059] transition">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact/Info */}
          <div>
            <h3 className="text-sm font-bold font-mono text-[#EBE3D5] tracking-wider uppercase mb-4">
              Get in Touch
            </h3>
            <p className="text-sm leading-relaxed text-[#EBE3D5]/65">
              Have questions or suggestions? Reach out to our support team.
            </p>
            <p className="mt-4 text-sm font-semibold text-[#5C3A21]">
              support@skillforge.ai
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-[#C5A059]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EBE3D5]/40 font-mono">
          <p>&copy; {currentYear} SkillForge AI. All rights reserved.</p>

          {/* Social Icons — moved from the brand column */}
          <div className="sm:mt-0 flex items-center gap-3">
            <a href="#" className="p-2 bg-[#3E5C4B] rounded-lg hover:text-[#C5A059] hover:bg-[#C5A059]/10 border border-[#C5A059]/5 transition duration-200">
              <FaTwitter className="text-base" />
            </a>
            <a href="#" className="p-2 bg-[#3E5C4B] rounded-lg hover:text-[#C5A059] hover:bg-[#C5A059]/10 border border-[#C5A059]/5 transition duration-200">
              <FaGithub className="text-base" />
            </a>
            <a href="#" className="p-2 bg-[#3E5C4B] rounded-lg hover:text-[#C5A059] hover:bg-[#C5A059]/10 border border-[#C5A059]/5 transition duration-200">
              <FaLinkedin className="text-base" />
            </a>
            <a href="#" className="p-2 bg-[#3E5C4B] rounded-lg hover:text-[#C5A059] hover:bg-[#C5A059]/10 border border-[#C5A059]/5 transition duration-200">
              <FaYoutube className="text-base" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}