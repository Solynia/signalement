import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Author, AuthorCreate } from '@signalement/author-service';

export const AUTHOR_STORE_FEATURE_KEY = 'author';

export const authorActions = createActionGroup({
  source: AUTHOR_STORE_FEATURE_KEY,
  events: {
    initAuthorStore: emptyProps(),
    loadAuthorStoreSuccess: props<{ data: Author[] }>(),
    loadAuthorStoreFailure: props<{ error: string }>(),
    createAuthor: props<{ data: AuthorCreate }>(),
    createAuthorSuccess: props<{ data: Author }>(),
    createAuthorFailure: props<{ error: string }>(),
    // updateAuthor: props<{ data: AuthorUpdate }>(),
    // updateAuthorSuccess: props<{ data: Author }>(),
    // updateAuthorFailure: props<{ error: string }>(),
    authorSelectionChanged: props<{ id: string | undefined }>(),
  },
});
