export type Author = {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  sex: string;
  email: string;
};
export type AuthorCreate = Omit<Author, 'id'>;
export type AuthorUpdate = Required<Pick<Author, 'id'>> &
  Partial<Omit<Author, 'id'>>;
