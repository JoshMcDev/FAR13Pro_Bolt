import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AIService } from './ai.service'
import { LangChainService } from './langchain.service'
import { AIRequestDto, GenerateDocumentDto, ComplianceCheckDto } from './dto/ai.dto'

@ApiTags('ai')
@Controller('ai')
export class AIController {
  constructor(
    private readonly aiService: AIService,
    private readonly langChainService: LangChainService
  ) {}

  @Post('chat')
  @ApiOperation({ summary: 'Process AI chat request' })
  @ApiResponse({ status: 200, description: 'AI response generated' })
  async processRequest(@Body() aiRequestDto: AIRequestDto) {
    return this.aiService.processRequest(aiRequestDto)
  }

  @Post('generate-document')
  @ApiOperation({ summary: 'Generate document using AI' })
  @ApiResponse({ status: 200, description: 'Document generated successfully' })
  async generateDocument(@Body() generateDocumentDto: GenerateDocumentDto) {
    return this.langChainService.generateDocument(generateDocumentDto)
  }

  @Post('compliance-check')
  @ApiOperation({ summary: 'Perform compliance check' })
  @ApiResponse({ status: 200, description: 'Compliance check completed' })
  async checkCompliance(@Body() complianceCheckDto: ComplianceCheckDto) {
    return this.langChainService.performComplianceReview(
      complianceCheckDto.document,
      complianceCheckDto.documentType
    )
  }
}