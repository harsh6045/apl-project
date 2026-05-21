"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Bell, X, AlertTriangle, Info, CheckCircle } from "lucide-react"

type NotificationType = "info" | "warning" | "success" | "default"

interface NotificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  body: string
  timestamp: string
  type?: NotificationType
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  dismissible?: boolean
}

const typeConfig: Record<NotificationType, { 
  icon: React.ElementType
  iconClass: string
  borderClass: string
}> = {
  default: {
    icon: Bell,
    iconClass: "text-slate-500 dark:text-slate-400",
    borderClass: "border-l-slate-500",
  },
  info: {
    icon: Info,
    iconClass: "text-blue-500",
    borderClass: "border-l-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-amber-500",
    borderClass: "border-l-amber-500",
  },
  success: {
    icon: CheckCircle,
    iconClass: "text-emerald-500",
    borderClass: "border-l-emerald-500",
  },
}

function NotificationCard({
  title,
  body,
  timestamp,
  type = "default",
  actionLabel,
  onAction,
  onDismiss,
  dismissible = true,
  className,
  ...props
}: NotificationCardProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "relative flex gap-3 rounded-lg border border-l-4 p-4",
        "bg-white dark:bg-slate-800/50",
        "border-slate-200 dark:border-slate-700",
        config.borderClass,
        className
      )}
      {...props}
    >
      <div className={cn("mt-0.5 shrink-0", config.iconClass)}>
        <Icon className="size-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
            {title}
          </h4>
          {dismissible && onDismiss && (
            <button
              onClick={onDismiss}
              className="shrink-0 p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="size-4 text-slate-400" />
            </button>
          )}
        </div>
        
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {body}
        </p>
        
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-500">
            {timestamp}
          </span>
          
          {actionLabel && onAction && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAction}
              className="h-7 px-2 text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-500/10"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export { NotificationCard, type NotificationCardProps, type NotificationType }
