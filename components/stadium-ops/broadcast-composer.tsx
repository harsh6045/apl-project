"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Send, Radio, Users, MapPin, UserCog } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

type AudienceType = "all-fans" | "zone" | "all-staff"

interface BroadcastComposerProps extends React.HTMLAttributes<HTMLDivElement> {
  onSend?: (message: string, audience: AudienceType, zone?: string) => void | Promise<void>
  zones?: string[]
  maxLength?: number
  placeholder?: string
  disabled?: boolean
}

const audienceConfig: Record<AudienceType, { 
  label: string
  icon: React.ElementType
  description: string
}> = {
  "all-fans": {
    label: "All Fans",
    icon: Users,
    description: "Broadcast to all attendees",
  },
  "zone": {
    label: "Specific Zone",
    icon: MapPin,
    description: "Target a specific stadium zone",
  },
  "all-staff": {
    label: "All Staff",
    icon: UserCog,
    description: "Broadcast to operations team",
  },
}

function BroadcastComposer({
  onSend,
  zones = ["North Stand", "South Stand", "East Stand", "West Stand", "VIP Section"],
  maxLength = 280,
  placeholder = "Type your broadcast message...",
  disabled = false,
  className,
  ...props
}: BroadcastComposerProps) {
  const [message, setMessage] = React.useState("")
  const [audience, setAudience] = React.useState<AudienceType>("all-fans")
  const [selectedZone, setSelectedZone] = React.useState<string>("")
  const [isSending, setIsSending] = React.useState(false)

  const canSend = message.trim().length > 0 && 
    (audience !== "zone" || selectedZone) && 
    !disabled && 
    !isSending

  const handleSend = async () => {
    if (!canSend || !onSend) return
    
    setIsSending(true)
    try {
      await onSend(message, audience, audience === "zone" ? selectedZone : undefined)
      setMessage("")
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && canSend) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        "bg-white dark:bg-slate-800/50",
        "border-slate-200 dark:border-slate-700",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 mb-3">
        <Radio className="size-4 text-amber-500" />
        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
          Broadcast Message
        </h3>
      </div>

      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isSending}
        className="min-h-24 resize-none bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700"
      />
      
      <div className="mt-2 flex items-center justify-between">
        <span className={cn(
          "text-xs",
          message.length > maxLength * 0.9 
            ? "text-amber-600 dark:text-amber-400" 
            : "text-slate-500 dark:text-slate-400"
        )}>
          {message.length}/{maxLength}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select 
            value={audience} 
            onValueChange={(v) => setAudience(v as AudienceType)}
            disabled={disabled || isSending}
          >
            <SelectTrigger className="w-full sm:w-40 bg-slate-50 dark:bg-slate-900/50">
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(audienceConfig).map(([value, config]) => {
                const Icon = config.icon
                return (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <Icon className="size-4" />
                      <span>{config.label}</span>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>

          {audience === "zone" && (
            <Select 
              value={selectedZone} 
              onValueChange={setSelectedZone}
              disabled={disabled || isSending}
            >
              <SelectTrigger className="w-full sm:w-40 bg-slate-50 dark:bg-slate-900/50">
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <Button
          onClick={handleSend}
          disabled={!canSend}
          className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
        >
          {isSending ? (
            <>
              <Spinner className="size-4" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="size-4" />
              <span>Send Broadcast</span>
            </>
          )}
        </Button>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-mono text-[10px]">Cmd</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-mono text-[10px]">Enter</kbd> to send
      </p>
    </div>
  )
}

export { BroadcastComposer, type BroadcastComposerProps, type AudienceType }
