import { Injectable } from '@nestjs/common';
import {
  AuthorCreateDto,
  AuthorDataAccessService,
  AuthorUpdateDto,
} from '@signalement/author-data-access';

@Injectable()
export class AuthorFeatureService {
  constructor(private authorDataAccessService: AuthorDataAccessService) {}

  findById(id: string) {
    return this.authorDataAccessService.findById(id);
  }

  findAll() {
    return this.authorDataAccessService.findAll();
  }

  create(data: AuthorCreateDto) {
    return this.authorDataAccessService.create(data);
  }

  update(id: string, data: AuthorUpdateDto) {
    return this.authorDataAccessService.update(id, data);
  }

  delete(id: string) {
    return this.authorDataAccessService.delete(id);
  }
}
