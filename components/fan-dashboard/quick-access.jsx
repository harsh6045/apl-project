"use client"

import { UtensilsCrossed, Bath, Armchair, LogOut, ChevronRight, Clock } from "lucide-react"

const quickActions = [
  {
    id: "food",
    title: "Food Stalls",
    subtitle: "8 open nearby",
    icon: UtensilsCrossed,
    status: "available",
    waitTime: "~5 min",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
  },
  {
    id: "washrooms",
    title: "Washrooms",
    subtitle: "Block C nearest",
    icon: Bath,
    status: "busy",
    waitTime: "~12 min",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    id: "seat",
    title: "My Seat",
    subtitle: "E-42, East Pavilion",
    icon: Armchair,
    status: "located",
    directions: "120m",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
  },
  {
    id: "exit",
    title: "Exit Plan",
    subtitle: "Gate 4 recommended",
    icon: LogOut,
    status: "clear",
    waitTime: "~3 min",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
]

const statusColors = {
  available: "text-emerald-400",
  busy: "text-amber-400",
  located: "text-blue-400",
  clear: "text-emerald-400",
}

export function QuickAccess() {
  return (
    <div className="px-4 py-2">
      <h2 className="text-sm font-semibold text-white mb-3">Quick Access</h2>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              className={`relative p-4 rounded-2xl ${action.bgColor} ${action.borderColor} border text-left transition-all duration-200 active:scale-[0.98] hover:border-white/30`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-white">{action.title}</p>
              <p className="text-[11px] text-white/50 mt-0.5">{action.subtitle}</p>
              
              <div className="flex items-center gap-1 mt-2">
                {action.waitTime && (
                  <>
                    <Clock className="h-3 w-3 text-white/40" />
                    <span className={`text-[10px] font-medium ${statusColors[action.status]}`}>
                      {action.waitTime}
                    </span>
                  </>
                )}
                {action.directions && (
                  <span className={`text-[10px] font-medium ${statusColors[action.status]}`}>
                    {action.directions} away
                  </span>
                )}
              </div>

              <ChevronRight className="absolute top-4 right-3 h-4 w-4 text-white/30" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
