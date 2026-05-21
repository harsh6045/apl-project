import * as React from "react"
import { cn } from "@/lib/utils"
import { StatusBadge, type StatusType } from "./status-badge"
import { Clock, User } from "lucide-react"

type PriorityLevel = "low" | "medium" | "high"
type TaskStatus = "open" | "in-progress" | "resolved"

interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  assignedTo: string
  priority: PriorityLevel
  status: TaskStatus
  createdAt: string
  description?: string
  onClick?: () => void
}

const priorityStyles: Record<PriorityLevel, string> = {
  low: "border-l-slate-400",
  medium: "border-l-amber-500",
  high: "border-l-red-500",
}

function TaskCard({
  title,
  assignedTo,
  priority,
  status,
  createdAt,
  description,
  onClick,
  className,
  ...props
}: TaskCardProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={cn(
        "relative rounded-lg border border-l-4 p-4 transition-all duration-200",
        "bg-white dark:bg-slate-800/50",
        "border-slate-200 dark:border-slate-700",
        priorityStyles[priority],
        onClick && "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.99]",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
            {title}
          </h4>
          {description && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {description}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={priority} size="sm" />
          <StatusBadge status={status} size="sm" />
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 min-w-0">
          <User className="size-3.5 shrink-0" />
          <span className="truncate">{assignedTo}</span>
        </div>
        
        <div className="flex items-center gap-1.5 shrink-0">
          <Clock className="size-3.5" />
          <span>{createdAt}</span>
        </div>
      </div>
    </div>
  )
}

export { TaskCard, type TaskCardProps, type PriorityLevel, type TaskStatus }
