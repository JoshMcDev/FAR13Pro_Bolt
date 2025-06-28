import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
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
  // Add a document to Supabase with its embedding
  async addDocument(section: string, title: string, content: string) {
    const embedding = await this.getEmbedding(content)
    const { error } = await supabase.from('documents').insert([
      { section, title, content, embedding }
    ])
    if (error) throw error
  }

  // Get OpenAI embedding for a string
  async getEmbedding(text: string): Promise<number[]> {
    const res = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text
    })
    return res.data[0].embedding
  }

  // Search for similar documents using Supabase vector search
  async searchDocuments(query: string, k = 3) {
    const queryEmbedding = await this.getEmbedding(query)
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_count: k
    })
    if (error) throw error
    return data
  }

  // Generate text with OpenAI (for plans, RFQs, compliance, etc.)
  async generateText(prompt: string, model = 'gpt-4') {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: 'You are an expert government contracting officer.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500
    })
    return completion.choices[0]?.message?.content || ''
  }
}

export const knowledgeService = new KnowledgeService()