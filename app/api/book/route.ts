import { NextResponse } from "next/server"

export async function POST(req: Request) {
  // Simulated payment & email confirmation
  const payload = await req.json().catch(() => ({}))
  // In production, route to Stripe/Razorpay/PayPal using env keys then send an email.
  await new Promise((r) => setTimeout(r, 800))
  const reference = `YOGA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  return NextResponse.json({ ok: true, reference, echo: payload })
}
