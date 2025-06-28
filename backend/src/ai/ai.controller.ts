import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AIService } from './ai.service'
import { AIRequestDto } from './dto/ai.dto'

@ApiTags('ai')
@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Process AI chat request' })
  @ApiResponse({ status: 200, description: 'AI response generated' })
  async processRequest(@Body() aiRequestDto: AIRequestDto) {
    return this.aiService.processRequest(aiRequestDto)
  }
}