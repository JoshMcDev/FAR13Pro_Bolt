import { IsString, IsEnum, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export enum DocumentType {
  RFQ = 'rfq',
  RFP = 'rfp',
  MARKET_RESEARCH = 'market_research',
  ACQUISITION_PLAN = 'acquisition_plan',
}

export class CreateDocumentDto {
  @ApiProperty()
  @IsUUID()
  acquisition_id: string

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty({ enum: DocumentType })
  @IsEnum(DocumentType)
  type: DocumentType

  @ApiProperty()
  @IsString()
  content: string
}

export class UpdateDocumentDto {
  @ApiProperty({ required: false })
  @IsString()
  title?: string

  @ApiProperty({ enum: DocumentType, required: false })
  @IsEnum(DocumentType)
  type?: DocumentType

  @ApiProperty({ required: false })
  @IsString()
  content?: string
}