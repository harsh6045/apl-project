import Link from "next/link"

const pageLinks = [
  { href: "/fan-dashboard", label: "Fan Dashboard" },
  { href: "/admin-dashboard", label: "Admin Dashboard" },
  { href: "/fan-login", label: "Fan Login" },
  { href: "/admin-login", label: "Admin Login" },
  { href: "/components", label: "Components" },
]

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-foreground">Stadium</span>
              <span className="text-primary">Ops</span>
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; 2026 StadiumOps. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
