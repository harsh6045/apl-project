"use client"

import { SiteNav } from "@/components/site-nav"
import {
  StatusBadge,
  QueueIndicator,
  NotificationCard,
  ZoneCard,
  TaskCard,
  BroadcastComposer,
} from "@/components/stadium-ops"

export default function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteNav currentPath="/components" variant="dark" />
      <div className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-white">StadiumOps Component Library</h1>
          <p className="mt-2 text-slate-400">
            Shared components for consistent UI across Admin and Fan interfaces
          </p>
        </header>

        {/* StatusBadge */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">StatusBadge</h2>
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex flex-wrap gap-3">
              <StatusBadge status="open" />
              <StatusBadge status="in-progress" />
              <StatusBadge status="resolved" />
              <StatusBadge status="low" />
              <StatusBadge status="medium" />
              <StatusBadge status="high" />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <StatusBadge status="open" size="sm" />
              <StatusBadge status="in-progress" size="default" />
              <StatusBadge status="resolved" size="lg" />
            </div>
          </div>
        </section>

        {/* QueueIndicator */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">QueueIndicator</h2>
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <QueueIndicator level="short" />
              <QueueIndicator level="medium" />
              <QueueIndicator level="long" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <QueueIndicator level="short" size="sm" />
              <QueueIndicator level="medium" size="default" />
              <QueueIndicator level="long" size="lg" />
            </div>
          </div>
        </section>

        {/* NotificationCard */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">NotificationCard</h2>
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 space-y-4">
            <NotificationCard
              title="Gate C Now Open"
              body="Additional entry point activated to reduce congestion at main gates."
              timestamp="2 min ago"
              type="info"
              actionLabel="View Map"
              onAction={() => alert("Navigate to map")}
              onDismiss={() => {}}
            />
            <NotificationCard
              title="High Crowd Density Alert"
              body="North Stand Section 12 approaching capacity. Consider alternate routing."
              timestamp="5 min ago"
              type="warning"
              actionLabel="See Details"
              onAction={() => alert("View details")}
              onDismiss={() => {}}
            />
            <NotificationCard
              title="Staff Check-in Complete"
              body="All 45 assigned security personnel have checked in for this shift."
              timestamp="15 min ago"
              type="success"
              onDismiss={() => {}}
            />
          </div>
        </section>

        {/* ZoneCard */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">ZoneCard</h2>
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ZoneCard
                zoneName="North Stand"
                crowdLevel={2450}
                capacity={4000}
                status="low"
                onClick={() => alert("View North Stand")}
              />
              <ZoneCard
                zoneName="South Stand"
                crowdLevel={3200}
                capacity={4000}
                status="moderate"
                onClick={() => alert("View South Stand")}
              />
              <ZoneCard
                zoneName="East Stand"
                crowdLevel={3650}
                capacity={4000}
                status="high"
                onClick={() => alert("View East Stand")}
              />
              <ZoneCard
                zoneName="VIP Section"
                crowdLevel={480}
                capacity={500}
                status="critical"
                onClick={() => alert("View VIP Section")}
              />
            </div>
          </div>
        </section>

        {/* TaskCard */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">TaskCard</h2>
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 space-y-4">
            <TaskCard
              title="Medical assistance required at Section 14"
              description="Fan reported feeling unwell. First aid team dispatched."
              assignedTo="Dr. Sharma"
              priority="high"
              status="in-progress"
              createdAt="3 min ago"
              onClick={() => alert("View task details")}
            />
            <TaskCard
              title="Spill cleanup near Food Court B"
              assignedTo="Cleaning Team 2"
              priority="medium"
              status="open"
              createdAt="8 min ago"
              onClick={() => alert("View task details")}
            />
            <TaskCard
              title="Replace signage at Gate D"
              description="Damaged directional sign needs replacement before next match."
              assignedTo="Maintenance"
              priority="low"
              status="resolved"
              createdAt="1 hour ago"
            />
          </div>
        </section>

        {/* BroadcastComposer */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">BroadcastComposer</h2>
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <BroadcastComposer
              onSend={async (message, audience, zone) => {
                await new Promise((r) => setTimeout(r, 1000))
                alert(`Sent to ${audience}${zone ? ` (${zone})` : ""}: ${message}`)
              }}
              zones={["North Stand", "South Stand", "East Stand", "West Stand", "VIP Section"]}
            />
          </div>
        </section>

        {/* Light Mode Preview */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Light Mode Preview</h2>
          <div className="p-6 rounded-xl bg-white border border-slate-200">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <StatusBadge status="open" />
                <StatusBadge status="in-progress" />
                <StatusBadge status="resolved" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <QueueIndicator level="short" />
                <QueueIndicator level="medium" />
                <QueueIndicator level="long" />
              </div>
              <ZoneCard
                zoneName="North Stand"
                crowdLevel={2450}
                capacity={4000}
                status="low"
              />
              <NotificationCard
                title="Gate C Now Open"
                body="Additional entry point activated."
                timestamp="2 min ago"
                type="info"
                onDismiss={() => {}}
              />
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  )
}
