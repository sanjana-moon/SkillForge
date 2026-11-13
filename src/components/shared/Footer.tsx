"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa6";
import logo from "@/components/assets/images/Logoo.png";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-action-primary border-t border-white/10 relative z-10">
      <div className="section-container !py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Brand & Desc */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                alt="SkillForge"
                width={140}
                height={45}
                className="h-12 md:h-16 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Personalized learning roadmaps, smart recommendations, and 24/7 AI mentorship designed to accelerate your tech career.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <p className="text-md font-bold font-mono text-white tracking-wider uppercase mb-4">
              Explore
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white/80 hover:text-white transition">
                  Courses Directory
                </Link>
              </li>
              <li>
                <Link href="/ai-mentor" className="text-white/80 hover:text-white transition">
                  AI Mentor Room
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-white/80 hover:text-white transition">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <p className="text-md font-bold font-mono text-white tracking-wider uppercase mb-4">
              Support
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact/Info */}
          <div>
            <p className="text-md font-bold font-mono text-white tracking-wider uppercase mb-4">
              Get in Touch
            </p>
            <p className="text-sm leading-relaxed text-white/75">
              Have questions or suggestions? Reach out to our support team.
            </p>
            <p className="mt-4 text-sm font-semibold text-white">
              support@skillforge.ai
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs text-white/65 font-mono gap-6">
          <p>&copy; {currentYear} SkillForge AI. All rights reserved.</p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="#" className="p-2 bg-white/10 text-white rounded-lg hover:bg-white hover:text-[var(--color-action-primary)] transition duration-200">
              <FaTwitter className="text-sm" />
            </a>
            <a href="#" className="p-2 bg-white/10 text-white rounded-lg hover:bg-white hover:text-[var(--color-action-primary)] transition duration-200">
              <FaGithub className="text-sm" />
            </a>
            <a href="#" className="p-2 bg-white/10 text-white rounded-lg hover:bg-white hover:text-[var(--color-action-primary)] transition duration-200">
              <FaLinkedin className="text-sm" />
            </a>
            <a href="#" className="p-2 bg-white/10 text-white rounded-lg hover:bg-white hover:text-[var(--color-action-primary)] transition duration-200">
              <FaYoutube className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}