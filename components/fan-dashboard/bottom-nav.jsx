"use client"

import { useState } from "react"
import { Home, Map, Bell, Ticket } from "lucide-react"

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "map", label: "Map", icon: Map },
  { id: "alerts", label: "Alerts", icon: Bell, badge: 3 },
  { id: "ticket", label: "My Ticket", icon: Ticket },
]

export function BottomNav({ activeTab = "home", onTabChange }) {
  const [active, setActive] = useState(activeTab)

  const handleTabChange = (tabId) => {
    setActive(tabId)
    onTabChange?.(tabId)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-lg border-t border-white/10">
      <div className="flex items-center justify-around px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-amber-500/10 text-amber-400" 
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">{item.badge}</span>
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-amber-400" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
