import { Module } from '@nestjs/common'
import { AIController } from './ai.controller'
import { AIService } from './ai.service'
import { LangChainService } from './langchain.service'

@Module({
  controllers: [AIController],
  providers: [AIService, LangChainService],
  exports: [AIService, LangChainService],
})
export class AIModule {}