"use client"

import { useState } from "react"
import { Utensils, Bath, DoorOpen, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const facilities = [
  { id: 1, type: "food", name: "Food Court A", zone: "North A", status: "operational", queue: 12, wait: "8 min", updated: "2 min ago" },
  { id: 2, type: "food", name: "Food Court B", zone: "South B", status: "busy", queue: 34, wait: "18 min", updated: "1 min ago" },
  { id: 3, type: "food", name: "Snack Bar C", zone: "East Upper", status: "operational", queue: 8, wait: "5 min", updated: "30 sec ago" },
  { id: 4, type: "food", name: "VIP Lounge", zone: "Corporate", status: "operational", queue: 3, wait: "2 min", updated: "1 min ago" },
  { id: 5, type: "washroom", name: "Restroom N1", zone: "North A", status: "operational", queue: 5, wait: "3 min", updated: "45 sec ago" },
  { id: 6, type: "washroom", name: "Restroom N2", zone: "North B", status: "maintenance", queue: 0, wait: "-", updated: "15 min ago" },
  { id: 7, type: "washroom", name: "Restroom S1", zone: "South A", status: "busy", queue: 22, wait: "12 min", updated: "20 sec ago" },
  { id: 8, type: "washroom", name: "Restroom E1", zone: "East Lower", status: "operational", queue: 8, wait: "4 min", updated: "1 min ago" },
  { id: 9, type: "gate", name: "Gate 1", zone: "North", status: "operational", queue: 45, wait: "6 min", updated: "10 sec ago" },
  { id: 10, type: "gate", name: "Gate 2", zone: "East", status: "busy", queue: 120, wait: "15 min", updated: "5 sec ago" },
  { id: 11, type: "gate", name: "Gate 3 (VIP)", zone: "South", status: "operational", queue: 8, wait: "2 min", updated: "30 sec ago" },
  { id: 12, type: "gate", name: "Gate 4", zone: "West", status: "closed", queue: 0, wait: "-", updated: "45 min ago" },
]

const typeIcons = {
  food: Utensils,
  washroom: Bath,
  gate: DoorOpen,
}

const statusColors = {
  operational: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  busy: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  maintenance: "bg-red-500/20 text-red-400 border-red-500/30",
  closed: "bg-slate-500/20 text-slate-400 border-slate-500/30",
}

const statusLabels = {
  operational: "Operational",
  busy: "High Traffic",
  maintenance: "Maintenance",
  closed: "Closed",
}

export function FacilityStatus() {
  const [filter, setFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredFacilities = filter === "all" 
    ? facilities 
    : facilities.filter(f => f.type === filter)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
        <div>
          <h2 className="text-slate-100 font-semibold">Facility Status</h2>
          <p className="text-slate-500 text-sm mt-0.5">Live operational data</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900/50 rounded-lg p-1">
            {["all", "food", "washroom", "gate"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize",
                  filter === type
                    ? "bg-slate-700 text-slate-100"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {type === "all" ? "All" : type}
              </button>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            className="text-slate-400 hover:text-slate-200 hover:bg-slate-700"
          >
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
          </Button>
        </div>
      </div>

      <div className="max-h-[320px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-slate-800 z-10">
            <TableRow className="hover:bg-transparent border-slate-700/50">
              <TableHead className="text-slate-400 font-medium">Facility</TableHead>
              <TableHead className="text-slate-400 font-medium">Zone</TableHead>
              <TableHead className="text-slate-400 font-medium">Status</TableHead>
              <TableHead className="text-slate-400 font-medium text-right">Queue</TableHead>
              <TableHead className="text-slate-400 font-medium text-right">Wait Time</TableHead>
              <TableHead className="text-slate-400 font-medium text-right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFacilities.map((facility) => {
              const Icon = typeIcons[facility.type]
              return (
                <TableRow key={facility.id} className="border-slate-700/50 hover:bg-slate-700/30">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-slate-200 font-medium">{facility.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-400">{facility.zone}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", statusColors[facility.status])}
                    >
                      {statusLabels[facility.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={cn(
                      "font-mono",
                      facility.queue > 50 ? "text-red-400" : 
                      facility.queue > 20 ? "text-amber-400" : "text-slate-300"
                    )}>
                      {facility.queue}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-slate-300 font-mono">{facility.wait}</TableCell>
                  <TableCell className="text-right text-slate-500 text-xs">{facility.updated}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
