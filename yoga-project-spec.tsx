import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const palette = [
  "#582f0e",
  "#7f4f24",
  "#936639",
  "#a68a64",
  "#b6ad90",
  "#c2c5aa",
  "#a4ac86",
  "#656d4a",
  "#414833",
  "#333d29",
]

export default function Component() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">YogA — Residential Yoga School Website</h1>
          <Badge className="text-white" style={{ backgroundColor: "#414833" }}>
            Project Description
          </Badge>
        </div>
        <p className="mt-2 text-muted-foreground">
          A clear, professional specification for a modern, responsive website built with Next.js and TypeScript.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              We’re building a calm, credible, and inspiring website for YogA’s residential immersive yoga programs. It
              will be the primary hub for program discovery, bookings, and student engagement, designed to reflect the
              school’s philosophy and on-campus experience.
            </p>
            <ul className="list-disc pl-5">
              <li>Modern UX focused on clarity, warmth, and trust.</li>
              <li>Mobile-first responsive layout and fast performance.</li>
              <li>Clear content hierarchy with strong calls-to-action.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Yoga enthusiasts seeking deep, immersive training.</li>
              <li>Students pursuing certified residential programs.</li>
              <li>Wellness travelers seeking restorative retreats.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Primary Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Showcase YogA’s story, philosophy, and campus environment.</li>
              <li>Enable easy exploration of courses with schedules and pricing.</li>
              <li>Streamline bookings with online reservation and payments.</li>
              <li>Build trust with authentic testimonials and success stories.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Homepage: Hero, featured programs, testimonials preview.</li>
              <li>About: Story, mission, instructor profiles with images.</li>
              <li>Courses & Programs: Details, schedules, pricing, “Book Now”.</li>
              <li>Schedule: Calendar or list view of upcoming programs.</li>
              <li>Booking System: Reservation form, payment (Stripe/Razorpay/PayPal), confirmation email.</li>
              <li>Testimonials: Quotes, stories, and optional videos.</li>
              <li>Contact: Map, phone/email, and quick inquiry form.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Information Architecture & Routes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc pl-5">
              <li>/: Home (hero, featured courses, testimonial preview)</li>
              <li>/about: School story, mission, campus, instructors</li>
              <li>/courses: Grid/list of programs with filters</li>
              <li>/courses/[slug]: Program detail with syllabus, dates, pricing, CTA</li>
              <li>/schedule: Upcoming intakes calendar or list</li>
              <li>/book: Booking flow (multi-step) → payment → confirmation</li>
              <li>/testimonials: Stories, quotes, optional video gallery</li>
              <li>/contact: Map, contact info, inquiry form</li>
              <li>/legal/[slug]: Policies (refunds, terms, privacy)</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Technical Stack</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Next.js App Router with TypeScript for scalable, typed development and Server/Client Components for
                optimal rendering [^1].
              </li>
              <li>Styling: Tailwind CSS for a responsive, consistent UI system.</li>
              <li>Animations: Framer Motion for subtle, meaningful transitions.</li>
              <li>Data Fetching: SWR or React Query for cached, reactive data.</li>
              <li>Forms: React Hook Form + Zod for robust validation.</li>
              <li>SEO: Next.js Metadata API and structured content for discoverability [^3].</li>
              <li>
                Deployment: Vercel for fast hosting, SSL, and global CDN; follow Next.js best practices and examples
                where appropriate [^2].
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Notes: We’ll leverage Next.js docs and patterns for layouts, routing, data fetching, and server functions
              [^1][^2].
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations & Booking Flow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium">Payments</p>
              <ul className="list-disc pl-5">
                <li>Stripe (global), Razorpay (India), or PayPal, selectable per deployment region.</li>
                <li>Webhook-driven confirmation and transactional email on success.</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Booking Steps</p>
              <ol className="list-decimal pl-5">
                <li>Course selection and date/intake.</li>
                <li>Guest details and room preference (if residential).</li>
                <li>Payment and receipt.</li>
                <li>Email confirmation with itinerary and next steps.</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Data Model (initial)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Course: id, slug, title, summary, description, price, duration, level, coverImage</li>
              <li>Intake/Session: id, courseId, startDate, endDate, seats, status</li>
              <li>Booking: id, sessionId, student info, total, paymentStatus, createdAt</li>
              <li>Instructor: id, name, bio, photo, credentials</li>
              <li>Testimonial: id, studentName, quote, rating, mediaUrl, courseId</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO, Performance, Accessibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc pl-5">
              <li>Metadata, Open Graph, and structured data per page [^3].</li>
              <li>Optimized images, font loading, and caching strategies [^1][^2].</li>
              <li>Keyboard navigation, focus states, alt text, and semantic HTML.</li>
              <li>Core Web Vitals monitoring and regression checks.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deliverables</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fully responsive design and development.</li>
              <li>Optimized performance on mobile and desktop.</li>
              <li>SEO-ready pages and site structure.</li>
              <li>End-to-end booking with payment and confirmation email.</li>
              <li>Admin-friendly content structure for easy updates.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Intuitive navigation and fast perceived load times.</li>
              <li>Clear and consistent CTA on every course page.</li>
              <li>Conversion-optimized booking with minimal steps.</li>
              <li>Visuals and tone aligned with YogA’s brand and values.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Brand Palette</h2>
        <p className="mt-1 text-sm text-muted-foreground">Earthy, grounded tones for a calming, natural aesthetic.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {palette.map((hex) => (
            <div key={hex} className="rounded-md border">
              <div className="h-16 rounded-t-md" style={{ backgroundColor: hex }} />
              <div className="p-2 text-sm font-mono">{hex}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Mood & Imagery</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Photography evokes balance, nature, sunrise tones, and mindful focus.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <figure className="overflow-hidden rounded-md border">
            <Image
              src="/images/hero-beach.jpg"
              alt="Yoga pose by the ocean on a rock, serene mood"
              width={800}
              height={500}
              className="h-48 w-full object-cover"
            />
            <figcaption className="p-2 text-xs text-muted-foreground">Ocean balance — calm and focused</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-md border">
            <Image
              src="/images/garden-pose.jpg"
              alt="Yoga pose on a mat in a garden patio"
              width={800}
              height={500}
              className="h-48 w-full object-cover"
            />
            <figcaption className="p-2 text-xs text-muted-foreground">
              Garden practice — vibrant and welcoming
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-md border">
            <Image
              src="/images/lake-pose.jpg"
              alt="Reverse warrior by a lake with mountains"
              width={800}
              height={500}
              className="h-48 w-full object-cover"
            />
            <figcaption className="p-2 text-xs text-muted-foreground">Lakeside flow — spacious and clear</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-md border">
            <Image
              src="/images/sunset-yoga.jpg"
              alt="Seated stretch at sunset by the water"
              width={800}
              height={500}
              className="h-48 w-full object-cover"
            />
            <figcaption className="p-2 text-xs text-muted-foreground">Golden hour — warmth and reflection</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-md border">
            <Image
              src="/images/mountain-meditation.jpg"
              alt="Meditation facing mountains at sunrise"
              width={800}
              height={500}
              className="h-48 w-full object-cover"
            />
            <figcaption className="p-2 text-xs text-muted-foreground">Mountain stillness — retreat energy</figcaption>
          </figure>
        </div>
      </section>

      <Separator className="my-10" />

      <footer className="text-sm text-muted-foreground">
        <p>
          Built with Next.js App Router and modern best practices for layouts, routing, data fetching, and server
          components [^1][^2]. SEO managed via Next.js Metadata API for better shareability and search performance [^3].
        </p>
        <p className="mt-2">
          Questions or feedback?{" "}
          <Link href="mailto:hello@yoga.example" className="underline">
            hello@yoga.example
          </Link>
        </p>
      </footer>
    </main>
  )
}
