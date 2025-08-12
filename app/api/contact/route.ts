import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  // Simulate email dispatch
  await new Promise((r) => setTimeout(r, 500))
  return NextResponse.json({ ok: true, received: body })
}
