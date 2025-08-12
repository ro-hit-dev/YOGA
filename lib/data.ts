export type Course = {
  id: string
  slug: string
  title: string
  summary: string
  description: string
  price: number
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced" | "All levels"
  coverImage: string
}

export type Session = {
  id: string
  courseId: string
  startDate: string // ISO
  endDate: string // ISO
  seats: number
  status: "open" | "waitlist" | "full"
}

export type Instructor = {
  id: string
  name: string
  bio: string
  photo: string
  credentials: string
}

export type Testimonial = {
  id: string
  studentName: string
  quote: string
  rating: number
  mediaUrl?: string
  courseId?: string
}

export const courses: Course[] = [
  {
    id: "c1",
    slug: "200-hour-ttc",
    title: "200-Hour Teacher Training",
    summary: "Foundational residential TTC rooted in classical Hatha and Vinyasa.",
    description:
      "A comprehensive residential training focusing on asana, pranayama, anatomy, philosophy, teaching methodology, and practicum. Daily routines include sunrise meditation, twice-daily asana practice, lectures, and satsang.",
    price: 1999,
    duration: "28 days",
    level: "All levels",
    coverImage: "/images/lake-pose.jpg",
  },
  {
    id: "c2",
    slug: "yin-immersion",
    title: "14-Day Yin Yoga Immersion",
    summary: "Restore balance and depth with a contemplative Yin practice.",
    description:
      "Explore functional anatomy, meridian theory, and sequencing for Yin Yoga. Ideal for practitioners seeking stillness, release, and resilience. Includes guided journaling and evening nidra.",
    price: 1290,
    duration: "14 days",
    level: "All levels",
    coverImage: "/images/sunset-yoga.jpg",
  },
  {
    id: "c3",
    slug: "retreat-7-day",
    title: "7-Day Mountain Retreat",
    summary: "Reset with daily practice, hikes, and mindful cuisine.",
    description:
      "A gentle retreat designed to restore. Morning flow, evening restorative, breathwork, and mindful hikes in nature. Optional massage and Ayurvedic consults.",
    price: 890,
    duration: "7 days",
    level: "Beginner",
    coverImage: "/images/mountain-meditation.jpg",
  },
]

export const sessions: Session[] = [
  { id: "s1", courseId: "c1", startDate: "2025-09-01", endDate: "2025-09-28", seats: 18, status: "open" },
  { id: "s2", courseId: "c1", startDate: "2025-11-03", endDate: "2025-11-30", seats: 0, status: "waitlist" },
  { id: "s3", courseId: "c2", startDate: "2025-10-05", endDate: "2025-10-19", seats: 6, status: "open" },
  { id: "s4", courseId: "c3", startDate: "2025-09-15", endDate: "2025-09-22", seats: 2, status: "open" },
  { id: "s5", courseId: "c3", startDate: "2025-12-01", endDate: "2025-12-08", seats: 12, status: "open" },
]

export const instructors: Instructor[] = [
  {
    id: "i1",
    name: "Asha Devi",
    bio: "Lead trainer with 15+ years teaching Hatha and Pranayama. Known for grounded presence and precise cueing.",
    photo: "/images/garden-pose.jpg",
    credentials: "E-RYT 500, YACEP",
  },
  {
    id: "i2",
    name: "Mira Singh",
    bio: "Yin specialist and meditation guide integrating Traditional Chinese Medicine and somatics.",
    photo: "/images/sunset-yoga.jpg",
    credentials: "RYT 500, TCM Foundations",
  },
  {
    id: "i3",
    name: "Daniel Rao",
    bio: "Anatomy educator and Vinyasa instructor emphasizing functional movement patterns.",
    photo: "/images/hero-beach.jpg",
    credentials: "RYT 500, BSc Kinesiology",
  },
]

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    studentName: "Priya",
    quote: "The TTC transformed not only my practice but my confidence to teach. The sequencing labs were gold.",
    rating: 5,
    courseId: "c1",
  },
  {
    id: "t2",
    studentName: "Alex",
    quote: "Two weeks of Yin gave me a new relationship with stillness. The teachings are with me daily.",
    rating: 5,
    courseId: "c2",
  },
  {
    id: "t3",
    studentName: "Lea",
    quote: "The retreat reset my nervous system. Waking to mountains and moving in silence was medicine.",
    rating: 5,
    courseId: "c3",
  },
]

export const brand = {
  name: "YogA",
  email: "hello@yoga.example",
  colors: [
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
  ],
}

export function currency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
}
