import * as React from "react"
import { cn } from "@/lib/utils"

type StatusType = "open" | "in-progress" | "resolved" | "low" | "medium" | "high"

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusType
  size?: "sm" | "default" | "lg"
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  open: {
    label: "Open",
    className: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
  resolved: {
    label: "Resolved",
    className: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  low: {
    label: "Low",
    className: "bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30",
  },
  medium: {
    label: "Medium",
    className: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  high: {
    label: "High",
    className: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30",
  },
}

const sizeStyles = {
  sm: "px-1.5 py-0.5 text-[10px]",
  default: "px-2 py-0.5 text-xs",
  lg: "px-2.5 py-1 text-sm",
}

function StatusBadge({ 
  status, 
  size = "default", 
  className, 
  ...props 
}: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-medium whitespace-nowrap",
        config.className,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {config.label}
    </span>
  )
}

export { StatusBadge, type StatusBadgeProps, type StatusType }
