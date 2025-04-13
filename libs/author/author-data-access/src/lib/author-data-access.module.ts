import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@signalement/prisma-client';
import { AuthorDataAccessService } from './author-data-access.service';

@Module({
  imports: [PrismaClientModule],
  providers: [AuthorDataAccessService],
  exports: [AuthorDataAccessService],
})
export class AuthorDataAccessModule {}
