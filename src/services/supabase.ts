import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Acquisition {
  id: string;
  title: string;
  status: 'planning' | 'solicitation' | 'evaluation' | 'awarded';
  created_at: string;
  updated_at: string;
  location_mode: 'CONUS' | 'OCONUS';
  progress: number;
  estimated_value: number;
}

export interface Document {
  id: string;
  acquisition_id: string;
  title: string;
  type: 'rfq' | 'rfp' | 'market_research' | 'acquisition_plan';
  content: string;
  created_at: string;
  updated_at: string;
}

// Acquisition service functions
export const acquisitionService = {
  async getAll(): Promise<Acquisition[]> {
    const { data, error } = await supabase
      .from('acquisitions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async create(acquisition: Omit<Acquisition, 'id' | 'created_at' | 'updated_at'>): Promise<Acquisition> {
    const { data, error } = await supabase
      .from('acquisitions')
      .insert(acquisition)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Acquisition>): Promise<Acquisition> {
    const { data, error } = await supabase
      .from('acquisitions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Document service functions
export const documentService = {
  async getByAcquisition(acquisitionId: string): Promise<Document[]> {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('acquisition_id', acquisitionId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async create(document: Omit<Document, 'id' | 'created_at' | 'updated_at'>): Promise<Document> {
    const { data, error } = await supabase
      .from('documents')
      .insert(document)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};