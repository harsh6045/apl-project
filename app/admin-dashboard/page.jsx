"use client"

import { SiteNav } from "@/components/site-nav"
import { AdminNavbar } from "@/components/admin-dashboard/admin-navbar"
import { AdminSidebar } from "@/components/admin-dashboard/admin-sidebar"
import { ZoneHeatmap } from "@/components/admin-dashboard/zone-heatmap"
import { FacilityStatus } from "@/components/admin-dashboard/facility-status"
import { IncidentFeed } from "@/components/admin-dashboard/incident-feed"
import { BroadcastComposer } from "@/components/admin-dashboard/broadcast-composer"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <SiteNav currentPath="/admin-dashboard" variant="dark" />
      <div className="flex flex-1 min-h-0">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <AdminNavbar />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-[1800px] mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-100">Operations Dashboard</h1>
              <p className="text-slate-500 mt-1">Real-time stadium monitoring and control</p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - Main Content */}
              <div className="col-span-12 xl:col-span-8 space-y-6">
                {/* Zone Heatmap */}
                <ZoneHeatmap />

                {/* Facility Status Table */}
                <FacilityStatus />
              </div>

              {/* Right Column - Panels */}
              <div className="col-span-12 xl:col-span-4 space-y-6">
                {/* Incident Feed */}
                <div className="h-[420px]">
                  <IncidentFeed />
                </div>

                {/* Broadcast Composer */}
                <BroadcastComposer />
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Total Attendance</span>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                <p className="text-2xl font-bold text-slate-100 mt-1">24,520</p>
                <p className="text-slate-500 text-xs mt-0.5">of 33,000 capacity</p>
              </div>

              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Active Staff</span>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
                <p className="text-2xl font-bold text-slate-100 mt-1">438</p>
                <p className="text-slate-500 text-xs mt-0.5">12 on break</p>
              </div>

              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Avg. Wait Time</span>
                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                </div>
                <p className="text-2xl font-bold text-slate-100 mt-1">8.2<span className="text-lg text-slate-400">min</span></p>
                <p className="text-amber-400 text-xs mt-0.5">+2.1 from baseline</p>
              </div>

              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Open Incidents</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </div>
                <p className="text-2xl font-bold text-slate-100 mt-1">3</p>
                <p className="text-red-400 text-xs mt-0.5">1 critical priority</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>
    </div>
  )
}
