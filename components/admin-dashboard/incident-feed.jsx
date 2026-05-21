"use client"

import { useState } from "react"
import { AlertTriangle, Clock, User, ChevronRight, Plus, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const incidents = [
  {
    id: 1,
    title: "Medical Emergency",
    location: "Section N2, Row 14",
    priority: "critical",
    status: "in-progress",
    assignee: "Dr. Sharma",
    time: "3 min ago",
    description: "Fan reported chest pain. Medical team en route.",
  },
  {
    id: 2,
    title: "Gate Overcrowding",
    location: "Gate 2 - East Entry",
    priority: "high",
    status: "in-progress",
    assignee: "Team Alpha",
    time: "8 min ago",
    description: "Queue exceeding capacity. Additional lanes being opened.",
  },
  {
    id: 3,
    title: "Restroom Maintenance",
    location: "Restroom N2",
    priority: "medium",
    status: "open",
    assignee: "Unassigned",
    time: "15 min ago",
    description: "Plumbing issue reported. Awaiting maintenance crew.",
  },
  {
    id: 4,
    title: "Lost Child",
    location: "South Stand - Food Court",
    priority: "high",
    status: "resolved",
    assignee: "Security B",
    time: "22 min ago",
    description: "Child reunited with parents at Gate 3.",
  },
  {
    id: 5,
    title: "Power Outage",
    location: "VIP Lounge Section C",
    priority: "medium",
    status: "resolved",
    assignee: "Electrical Team",
    time: "35 min ago",
    description: "Backup generators activated. Power restored.",
  },
  {
    id: 6,
    title: "Crowd Surge Alert",
    location: "East Lower Stand",
    priority: "high",
    status: "monitoring",
    assignee: "Control Room",
    time: "45 min ago",
    description: "Density sensors triggered. Monitoring closely.",
  },
]

const priorityColors = {
  critical: "bg-red-500 text-white",
  high: "bg-amber-500 text-slate-900",
  medium: "bg-yellow-500 text-slate-900",
  low: "bg-slate-500 text-white",
}

const statusColors = {
  open: "text-red-400 bg-red-500/10 border-red-500/20",
  "in-progress": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  monitoring: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  resolved: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
}

const statusLabels = {
  open: "Open",
  "in-progress": "In Progress",
  monitoring: "Monitoring",
  resolved: "Resolved",
}

export function IncidentFeed() {
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredIncidents = statusFilter === "all"
    ? incidents
    : incidents.filter(i => i.status === statusFilter)

  const openCount = incidents.filter(i => i.status === "open" || i.status === "in-progress").length

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 flex flex-col h-full">
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h2 className="text-slate-100 font-semibold">Incident Feed</h2>
            <p className="text-slate-500 text-sm">{openCount} active issues</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200 hover:bg-slate-700">
            <Filter className="w-4 h-4" />
          </Button>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-900">
            <Plus className="w-4 h-4 mr-1" />
            Report
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1 p-2 border-b border-slate-700/50 bg-slate-900/30">
        {["all", "open", "in-progress", "monitoring", "resolved"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={cn(
              "px-2.5 py-1 text-xs font-medium rounded transition-colors capitalize",
              statusFilter === status
                ? "bg-slate-700 text-slate-100"
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            {status === "all" ? "All" : statusLabels[status] || status}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {filteredIncidents.map((incident) => (
            <button
              key={incident.id}
              onClick={() => setSelectedIncident(incident)}
              className={cn(
                "w-full p-3 rounded-lg text-left transition-all",
                "bg-slate-900/50 hover:bg-slate-700/50 border border-transparent",
                selectedIncident?.id === incident.id && "border-amber-500/50 bg-slate-700/50"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0",
                      priorityColors[incident.priority]
                    )} />
                    <h3 className="text-slate-100 font-medium text-sm truncate">{incident.title}</h3>
                  </div>
                  <p className="text-slate-400 text-xs truncate">{incident.location}</p>
                </div>
                <Badge variant="outline" className={cn("text-[10px] flex-shrink-0", statusColors[incident.status])}>
                  {statusLabels[incident.status]}
                </Badge>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700/50">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{incident.assignee}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{incident.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
