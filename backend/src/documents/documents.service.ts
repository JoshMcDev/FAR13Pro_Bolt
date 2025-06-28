import { Injectable } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'
import { CreateDocumentDto, UpdateDocumentDto } from './dto/document.dto'

@Injectable()
export class DocumentsService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  async findByAcquisition(acquisitionId: string) {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .eq('acquisition_id', acquisitionId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  async create(createDocumentDto: CreateDocumentDto) {
    const { data, error } = await this.supabase
      .from('documents')
      .insert(createDocumentDto)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const { data, error } = await this.supabase
      .from('documents')
      .update({ ...updateDocumentDto, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  async remove(id: string) {
    const { error } = await this.supabase
      .from('documents')
      .delete()
      .eq('id', id)

    if (error) throw new Error(error.message)
    return { message: 'Document deleted successfully' }
  }
}