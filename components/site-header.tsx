"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/schedule", label: "Schedule" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
]

export default function SiteHeader({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <header className={cn("border-b bg-white/90 backdrop-blur", className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight" aria-label="YogA Home">
          <span className="text-xl" style={{ color: "#414833" }}>
            YogA
          </span>
          <span className="sr-only">{"YogA — Residential Yoga School"}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          ))}
          <Button asChild className="text-white" style={{ backgroundColor: "#7f4f24" }}>
            <Link href="/book">Book Now</Link>
          </Button>
        </nav>
        <button
          className="md:hidden rounded-md p-2 text-foreground hover:bg-muted"
          aria-label="Open menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="border-t md:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-2">
            <ul className="grid gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-md px-2 py-2 hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Button asChild className="w-full text-white" style={{ backgroundColor: "#7f4f24" }}>
                  <Link href="/book" onClick={() => setOpen(false)}>
                    Book Now
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
