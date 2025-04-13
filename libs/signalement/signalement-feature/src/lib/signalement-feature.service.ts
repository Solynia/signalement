import { Injectable } from '@nestjs/common';
import {
  SignalementCreateDto,
  SignalementDataAccessService,
  SignalementUpdateDto,
} from '@signalement/signalement-data-access';

@Injectable()
export class SignalementFeatureService {
  constructor(
    private signalementDataAccessService: SignalementDataAccessService
  ) {}

  findById(id: string) {
    return this.signalementDataAccessService.findById(id);
  }

  findAll() {
    return this.signalementDataAccessService.findAll();
  }

  create(data: SignalementCreateDto) {
    return this.signalementDataAccessService.create(data);
  }

  update(id: string, data: SignalementUpdateDto) {
    return this.signalementDataAccessService.update(id, data);
  }

  delete(id: string) {
    return this.signalementDataAccessService.delete(id);
  }
}
