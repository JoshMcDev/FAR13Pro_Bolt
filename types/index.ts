import type { Database } from './supabase'

export type Acquisition = Database['public']['Tables']['acquisitions']['Row']
export type Document = Database['public']['Tables']['documents']['Row']
export type WorkflowItem = Database['public']['Tables']['workflow_items']['Row']

export interface WorkflowPhase {
  id: string
  title: string
  status: 'active' | 'completed' | 'pending'
  progress: number
  items: WorkflowItem[]
}

export interface MetricCard {
  title: string
  value: string
  icon: string
  gradient: string
  change?: {
    value: number
    trend: 'up' | 'down'
  }
}

export interface AIMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface AIRequest {
  type: 'document_generation' | 'compliance_check' | 'market_analysis' | 'general_query'
  content: string
  context?: {
    acquisitionType?: string
    locationMode?: 'CONUS' | 'OCONUS'
    estimatedValue?: number
  }
}

export interface AIResponse {
  content: string
  suggestions?: string[]
  documents?: {
    title: string
    type: string
    content: string
  }[]
}