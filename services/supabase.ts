import { createClient } from '@/lib/supabase'
import type { Acquisition, Document, WorkflowItem } from '@/types'

const supabase = createClient()

export class SupabaseService {
  // Acquisition methods
  async getAcquisitions(): Promise<Acquisition[]> {
    const { data, error } = await supabase
      .from('acquisitions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  async createAcquisition(acquisition: Omit<Acquisition, 'id' | 'created_at' | 'updated_at'>): Promise<Acquisition> {
    const { data, error } = await supabase
      .from('acquisitions')
      .insert(acquisition)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async updateAcquisition(id: string, updates: Partial<Acquisition>): Promise<Acquisition> {
    const { data, error } = await supabase
      .from('acquisitions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Document methods
  async getDocuments(acquisitionId: string): Promise<Document[]> {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('acquisition_id', acquisitionId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  async createDocument(document: Omit<Document, 'id' | 'created_at' | 'updated_at'>): Promise<Document> {
    const { data, error } = await supabase
      .from('documents')
      .insert(document)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Workflow methods
  async getWorkflowItems(acquisitionId: string): Promise<WorkflowItem[]> {
    const { data, error } = await supabase
      .from('workflow_items')
      .select('*')
      .eq('acquisition_id', acquisitionId)
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return data || []
  }

  async updateWorkflowItem(id: string, updates: Partial<WorkflowItem>): Promise<WorkflowItem> {
    const { data, error } = await supabase
      .from('workflow_items')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Real-time subscriptions
  subscribeToAcquisitions(callback: (payload: any) => void) {
    return supabase
      .channel('acquisitions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'acquisitions' }, callback)
      .subscribe()
  }

  subscribeToDocuments(acquisitionId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`documents:${acquisitionId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'documents',
        filter: `acquisition_id=eq.${acquisitionId}`
      }, callback)
      .subscribe()
  }
}

export const supabaseService = new SupabaseService()