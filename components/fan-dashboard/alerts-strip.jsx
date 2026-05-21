"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Info, CheckCircle2, X, Bell } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "Gate 2 experiencing high traffic. Use Gate 4 for faster exit.",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "info",
    message: "Food court offers closing in 15 minutes. Last orders now.",
    time: "5 min ago",
  },
  {
    id: 3,
    type: "success",
    message: "Washrooms in Block D are now available with no wait time.",
    time: "8 min ago",
  },
]

const alertStyles = {
  warning: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    icon: AlertTriangle,
    iconColor: "text-amber-400",
  },
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    icon: Info,
    iconColor: "text-blue-400",
  },
  success: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
  },
}

export function AlertsStrip() {
  const [currentAlert, setCurrentAlert] = useState(0)
  const [dismissed, setDismissed] = useState([])

  const visibleAlerts = alerts.filter(a => !dismissed.includes(a.id))

  useEffect(() => {
    if (visibleAlerts.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % visibleAlerts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [visibleAlerts.length])

  if (visibleAlerts.length === 0) return null

  const alert = visibleAlerts[currentAlert % visibleAlerts.length]
  const style = alertStyles[alert.type]
  const Icon = style.icon

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-white/60" />
          <h2 className="text-sm font-semibold text-white">Live Alerts</h2>
        </div>
        {visibleAlerts.length > 1 && (
          <div className="flex items-center gap-1">
            {visibleAlerts.map((_, index) => (
              <span
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentAlert % visibleAlerts.length
                    ? "bg-white w-3"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div
        className={`relative p-3 rounded-xl ${style.bg} ${style.border} border transition-all duration-300`}
      >
        <div className="flex items-start gap-3 pr-6">
          <div className={`mt-0.5 ${style.iconColor}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/90 leading-snug">{alert.message}</p>
            <p className="text-[10px] text-white/40 mt-1">{alert.time}</p>
          </div>
        </div>
        <button
          onClick={() => setDismissed([...dismissed, alert.id])}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="h-3 w-3 text-white/40" />
        </button>
      </div>
    </div>
  )
}
