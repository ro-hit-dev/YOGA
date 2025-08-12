"use client"

import useSWR from "swr"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import CourseCard from "@/components/course-card"
import type { Course } from "@/lib/data"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/loading-spinner"
import { motion } from "framer-motion"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function CoursesPage() {
  const { data, isLoading, error, mutate } = useSWR<{ courses: Course[] }>("/api/courses", fetcher)
  const list = data?.courses ?? []
  const levels = Array.from(new Set(list.map((c) => c.level)))

  const filter = (level: string | "All") => {
    mutate(
      async () => {
        const res = await fetch("/api/courses")
        const json = (await res.json()) as { courses: Course[] }
        return {
          courses: level === "All" ? json.courses : json.courses.filter((c) => c.level === level),
        }
      },
      { revalidate: false },
    )
  }

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Courses & Programs</h1>
            <p className="text-muted-foreground">Explore schedules, pricing, and details. Book in a few steps.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {levels.map((lv) => (
              <motion.div key={lv} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={() => filter(lv as any)}>
                  {lv}
                </Button>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={() => filter("All")}>
                All
              </Button>
            </motion.div>
          </div>
        </div>

        {isLoading && <LoadingSpinner />}
        {error && <p className="mt-6 text-sm text-red-600">Failed to load courses.</p>}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <CourseCard course={c} />
            </motion.div>
          ))}
        </motion.div>
      </section>
      <SiteFooter />
    </main>
  )
}
