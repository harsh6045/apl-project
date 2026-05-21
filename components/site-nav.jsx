import Link from "next/link"

const routes = [
  { href: "/", label: "Home" },
  { href: "/fan-login", label: "Fan Login" },
  { href: "/fan-dashboard", label: "Fan Dashboard" },
  { href: "/admin-login", label: "Admin Login" },
  { href: "/admin-dashboard", label: "Admin Dashboard" },
  { href: "/components", label: "Components" },
]

export function SiteNav({ currentPath, variant = "light" }) {
  const isDark = variant === "dark"

  return (
    <nav
      aria-label="Site navigation"
      className={
        isDark
          ? "border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm"
          : "border-b border-border/60 bg-background/95 backdrop-blur-sm"
      }
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-2">
        {routes.map((route) => {
          const isActive = currentPath === route.href
          return (
            <Link
              key={route.href}
              href={route.href}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? isDark
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-primary text-primary-foreground"
                  : isDark
                    ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {route.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
