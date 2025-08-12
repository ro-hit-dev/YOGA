import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} YogA. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/legal/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/legal/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/legal/refunds" className="hover:text-foreground">
              Refunds
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
