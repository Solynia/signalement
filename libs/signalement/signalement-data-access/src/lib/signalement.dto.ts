import { Observation, Signalement } from '@prisma/client';
import { AuthorCreateDto, AuthorDto } from '@signalement/author-data-access';

export type ObservationDto = Omit<Observation, 'signalementId'>;

export type ObservationCreateDto = Omit<ObservationDto, 'id'>;

export type ObservationUpdateDto = Required<Pick<ObservationDto, 'id'>> &
  Partial<Omit<ObservationDto, 'id'>>;

export type SignalementDto = Omit<Signalement, 'authorId'> & {
  author: AuthorDto;
  observations: ObservationDto[];
};

export type SignalementCreateDto = Omit<
  SignalementDto,
  'id' | 'author' | 'observations'
> & {
  author: AuthorCreateDto | AuthorDto;
  observations: ObservationCreateDto[];
};

export type SignalementUpdateDto = Required<Pick<SignalementDto, 'id'>> &
  Partial<Omit<SignalementDto, 'id' | 'author' | 'observations'>> & {
    author?: AuthorCreateDto | AuthorDto;
    observations: (ObservationCreateDto | ObservationUpdateDto)[];
  };
