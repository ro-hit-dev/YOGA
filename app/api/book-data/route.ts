import { NextResponse } from "next/server"
import { courses, sessions } from "@/lib/data"

export async function GET() {
  return NextResponse.json({ courses, sessions })
}
