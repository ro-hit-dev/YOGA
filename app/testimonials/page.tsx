import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import TestimonialCard from "@/components/testimonial-card"
import { testimonials } from "@/lib/data"

export const metadata = {
  title: "Testimonials | YogA",
  description: "Authentic student experiences and success stories.",
}

export default function TestimonialsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-12 perspective-1200">
        <h1 className="text-3xl font-semibold mb-8">Testimonials</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
