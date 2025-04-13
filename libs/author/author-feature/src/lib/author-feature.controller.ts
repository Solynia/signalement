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
  AuthorCreateDto,
  AuthorUpdateDto,
} from '@signalement/author-data-access';
import { AuthorFeatureService } from './author-feature.service';

@Controller('author')
export class AuthorFeatureController {
  constructor(private authorFeatureService: AuthorFeatureService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const author = await this.authorFeatureService.findById(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  @Get()
  findAll() {
    return this.authorFeatureService.findAll();
  }

  @Post()
  create(@Body() data: AuthorCreateDto) {
    return this.authorFeatureService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: AuthorUpdateDto) {
    const author = await this.authorFeatureService.findById(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return this.authorFeatureService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const author = await this.authorFeatureService.findById(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return this.authorFeatureService.delete(id);
  }
}
