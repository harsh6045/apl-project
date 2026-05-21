"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const zones = [
  // North Stand
  { id: "N1", name: "North A", capacity: 2400, current: 2280, x: 0, y: 0, width: 2, height: 1 },
  { id: "N2", name: "North B", capacity: 2200, current: 1980, x: 2, y: 0, width: 2, height: 1 },
  { id: "N3", name: "North C", capacity: 2400, current: 2160, x: 4, y: 0, width: 2, height: 1 },
  // East Stand
  { id: "E1", name: "East Upper", capacity: 3200, current: 2560, x: 6, y: 0, width: 1, height: 2 },
  { id: "E2", name: "East Lower", capacity: 2800, current: 2660, x: 6, y: 2, width: 1, height: 2 },
  // South Stand
  { id: "S1", name: "South A", capacity: 2400, current: 1680, x: 0, y: 3, width: 2, height: 1 },
  { id: "S2", name: "South B (VIP)", capacity: 1200, current: 1140, x: 2, y: 3, width: 2, height: 1 },
  { id: "S3", name: "South C", capacity: 2400, current: 2040, x: 4, y: 3, width: 2, height: 1 },
  // West Stand
  { id: "W1", name: "West Upper", capacity: 3200, current: 3040, x: -1, y: 0, width: 1, height: 2 },
  { id: "W2", name: "West Lower", capacity: 2800, current: 2100, x: -1, y: 2, width: 1, height: 2 },
  // Center sections
  { id: "C1", name: "Pavilion", capacity: 1800, current: 1710, x: 0, y: 1, width: 2, height: 2 },
  { id: "C2", name: "Field Level", capacity: 800, current: 640, x: 2, y: 1, width: 2, height: 2 },
  { id: "C3", name: "Corporate", capacity: 600, current: 570, x: 4, y: 1, width: 2, height: 2 },
]

const getDensityColor = (current, capacity) => {
  const ratio = current / capacity
  if (ratio >= 0.95) return "bg-red-500/80 hover:bg-red-500"
  if (ratio >= 0.85) return "bg-amber-500/80 hover:bg-amber-500"
  if (ratio >= 0.70) return "bg-yellow-500/80 hover:bg-yellow-500"
  return "bg-emerald-500/80 hover:bg-emerald-500"
}

const getDensityLabel = (current, capacity) => {
  const ratio = current / capacity
  if (ratio >= 0.95) return "Critical"
  if (ratio >= 0.85) return "High"
  if (ratio >= 0.70) return "Moderate"
  return "Normal"
}

