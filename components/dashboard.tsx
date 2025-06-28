"use client"

import { MetricsCards } from '@/components/metrics-cards'
import { WorkflowProgress } from '@/components/workflow-progress'
import { DataVisualization } from '@/components/data-visualization'
import { QuickActions } from '@/components/quick-actions'
import { RecentActivity } from '@/components/recent-activity'
import { LocationStatus } from '@/components/location-status'
import { AIAssistant } from '@/components/ai-assistant'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text">
            Acquisition Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Streamlined FAR 13 acquisitions for operations and training.
          </p>
        </div>
        <div className="flex gap-2 sm:gap-4 ml-auto">
          <Button className="flex-1 min-w-[180px] max-w-xs bg-gradient-to-r from-primary to-primary/80" size="sm">
            + New Acquisition
          </Button>
          <Button className="flex-1 min-w-[180px] max-w-xs bg-gradient-to-r from-primary to-primary/80" size="sm">
            Acquisition in Progress
          </Button>
          <Button className="flex-1 min-w-[180px] max-w-xs bg-gradient-to-r from-primary to-primary/80" size="sm">
            Pre Award Automation
          </Button>
          <Button className="flex-1 min-w-[180px] max-w-xs bg-gradient-to-r from-primary to-primary/80" size="sm">
            Upload Template
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <MetricsCards />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <WorkflowProgress />
          <DataVisualization />
          <QuickActions />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <RecentActivity />
          <LocationStatus />
          <AIAssistant />
        </div>
      </div>
    </div>
  )
}