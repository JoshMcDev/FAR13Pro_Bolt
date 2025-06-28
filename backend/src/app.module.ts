import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AcquisitionsModule } from './acquisitions/acquisitions.module'
import { DocumentsModule } from './documents/documents.module'
import { AIModule } from './ai/ai.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AcquisitionsModule,
    DocumentsModule,
    AIModule,
  ],
})
export class AppModule {}