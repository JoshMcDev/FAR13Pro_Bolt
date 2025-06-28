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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">
            Acquisition Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Streamlined FAR 13 simplified acquisitions for CONUS operations
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/80">
          <Plus className="mr-2 h-4 w-4" />
          New Acquisition
        </Button>
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