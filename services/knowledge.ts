import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Example knowledge base
const farKnowledgeBase = [
  {
    section: 'FAR 13.003',
    title: 'Policy',
    content: 'Agencies shall use simplified acquisition procedures to the maximum extent practicable for all purchases of supplies or services not exceeding the simplified acquisition threshold.'
  },
  {
    section: 'FAR 13.106-1',
    title: 'Soliciting competition',
    content: 'Contracting officers shall promote competition to the maximum extent practicable to obtain supplies or services from the source whose proposal represents the best value to the Government.'
  },
  {
    section: 'FAR 13.106-3',
    title: 'Award and documentation',
    content: 'Purchases shall be made from the source whose proposal represents the best value to the Government, price and other factors considered.'
  }
]

export class KnowledgeService {
  // Add a document to Supabase
  async addDocument(section: string, title: string, content: string) {
    // You will need to provide the embedding from the server/API route in the future
    // For now, this is a placeholder
    throw new Error('addDocument now requires an embedding, please update to use a server-side API route.');
  }

  // Search for similar documents using Supabase vector search
  async searchDocuments(query: string, k = 3) {
    // You will need to provide the embedding from the server/API route in the future
    // For now, this is a placeholder
    throw new Error('searchDocuments now requires an embedding, please update to use a server-side API route.');
  }
}

export const knowledgeService = new KnowledgeService()