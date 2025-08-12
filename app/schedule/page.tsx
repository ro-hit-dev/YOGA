import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { type Session, courses } from "@/lib/data"

export const metadata = {
  title: "Schedule | YogA",
  description: "See upcoming program intakes and availability.",
}

async function getSessions(): Promise<{ sessions: Session[] }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/sessions`, { cache: "no-store" })
  return res.json()
}

export default async function SchedulePage() {
  const { sessions } = await getSessions()
  const courseById = new Map(courses.map((c) => [c.id, c]))
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-semibold">Upcoming Schedule</h1>
        <div className="mt-6 grid gap-3">
          {sessions.map((s) => {
            const c = courseById.get(s.courseId)!
            return (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-4">
                <div>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(s.startDate).toLocaleDateString()} – {new Date(s.endDate).toLocaleDateString()} •{" "}
                    {s.seats} seats • <span className="uppercase">{s.status}</span>
                  </p>
                </div>
                <a
                  href={`/courses/${c.slug}`}
                  className="rounded-md px-3 py-2 text-sm text-white"
                  style={{ backgroundColor: "#414833" }}
                >
                  View Course
                </a>
              </div>
            )
          })}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
