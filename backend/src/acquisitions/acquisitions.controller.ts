import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AcquisitionsService } from './acquisitions.service'
import { CreateAcquisitionDto, UpdateAcquisitionDto } from './dto/acquisition.dto'

@ApiTags('acquisitions')
@Controller('acquisitions')
export class AcquisitionsController {
  constructor(private readonly acquisitionsService: AcquisitionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all acquisitions' })
  @ApiResponse({ status: 200, description: 'Return all acquisitions' })
  async findAll(@Query('userId') userId: string) {
    return this.acquisitionsService.findAll(userId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get acquisition by ID' })
  @ApiResponse({ status: 200, description: 'Return acquisition by ID' })
  async findOne(@Param('id') id: string) {
    return this.acquisitionsService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create new acquisition' })
  @ApiResponse({ status: 201, description: 'Acquisition created successfully' })
  async create(@Body() createAcquisitionDto: CreateAcquisitionDto) {
    return this.acquisitionsService.create(createAcquisitionDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update acquisition' })
  @ApiResponse({ status: 200, description: 'Acquisition updated successfully' })
  async update(@Param('id') id: string, @Body() updateAcquisitionDto: UpdateAcquisitionDto) {
    return this.acquisitionsService.update(id, updateAcquisitionDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete acquisition' })
  @ApiResponse({ status: 200, description: 'Acquisition deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.acquisitionsService.remove(id)
  }
}