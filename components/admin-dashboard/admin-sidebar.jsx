"use client"

import Link from "next/link"
import { useState } from "react"
import {
  LayoutDashboard,
  Map,
  Users,
  AlertTriangle,
  Radio,
  MessageSquare,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Map, label: "Zone Map", active: false },
  { icon: Users, label: "Staff", active: false },
  { icon: AlertTriangle, label: "Incidents", badge: 3 },
  { icon: Radio, label: "Broadcast", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
]

const bottomItems = [
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("Overview")

  return (
    <aside
      className={cn(
        "h-full bg-slate-900 border-r border-slate-700/50 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className={cn("p-4 border-b border-slate-700/50", collapsed && "px-3")}>
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
            <span className="text-slate-900 font-bold text-sm">S</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-slate-100 font-semibold text-sm">StadiumOps</h1>
              <p className="text-slate-500 text-xs">Admin Portal</p>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              activeItem === item.label
                ? "bg-slate-800 text-amber-500"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </>
            )}
            {collapsed && item.badge && (
              <span className="absolute left-10 top-0 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-2 border-t border-slate-700/50 space-y-1">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors"
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-800/50 hover:text-slate-400 transition-colors mt-2"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
