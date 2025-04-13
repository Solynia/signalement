import { Module } from '@nestjs/common';
import { AuthorFeatureModule } from '@signalement/author-feature';
import { SignalementFeatureModule } from '@signalement/signalement-feature';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthorFeatureModule, SignalementFeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
