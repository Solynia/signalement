import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  SignalementCreateDto,
  SignalementUpdateDto,
} from '@signalement/signalement-data-access';
import { SignalementFeatureService } from './signalement-feature.service';

@Controller('signalement')
export class SignalementFeatureController {
  constructor(private signalementFeatureService: SignalementFeatureService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const signalement = await this.signalementFeatureService.findById(id);
    if (!signalement) {
      throw new NotFoundException('Signalement not found');
    }
    return signalement;
  }

  @Get()
  findAll() {
    return this.signalementFeatureService.findAll();
  }

  @Post()
  create(@Body() data: SignalementCreateDto) {
    return this.signalementFeatureService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: SignalementUpdateDto) {
    const signalement = await this.signalementFeatureService.findById(id);
    if (!signalement) {
      throw new NotFoundException('Signalement not found');
    }
    return this.signalementFeatureService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const signalement = await this.signalementFeatureService.findById(id);
    if (!signalement) {
      throw new NotFoundException('Signalement not found');
    }
    return this.signalementFeatureService.delete(id);
  }
}
