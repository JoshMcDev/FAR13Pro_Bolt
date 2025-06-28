import { IsString, IsNumber, IsEnum, IsOptional, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export enum AcquisitionStatus {
  PLANNING = 'planning',
  SOLICITATION = 'solicitation',
  EVALUATION = 'evaluation',
  AWARDED = 'awarded',
}

export enum LocationMode {
  CONUS = 'CONUS',
  OCONUS = 'OCONUS',
}

export class CreateAcquisitionDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ enum: AcquisitionStatus })
  @IsEnum(AcquisitionStatus)
  status: AcquisitionStatus

  @ApiProperty({ enum: LocationMode })
  @IsEnum(LocationMode)
  location_mode: LocationMode

  @ApiProperty()
  @IsNumber()
  estimated_value: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  progress?: number

  @ApiProperty()
  @IsUUID()
  user_id: string
}

export class UpdateAcquisitionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ enum: AcquisitionStatus, required: false })
  @IsOptional()
  @IsEnum(AcquisitionStatus)
  status?: AcquisitionStatus

  @ApiProperty({ enum: LocationMode, required: false })
  @IsOptional()
  @IsEnum(LocationMode)
  location_mode?: LocationMode

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  estimated_value?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  progress?: number
}