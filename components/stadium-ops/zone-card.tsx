"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Users } from "lucide-react"

type CrowdStatus = "low" | "moderate" | "high" | "critical"

interface ZoneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  zoneName: string
  crowdLevel: number | string
  status: CrowdStatus
  capacity?: number
  onClick?: () => void
}

const statusConfig: Record<CrowdStatus, { 
  label: string
  bgClass: string
  textClass: string
  borderClass: string
  indicatorClass: string
}> = {
  low: {
    label: "Low Density",
    bgClass: "bg-emerald-500/10 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30",
    textClass: "text-emerald-700 dark:text-emerald-400",
    borderClass: "border-emerald-500/30",
    indicatorClass: "bg-emerald-500",
  },
  moderate: {
    label: "Moderate",
    bgClass: "bg-amber-500/10 hover:bg-amber-500/20 dark:bg-amber-500/20 dark:hover:bg-amber-500/30",
    textClass: "text-amber-700 dark:text-amber-400",
    borderClass: "border-amber-500/30",
    indicatorClass: "bg-amber-500",
  },
  high: {
    label: "High Density",
    bgClass: "bg-orange-500/10 hover:bg-orange-500/20 dark:bg-orange-500/20 dark:hover:bg-orange-500/30",
    textClass: "text-orange-700 dark:text-orange-400",
    borderClass: "border-orange-500/30",
    indicatorClass: "bg-orange-500",
  },
  critical: {
    label: "Critical",
    bgClass: "bg-red-500/10 hover:bg-red-500/20 dark:bg-red-500/20 dark:hover:bg-red-500/30",
    textClass: "text-red-700 dark:text-red-400",
    borderClass: "border-red-500/30",
    indicatorClass: "bg-red-500 animate-pulse",
  },
}

function ZoneCard({
  zoneName,
  crowdLevel,
  status,
  capacity,
  onClick,
  className,
  ...props
}: ZoneCardProps) {
  const config = statusConfig[status]
  const percentage = typeof crowdLevel === "number" && capacity 
    ? Math.round((crowdLevel / capacity) * 100) 
    : null

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={cn(
        "relative rounded-xl border p-4 transition-all duration-200",
        config.bgClass,
        config.borderClass,
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 truncate">
            {zoneName}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className={cn("size-2 rounded-full shrink-0", config.indicatorClass)} />
            <span className={cn("text-xs font-medium", config.textClass)}>
              {config.label}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5">
            <Users className="size-4 text-slate-500 dark:text-slate-400" />
            <span className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {typeof crowdLevel === "number" ? crowdLevel.toLocaleString() : crowdLevel}
            </span>
          </div>
          {percentage !== null && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {percentage}% capacity
            </span>
          )}
        </div>
      </div>
      
      {capacity && typeof crowdLevel === "number" && (
        <div className="mt-3">
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", config.indicatorClass)}
              style={{ width: `${Math.min(percentage || 0, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export { ZoneCard, type ZoneCardProps, type CrowdStatus }
