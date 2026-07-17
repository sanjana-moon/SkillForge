"use client";

import AIFeatures from "@/components/home/AIFeatures";
import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#10182B] text-[#EDEFF5] flex flex-col justify-between">
        {/* Hero Section */}
        <Hero />

        {/* AI Features Highlight */}
        <AIFeatures />

        {/* Categories Section */}
        <Categories />

        {/* Featured Courses Section */}

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Testimonials */}
        <Testimonials />

        {/* Newsletter subscription form */}
        <Newsletter />
    </div>
  );
}
