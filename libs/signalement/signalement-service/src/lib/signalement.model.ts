import { Author, AuthorCreate } from '@signalement/author-service';

//#region Observation
export type Observation = {
  name: string;
  id: string;
};
export type ObservationCreate = Omit<Observation, 'id'>;
export type ObservationUpdate = Required<Pick<Observation, 'id'>> &
  Partial<Omit<Observation, 'id'>>;
//#endregion Observation

//#region Signalement
export type Signalement = {
  id: string;
  description: string;
  author: Author;
  observations: Observation[];
};
export type SignalementCreate = Omit<
  Signalement,
  'id' | 'author' | 'observations'
> & {
  author: AuthorCreate | Author;
  observations: ObservationCreate[];
};
export type SignalementUpdate = Required<Pick<Signalement, 'id'>> &
  Partial<Omit<Signalement, 'id' | 'author' | 'observations'>> & {
    author?: AuthorCreate | Author;
    observations?: (ObservationCreate | ObservationUpdate)[];
  };
//#endregion Signalement
