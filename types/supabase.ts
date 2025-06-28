export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      acquisitions: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'planning' | 'solicitation' | 'evaluation' | 'awarded'
          location_mode: 'CONUS' | 'OCONUS'
          estimated_value: number
          progress: number
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: 'planning' | 'solicitation' | 'evaluation' | 'awarded'
          location_mode: 'CONUS' | 'OCONUS'
          estimated_value: number
          progress?: number
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: 'planning' | 'solicitation' | 'evaluation' | 'awarded'
          location_mode?: 'CONUS' | 'OCONUS'
          estimated_value?: number
          progress?: number
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      documents: {
        Row: {
          id: string
          acquisition_id: string
          title: string
          type: 'rfq' | 'rfp' | 'market_research' | 'acquisition_plan'
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          acquisition_id: string
          title: string
          type: 'rfq' | 'rfp' | 'market_research' | 'acquisition_plan'
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          acquisition_id?: string
          title?: string
          type?: 'rfq' | 'rfp' | 'market_research' | 'acquisition_plan'
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      workflow_items: {
        Row: {
          id: string
          acquisition_id: string
          name: string
          status: 'completed' | 'in-progress' | 'pending'
          phase: 'market-intelligence' | 'acquisition-planning' | 'solicitation' | 'evaluation' | 'award'
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          acquisition_id: string
          name: string
          status?: 'completed' | 'in-progress' | 'pending'
          phase: 'market-intelligence' | 'acquisition-planning' | 'solicitation' | 'evaluation' | 'award'
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          acquisition_id?: string
          name?: string
          status?: 'completed' | 'in-progress' | 'pending'
          phase?: 'market-intelligence' | 'acquisition-planning' | 'solicitation' | 'evaluation' | 'award'
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}