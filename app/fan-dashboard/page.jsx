"use client"

import { SiteNav } from "@/components/site-nav"
import { MatchHeader } from "@/components/fan-dashboard/match-header"
import { StadiumMap } from "@/components/fan-dashboard/stadium-map"
import { QuickAccess } from "@/components/fan-dashboard/quick-access"
import { AlertsStrip } from "@/components/fan-dashboard/alerts-strip"
import { BottomNav } from "@/components/fan-dashboard/bottom-nav"

export default function FanDashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <SiteNav currentPath="/fan-dashboard" variant="dark" />
      {/* Fixed Header */}
      <MatchHeader />

      {/* Scrollable Content */}
      <main className="pb-24">
        {/* Live Alerts */}
        <AlertsStrip />

        {/* Stadium Zone Map */}
        <StadiumMap />

        {/* Quick Access Cards */}
        <QuickAccess />
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
