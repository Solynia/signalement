import { Module } from '@nestjs/common';
import { SignalementDataAccessModule } from '@signalement/signalement-data-access';
import { SignalementFeatureController } from './signalement-feature.controller';
import { SignalementFeatureService } from './signalement-feature.service';

@Module({
  imports: [SignalementDataAccessModule],
  controllers: [SignalementFeatureController],
  providers: [SignalementFeatureService],
  exports: [],
})
export class SignalementFeatureModule {}
