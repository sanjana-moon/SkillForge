"use client";

import AboutPage from "@/components/home/AboutUs";
import AIFeatures from "@/components/home/AIFeatures";
import Categories from "@/components/home/Categories";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#4B4B5A] flex flex-col justify-between">
      <Hero />
      <FeaturedCourses />
      <Categories />
      <AIFeatures />
      <AboutPage />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

