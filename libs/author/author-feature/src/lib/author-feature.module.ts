import { Module } from '@nestjs/common';
import { AuthorDataAccessModule } from '@signalement/author-data-access';
import { AuthorFeatureController } from './author-feature.controller';
import { AuthorFeatureService } from './author-feature.service';

@Module({
  imports: [AuthorDataAccessModule],
  controllers: [AuthorFeatureController],
  providers: [AuthorFeatureService],
  exports: [],
})
export class AuthorFeatureModule {}
