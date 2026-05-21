"use client"

import { useState } from "react"
import { Users } from "lucide-react"

const zones = [
  { id: "north", name: "North Stand", density: "high", percentage: 92, angle: 0, color: "bg-red-500" },
  { id: "east", name: "East Pavilion", density: "medium", percentage: 68, angle: 90, color: "bg-amber-500" },
  { id: "south", name: "South Stand", density: "low", percentage: 45, angle: 180, color: "bg-emerald-500" },
  { id: "west", name: "West Gallery", density: "medium", percentage: 71, angle: 270, color: "bg-amber-500" },
]

const densityColors = {
  high: { bg: "bg-red-500/20", border: "border-red-500/50", text: "text-red-400", fill: "fill-red-500" },
  medium: { bg: "bg-amber-500/20", border: "border-amber-500/50", text: "text-amber-400", fill: "fill-amber-500" },
  low: { bg: "bg-emerald-500/20", border: "border-emerald-500/50", text: "text-emerald-400", fill: "fill-emerald-500" },
}

export function StadiumMap() {
  const [selectedZone, setSelectedZone] = useState(null)

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-white">Stadium Density</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] text-white/50">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-[10px] text-white/50">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-[10px] text-white/50">High</span>
          </div>
        </div>
      </div>

      {/* Stylized Stadium Map */}
      <div className="relative aspect-square max-w-[280px] mx-auto">
        {/* Outer Ring - Stadium Shape */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Stadium outline */}
          <ellipse cx="100" cy="100" rx="95" ry="95" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          
          {/* Zone segments */}
          {zones.map((zone, index) => {
            const startAngle = zone.angle - 40
            const endAngle = zone.angle + 40
            const innerRadius = 50
            const outerRadius = 90
            
            const startRadOuter = (startAngle * Math.PI) / 180
            const endRadOuter = (endAngle * Math.PI) / 180
            const startRadInner = (startAngle * Math.PI) / 180
            const endRadInner = (endAngle * Math.PI) / 180
            
            const x1 = 100 + outerRadius * Math.cos(startRadOuter)
            const y1 = 100 + outerRadius * Math.sin(startRadOuter)
            const x2 = 100 + outerRadius * Math.cos(endRadOuter)
            const y2 = 100 + outerRadius * Math.sin(endRadOuter)
            const x3 = 100 + innerRadius * Math.cos(endRadInner)
            const y3 = 100 + innerRadius * Math.sin(endRadInner)
            const x4 = 100 + innerRadius * Math.cos(startRadInner)
            const y4 = 100 + innerRadius * Math.sin(startRadInner)
            
            const pathD = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`
            
            const colors = densityColors[zone.density]
            const isSelected = selectedZone === zone.id
            
            return (
              <g key={zone.id}>
                <path
                  d={pathD}
                  className={`${colors.fill} cursor-pointer transition-all duration-200 ${isSelected ? "opacity-80" : "opacity-40"}`}
                  onClick={() => setSelectedZone(isSelected ? null : zone.id)}
                  stroke={isSelected ? "white" : "rgba(255,255,255,0.2)"}
                  strokeWidth={isSelected ? "2" : "1"}
                />
              </g>
            )
          })}
          
          {/* Center - Pitch */}
          <ellipse cx="100" cy="100" rx="35" ry="35" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.5)" strokeWidth="1" />
          <rect x="90" y="80" width="20" height="40" fill="rgba(34,197,94,0.3)" stroke="rgba(34,197,94,0.6)" strokeWidth="0.5" rx="2" />
        </svg>

        {/* Zone Labels */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
          <span className="text-[10px] font-medium text-white/70">North</span>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
          <span className="text-[10px] font-medium text-white/70">South</span>
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-center">
          <span className="text-[10px] font-medium text-white/70">West</span>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-center">
          <span className="text-[10px] font-medium text-white/70">East</span>
        </div>

        {/* Your Location Indicator */}
        <div className="absolute top-[30%] right-[25%]">
          <div className="relative">
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-blue-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white items-center justify-center">
              <span className="text-[6px] font-bold text-white">You</span>
            </span>
          </div>
        </div>
      </div>

      {/* Selected Zone Info */}
      {selectedZone && (
        <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
          {zones.filter(z => z.id === selectedZone).map(zone => {
            const colors = densityColors[zone.density]
            return (
              <div key={zone.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                    <Users className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{zone.name}</p>
                    <p className={`text-xs ${colors.text} capitalize`}>{zone.density} crowd density</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${colors.text}`}>{zone.percentage}%</p>
                  <p className="text-[10px] text-white/40">capacity</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
