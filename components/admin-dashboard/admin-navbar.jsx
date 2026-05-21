"use client"

import { useState, useEffect } from "react"
import { Radio, Bell, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminNavbar() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  return (
    <header className="h-14 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">LIVE</span>
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <span className="text-slate-300 text-sm">CSK vs MI</span>
          <span className="text-slate-500 text-sm">Wankhede Stadium</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-slate-400">
          <Radio className="w-4 h-4" />
          <span className="font-mono text-sm">{formatTime(currentTime)}</span>
        </div>

        <div className="h-4 w-px bg-slate-700" />

        <Button variant="ghost" size="sm" className="relative text-slate-400 hover:text-slate-200 hover:bg-slate-800">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-500 rounded-full" />
        </Button>

        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800">
          <Settings className="w-4 h-4" />
        </Button>

        <div className="h-4 w-px bg-slate-700" />

        <button className="flex items-center gap-2 hover:bg-slate-800 rounded-lg px-2 py-1.5 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-900 text-xs font-bold">
            RK
          </div>
          <div className="text-left">
            <p className="text-sm text-slate-200 font-medium">Rahul Kumar</p>
            <p className="text-xs text-slate-500">Ops Manager</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </button>
      </div>
    </header>
  )
}
