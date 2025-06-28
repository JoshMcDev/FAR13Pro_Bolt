import { Injectable } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'
import { CreateAcquisitionDto, UpdateAcquisitionDto } from './dto/acquisition.dto'

@Injectable()
export class AcquisitionsService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  async findAll(userId: string) {
    const { data, error } = await this.supabase
      .from('acquisitions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('acquisitions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  async create(createAcquisitionDto: CreateAcquisitionDto) {
    const { data, error } = await this.supabase
      .from('acquisitions')
      .insert(createAcquisitionDto)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  async update(id: string, updateAcquisitionDto: UpdateAcquisitionDto) {
    const { data, error } = await this.supabase
      .from('acquisitions')
      .update({ ...updateAcquisitionDto, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  async remove(id: string) {
    const { error } = await this.supabase
      .from('acquisitions')
      .delete()
      .eq('id', id)

    if (error) throw new Error(error.message)
    return { message: 'Acquisition deleted successfully' }
  }
}