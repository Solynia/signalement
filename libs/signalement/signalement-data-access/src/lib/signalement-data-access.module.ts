import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@signalement/prisma-client';
import { SignalementDataAccessService } from './signalement-data-access.service';

@Module({
  imports: [PrismaClientModule],
  providers: [SignalementDataAccessService],
  exports: [SignalementDataAccessService],
})
export class SignalementDataAccessModule {}
