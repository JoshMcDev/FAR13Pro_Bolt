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

  // Helper: Get plan limits
  private getPlanLimits(plan: string, isEnterprise: boolean) {
    if (isEnterprise) return { workflows: Infinity, reports: Infinity, maxTokens: 4000, deepResearch: true }
    switch (plan) {
      case 'elite': return { workflows: 100, reports: 100, maxTokens: 4000, deepResearch: true }
      case 'pro': return { workflows: 25, reports: 3, maxTokens: 3000, deepResearch: true }
      case 'basic': return { workflows: 10, reports: 3, maxTokens: 1500, deepResearch: false }
      default: return { workflows: 3, reports: 3, maxTokens: 1500, deepResearch: false }
    }
  }

  // Helper: Reset monthly usage if needed
  private async resetMonthlyUsageIfNeeded(userId: string) {
    const { data: profile, error } = await this.supabase.from('profiles').select('*').eq('id', userId).single()
    if (error) throw new Error(error.message)
    const today = new Date()
    const resetDate = profile.workflow_reset_date ? new Date(profile.workflow_reset_date) : null
    if (!resetDate || today > resetDate) {
      const nextReset = new Date(today.getFullYear(), today.getMonth() + 1, 1)
      await this.supabase.from('profiles').update({ workflows_this_month: 0, workflow_reset_date: nextReset.toISOString().slice(0, 10) }).eq('id', userId)
    }
  }

  // ENFORCED: On workflow creation
  async create(createAcquisitionDto: CreateAcquisitionDto) {
    // Fetch user profile
    await this.resetMonthlyUsageIfNeeded(createAcquisitionDto.user_id)
    const { data: profile, error: profileError } = await this.supabase.from('profiles').select('*').eq('id', createAcquisitionDto.user_id).single()
    if (profileError) throw new Error(profileError.message)
    const { plan, is_enterprise, workflows_this_month } = profile
    const limits = this.getPlanLimits(plan, is_enterprise)
    if (!is_enterprise && workflows_this_month >= limits.workflows) {
      throw new Error('Workflow creation limit reached for your plan. Please upgrade or wait for next month.')
    }
    // Increment workflows_this_month
    await this.supabase.from('profiles').update({ workflows_this_month: (workflows_this_month || 0) + 1 }).eq('id', createAcquisitionDto.user_id)
    // Create acquisition
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

  // ENFORCED: On report generation (to be called from AI/report endpoint)
  async checkReportGenerationLimit(acquisitionId: string, reportType: string, userId: string) {
    // Fetch user profile
    await this.resetMonthlyUsageIfNeeded(userId)
    const { data: profile, error: profileError } = await this.supabase.from('profiles').select('*').eq('id', userId).single()
    if (profileError) throw new Error(profileError.message)
    const { plan, is_enterprise } = profile
    const limits = this.getPlanLimits(plan, is_enterprise)
    if (is_enterprise) return limits
    // Fetch acquisition
    const { data: acq, error: acqError } = await this.supabase.from('acquisitions').select('*').eq('id', acquisitionId).single()
    if (acqError) throw new Error(acqError.message)
    const reportGenerations = acq.report_generations || {}
    const count = reportGenerations[reportType] || 0
    if (count >= limits.reports) {
      throw new Error('Report generation limit reached for this workflow/report. Please upgrade or start a new workflow.')
    }
    // Increment report generation count
    reportGenerations[reportType] = count + 1
    await this.supabase.from('acquisitions').update({ report_generations: reportGenerations }).eq('id', acquisitionId)
    return limits
  }
}