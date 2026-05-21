"use client"

import { useState } from "react"
import { Radio, Send, Users, MapPin, AlertCircle, Check } from "lucide-react"
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

const audienceOptions = [
  { value: "all-fans", label: "All Fans", icon: Users, count: "24,500" },
  { value: "all-staff", label: "All Staff", icon: Users, count: "450" },
  { value: "zone-north", label: "Zone: North Stand", icon: MapPin, count: "6,420" },
  { value: "zone-south", label: "Zone: South Stand", icon: MapPin, count: "4,860" },
  { value: "zone-east", label: "Zone: East Stand", icon: MapPin, count: "5,220" },
  { value: "zone-west", label: "Zone: West Stand", icon: MapPin, count: "5,140" },
  { value: "vip", label: "VIP & Corporate", icon: Users, count: "2,420" },
  { value: "security", label: "Security Team", icon: Users, count: "120" },
  { value: "medical", label: "Medical Staff", icon: Users, count: "35" },
]

const templates = [
  { id: 1, label: "Emergency Alert", prefix: "EMERGENCY: " },
  { id: 2, label: "Gate Update", prefix: "Gate Update: " },
  { id: 3, label: "Weather Alert", prefix: "Weather Notice: " },
  { id: 4, label: "Match Update", prefix: "Match Info: " },
]

export function BroadcastComposer() {
  const [message, setMessage] = useState("")
  const [audience, setAudience] = useState("")
  const [priority, setPriority] = useState("normal")
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const selectedAudience = audienceOptions.find(a => a.value === audience)
  const charCount = message.length
  const maxChars = 280

  const handleSend = () => {
    if (!message.trim() || !audience) return
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
      setTimeout(() => {
        setIsSent(false)
        setMessage("")
        setAudience("")
        setPriority("normal")
      }, 2000)
    }, 1500)
  }

  const applyTemplate = (template) => {
    setMessage(template.prefix)
  }

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50">
      <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <Radio className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <h2 className="text-slate-100 font-semibold">Broadcast Message</h2>
          <p className="text-slate-500 text-sm">Send alerts to fans or staff</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Templates */}
        <div>
          <label className="text-slate-400 text-xs font-medium mb-2 block">Quick Templates</label>
          <div className="flex flex-wrap gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => applyTemplate(template)}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors"
              >
                {template.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div>
          <label className="text-slate-400 text-xs font-medium mb-2 block">Message</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
            placeholder="Type your broadcast message..."
            className="bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-600 min-h-[100px] resize-none focus:border-amber-500/50"
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className={cn(
              "text-xs",
              charCount > maxChars * 0.9 ? "text-amber-400" : "text-slate-500"
            )}>
              {charCount} / {maxChars}
            </span>
            {charCount > 0 && (
              <button 
                onClick={() => setMessage("")}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Audience Selector */}
        <div>
          <label className="text-slate-400 text-xs font-medium mb-2 block">Audience</label>
          <Select value={audience} onValueChange={setAudience}>
            <SelectTrigger className="bg-slate-900/50 border-slate-700 text-slate-100 focus:border-amber-500/50 focus:ring-amber-500/20">
              <SelectValue placeholder="Select audience..." />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {audienceOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="text-slate-100 focus:bg-slate-700 focus:text-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <option.icon className="w-4 h-4 text-slate-400" />
                    <span>{option.label}</span>
                    <span className="text-slate-500 text-xs">({option.count})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div>
          <label className="text-slate-400 text-xs font-medium mb-2 block">Priority</label>
          <div className="flex gap-2">
            {[
              { value: "normal", label: "Normal", color: "bg-slate-600" },
              { value: "important", label: "Important", color: "bg-amber-500" },
              { value: "urgent", label: "Urgent", color: "bg-red-500" },
            ].map((p) => (
              <button
                key={p.value}
                onClick={() => setPriority(p.value)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all flex-1",
                  priority === p.value
                    ? "bg-slate-700 text-slate-100 ring-1 ring-slate-500"
                    : "bg-slate-900/50 text-slate-400 hover:bg-slate-800"
                )}
              >
                <span className={cn("w-2 h-2 rounded-full", p.color)} />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Warning for urgent */}
        {priority === "urgent" && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-xs">
              Urgent messages will trigger push notifications and audio alerts on all devices.
            </p>
          </div>
        )}

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!message.trim() || !audience || isSending || isSent}
          className={cn(
            "w-full h-11 font-semibold transition-all",
            isSent 
              ? "bg-emerald-500 hover:bg-emerald-500 text-white"
              : "bg-amber-500 hover:bg-amber-600 text-slate-900"
          )}
        >
          {isSent ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Message Sent
            </>
          ) : isSending ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send to {selectedAudience?.count || "0"} recipients
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
