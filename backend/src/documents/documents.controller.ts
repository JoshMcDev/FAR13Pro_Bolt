import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { DocumentsService } from './documents.service'
import { CreateDocumentDto, UpdateDocumentDto } from './dto/document.dto'

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get documents by acquisition ID' })
  @ApiResponse({ status: 200, description: 'Return documents for acquisition' })
  async findByAcquisition(@Query('acquisitionId') acquisitionId: string) {
    return this.documentsService.findByAcquisition(acquisitionId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document by ID' })
  @ApiResponse({ status: 200, description: 'Return document by ID' })
  async findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create new document' })
  @ApiResponse({ status: 201, description: 'Document created successfully' })
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update document' })
  @ApiResponse({ status: 200, description: 'Document updated successfully' })
  async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentsService.update(id, updateDocumentDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete document' })
  @ApiResponse({ status: 200, description: 'Document deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.documentsService.remove(id)
  }
}