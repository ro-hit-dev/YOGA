import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { currency, type Course, type Session } from "@/lib/data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type CourseResponse = { course: Course; sessions: Session[] }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/courses/${params.slug}`, {
    cache: "no-store",
  }).catch(() => null)
  const data = (await res?.json()) as CourseResponse | undefined
  if (!data?.course) return {}
  return {
    title: `${data.course.title} | YogA`,
    description: data.course.summary,
  }
}

export default async function CourseDetail({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/courses/${params.slug}`, {
    cache: "no-store",
  }).catch(() => null)
  const data = (await res?.json()) as CourseResponse | undefined
  if (!data?.course) notFound()
  const { course, sessions } = data

  return (
    <main>
      <SiteHeader />
      <article className="mx-auto max-w-5xl px-4 py-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border">
          <Image src={course.coverImage || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold">{course.title}</h1>
        <p className="mt-2 text-muted-foreground">{course.summary}</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md border p-4">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-lg font-medium">{currency(course.price)}</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="text-lg font-medium">{course.duration}</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="text-sm text-muted-foreground">Level</p>
            <p className="text-lg font-medium">{course.level}</p>
          </div>
        </div>

        <section className="prose mt-8 max-w-none">
          <p>{course.description}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
          <div className="mt-4 grid gap-3">
            {sessions.length === 0 && <p className="text-sm text-muted-foreground">No sessions scheduled.</p>}
            {sessions.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-4">
                <p className="text-sm">
                  {new Date(s.startDate).toLocaleDateString()} – {new Date(s.endDate).toLocaleDateString()} • Seats:{" "}
                  {s.seats} • <span className="uppercase">{s.status}</span>
                </p>
                <Button asChild className="text-white" style={{ backgroundColor: "#7f4f24" }}>
                  <Link href={`/book?course=${course.slug}&session=${s.id}`}>Book Now</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      </article>
      <SiteFooter />
    </main>
  )
}
