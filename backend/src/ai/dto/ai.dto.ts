import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export enum AIRequestType {
  DOCUMENT_GENERATION = 'document_generation',
  COMPLIANCE_CHECK = 'compliance_check',
  MARKET_ANALYSIS = 'market_analysis',
  GENERAL_QUERY = 'general_query',
}

export class AIRequestDto {
  @ApiProperty({ enum: AIRequestType })
  @IsEnum(AIRequestType)
  type: AIRequestType

  @ApiProperty()
  @IsString()
  content: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  context?: {
    acquisitionType?: string
    locationMode?: 'CONUS' | 'OCONUS'
    estimatedValue?: number
  }
}

export class GenerateDocumentDto {
  @ApiProperty()
  @IsString()
  type: string

  @ApiProperty()
  @IsString()
  requirements: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  context?: any
}

export class ComplianceCheckDto {
  @ApiProperty()
  @IsString()
  document: string

  @ApiProperty()
  @IsString()
  documentType: string
}