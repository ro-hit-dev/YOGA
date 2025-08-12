import { NextResponse } from "next/server"
import { courses, sessions } from "@/lib/data"

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug)
  if (!course) return new NextResponse("Not found", { status: 404 })
  const related = sessions.filter((s) => s.courseId === course.id)
  return NextResponse.json({ course, sessions: related })
}
