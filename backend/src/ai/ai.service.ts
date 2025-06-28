import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { AIRequestDto } from './dto/ai.dto'
import { AcquisitionsService } from '../acquisitions/acquisitions.service'

@Injectable()
export class AIService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  constructor(private readonly acquisitionsService: AcquisitionsService) {}

  async processRequest(request: AIRequestDto & { userId: string, acquisitionId: string, reportType: string }) {
    try {
      // ENFORCE PLAN LIMITS
      const limits = await this.acquisitionsService.checkReportGenerationLimit(request.acquisitionId, request.reportType, request.userId)
      // Set max_tokens and Deep Research
      const maxTokens = limits.maxTokens
      const deepResearch = limits.deepResearch

      const systemPrompt = `You are an expert AI assistant specializing in Federal Acquisition Regulation (FAR) 13 simplified acquisitions for government contracting officers. 

Your expertise includes:
- FAR 13 regulations and procedures
- Commercial item determinations
- Market research requirements
- Small business considerations
- CONUS/OCONUS operational differences
- Document generation (RFQs, RFPs, acquisition plans)
- Compliance reviews and risk assessments

Provide accurate, actionable guidance that helps contracting officers make informed decisions while ensuring regulatory compliance.`

      const userPrompt = `Request Type: ${request.type}
Content: ${request.content}
${request.context ? `Context: ${JSON.stringify(request.context)}` : ''}
${deepResearch ? '\n[Deep Research Enabled]' : ''}

Please provide a comprehensive response with specific guidance and recommendations.`

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: maxTokens
      })

      const content = completion.choices[0]?.message?.content || 'I apologize, but I was unable to process your request. Please try again.'

      // Parse response for structured data
      const suggestions = content.includes('Recommendations:') 
        ? content.split('Recommendations:')[1]?.split('\n').filter(line => line.trim().startsWith('-')).map(line => line.trim().substring(1).trim())
        : []

      return {
        content,
        suggestions: suggestions?.slice(0, 3) || []
      }
    } catch (error) {
      console.error('AI Service Error:', error)
      return {
        content: 'I apologize, but I\'m currently unable to process your request. Please ensure your API key is configured correctly and try again.',
        suggestions: []
      }
    }
  }
}