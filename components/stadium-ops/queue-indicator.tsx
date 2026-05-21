"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type QueueLevel = "short" | "medium" | "long"

interface QueueIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  level: QueueLevel
  showLabel?: boolean
  size?: "sm" | "default" | "lg"
}

const levelConfig: Record<QueueLevel, { label: string; width: string; colorClass: string }> = {
  short: {
    label: "Short Wait",
    width: "33%",
    colorClass: "bg-emerald-500",
  },
  medium: {
    label: "Moderate Wait",
    width: "66%",
    colorClass: "bg-amber-500",
  },
  long: {
    label: "Long Wait",
    width: "100%",
    colorClass: "bg-red-500",
  },
}

const sizeStyles = {
  sm: { bar: "h-1.5", text: "text-[10px]", container: "gap-1" },
  default: { bar: "h-2", text: "text-xs", container: "gap-1.5" },
  lg: { bar: "h-2.5", text: "text-sm", container: "gap-2" },
}

function QueueIndicator({ 
  level, 
  showLabel = true, 
  size = "default",
  className, 
  ...props 
}: QueueIndicatorProps) {
  const config = levelConfig[level]
  const styles = sizeStyles[size]
  
  return (
    <div 
      className={cn("flex flex-col", styles.container, className)} 
      {...props}
    >
      <div className={cn(
        "w-full rounded-full overflow-hidden",
        styles.bar,
        "bg-slate-200 dark:bg-slate-700"
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            config.colorClass
          )}
          style={{ width: config.width }}
        />
      </div>
      {showLabel && (
        <span className={cn(
          "font-medium",
          styles.text,
          level === "short" && "text-emerald-600 dark:text-emerald-400",
          level === "medium" && "text-amber-600 dark:text-amber-400",
          level === "long" && "text-red-600 dark:text-red-400"
        )}>
          {config.label}
        </span>
      )}
    </div>
  )
}

export { QueueIndicator, type QueueIndicatorProps, type QueueLevel }