export function ZoneHeatmap() {
  const [selectedZone, setSelectedZone] = useState(null)
  const [hoveredZone, setHoveredZone] = useState(null)

  const totalCapacity = zones.reduce((sum, z) => sum + z.capacity, 0)
  const totalCurrent = zones.reduce((sum, z) => sum + z.current, 0)

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-slate-100 font-semibold">Stadium Zone Density</h2>
          <p className="text-slate-500 text-sm mt-0.5">Real-time crowd distribution</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-500" />
              <span className="text-slate-400">{"<70%"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-yellow-500" />
              <span className="text-slate-400">70-85%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-500" />
              <span className="text-slate-400">85-95%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span className="text-slate-400">{">95%"}</span>
            </div>
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <div className="text-right">
            <p className="text-slate-100 font-semibold">{totalCurrent.toLocaleString()}</p>
            <p className="text-slate-500 text-xs">of {totalCapacity.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Stadium Grid */}
        <div className="grid grid-cols-8 gap-1.5 aspect-[2/1]">
          {/* West Stand */}
          <div className="col-span-1 row-span-4 grid grid-rows-2 gap-1.5">
            {zones.filter(z => z.id.startsWith("W")).map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                className={cn(
                  "rounded-lg transition-all duration-200 flex flex-col items-center justify-center text-slate-900",
                  getDensityColor(zone.current, zone.capacity),
                  selectedZone?.id === zone.id && "ring-2 ring-white ring-offset-2 ring-offset-slate-800"
                )}
              >
                <span className="font-bold text-sm">{zone.id}</span>
                <span className="text-xs opacity-75">{Math.round((zone.current / zone.capacity) * 100)}%</span>
              </button>
            ))}
          </div>

          {/* Main Stadium Area */}
          <div className="col-span-6 row-span-4 grid grid-cols-6 grid-rows-4 gap-1.5">
            {/* North Stand */}
            {zones.filter(z => z.id.startsWith("N")).map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                className={cn(
                  "col-span-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center text-slate-900",
                  getDensityColor(zone.current, zone.capacity),
                  selectedZone?.id === zone.id && "ring-2 ring-white ring-offset-2 ring-offset-slate-800"
                )}
              >
                <span className="font-bold text-sm">{zone.id}</span>
                <span className="text-xs opacity-75">{Math.round((zone.current / zone.capacity) * 100)}%</span>
              </button>
            ))}

            {/* Center sections - rows 2-3 */}
            {zones.filter(z => z.id.startsWith("C")).map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                className={cn(
                  "col-span-2 row-span-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center text-slate-900",
                  getDensityColor(zone.current, zone.capacity),
                  selectedZone?.id === zone.id && "ring-2 ring-white ring-offset-2 ring-offset-slate-800"
                )}
              >
                <span className="font-bold">{zone.id}</span>
                <span className="text-xs opacity-75">{zone.name}</span>
                <span className="text-sm font-semibold mt-1">{Math.round((zone.current / zone.capacity) * 100)}%</span>
              </button>
            ))}

            {/* South Stand */}
            {zones.filter(z => z.id.startsWith("S")).map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                className={cn(
                  "col-span-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center text-slate-900",
                  getDensityColor(zone.current, zone.capacity),
                  selectedZone?.id === zone.id && "ring-2 ring-white ring-offset-2 ring-offset-slate-800"
                )}
              >
                <span className="font-bold text-sm">{zone.id}</span>
                <span className="text-xs opacity-75">{Math.round((zone.current / zone.capacity) * 100)}%</span>
              </button>
            ))}
          </div>

          {/* East Stand */}
          <div className="col-span-1 row-span-4 grid grid-rows-2 gap-1.5">
            {zones.filter(z => z.id.startsWith("E")).map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                className={cn(
                  "rounded-lg transition-all duration-200 flex flex-col items-center justify-center text-slate-900",
                  getDensityColor(zone.current, zone.capacity),
                  selectedZone?.id === zone.id && "ring-2 ring-white ring-offset-2 ring-offset-slate-800"
                )}
              >
                <span className="font-bold text-sm">{zone.id}</span>
                <span className="text-xs opacity-75">{Math.round((zone.current / zone.capacity) * 100)}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredZone && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-slate-600 rounded-lg p-3 shadow-xl pointer-events-none z-10">
            <p className="text-slate-100 font-semibold">{hoveredZone.name}</p>
            <div className="mt-2 space-y-1 text-sm">
              <div className="flex items-center justify-between gap-6">
                <span className="text-slate-400">Occupancy</span>
                <span className="text-slate-100 font-mono">{hoveredZone.current.toLocaleString()} / {hoveredZone.capacity.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-slate-400">Status</span>
                <span className={cn(
                  "font-medium",
                  getDensityLabel(hoveredZone.current, hoveredZone.capacity) === "Critical" && "text-red-400",
                  getDensityLabel(hoveredZone.current, hoveredZone.capacity) === "High" && "text-amber-400",
                  getDensityLabel(hoveredZone.current, hoveredZone.capacity) === "Moderate" && "text-yellow-400",
                  getDensityLabel(hoveredZone.current, hoveredZone.capacity) === "Normal" && "text-emerald-400"
                )}>
                  {getDensityLabel(hoveredZone.current, hoveredZone.capacity)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
