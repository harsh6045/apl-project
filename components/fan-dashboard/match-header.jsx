"use client"

import { Signal } from "lucide-react"

export function MatchHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-white/10">
      <div className="px-4 py-3">
        {/* Match Info Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wider">Live</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-white/60">
            <Signal className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Strong</span>
          </div>
        </div>

        {/* Score Ticker */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
              <span className="text-[10px] font-bold text-black">CSK</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">185/4</p>
              <p className="text-white/50 text-xs mt-0.5">18.2 overs</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center px-4">
            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">vs</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-white/60 font-bold text-lg leading-none">167/10</p>
              <p className="text-white/50 text-xs mt-0.5">19.4 overs</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">MI</span>
            </div>
          </div>
        </div>

        {/* Venue */}
        <div className="mt-2 text-center">
          <p className="text-[11px] text-white/40 font-medium">M.A. Chidambaram Stadium, Chennai</p>
        </div>
      </div>
    </header>
  )
}
