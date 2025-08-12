import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { notFound } from "next/navigation"

const CONTENT: Record<string, { title: string; body: string }> = {
  terms: {
    title: "Terms & Conditions",
    body: "These Terms govern your use of the YogA website and participation in programs. By booking, you agree to our code of conduct, payment timelines, and campus policies.",
  },
  privacy: {
    title: "Privacy Policy",
    body: "We collect and process personal data to manage bookings and communication. We do not sell your data. You may request access or deletion at any time.",
  },
  refunds: {
    title: "Refund & Cancellation",
    body: "Deposits are non-refundable. For cancellations 30+ days prior to start, 70% of tuition is refundable; within 30 days, credits may be offered at our discretion.",
  },
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const item = CONTENT[params.slug]
  if (!item) notFound()
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-semibold">{item.title}</h1>
        <p className="mt-4 text-muted-foreground">{item.body}</p>
      </section>
      <SiteFooter />
    </main>
  )
}
