import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Image from "next/image"
import { instructors } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About YogA",
  description: "Story, mission, and instructor profiles for YogA Residential School.",
}

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-semibold">About YogA</h1>
        <p className="mt-3 text-muted-foreground">
          Our residential programs blend traditional yoga teachings with modern anatomy and pedagogy. Expect warmth,
          clarity, and rigorous support in a peaceful, natural setting.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {instructors.map((i) => (
            <article key={i.id} className="rounded-lg border overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={i.photo || "/placeholder.svg"} alt={i.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{i.name}</h3>
                <p className="text-sm text-muted-foreground">{i.credentials}</p>
                <p className="mt-2 text-sm">{i.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
