import { Author } from '@prisma/client';

export type AuthorDto = Author;

export type AuthorCreateDto = Omit<AuthorDto, 'id'>;

export type AuthorUpdateDto = Required<Pick<AuthorDto, 'id'>> &
  Partial<Omit<AuthorDto, 'id'>>;
