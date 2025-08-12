import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Hero from "@/components/hero"
import CourseCard from "@/components/course-card"
import TestimonialCarousel from "@/components/testimonial-carousel"
import StatsSection from "@/components/stats-section"
import InteractiveParticles from "@/components/interactive-particles"
import { courses, testimonials } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "YogA — Residential Yoga School",
  description:
    "Explore immersive residential yoga programs at YogA. Clear schedules, pricing, and a streamlined booking flow.",
}

export default function Page() {
  return (
    <main>
      <SiteHeader />
      <div className="relative">
        <Hero />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12 relative">
        <InteractiveParticles particleCount={25} colors={["#a4ac86", "#c2c5aa", "#b6ad90"]} showConnections={true} />
        <h2 className="text-2xl font-semibold relative z-10">Featured Programs</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 relative">
        <TestimonialCarousel testimonials={testimonials} />
      </section>

      <StatsSection />
      <SiteFooter />
    </main>
  )
}
