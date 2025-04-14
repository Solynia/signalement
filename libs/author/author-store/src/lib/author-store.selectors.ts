import { createSelector } from '@ngrx/store';
import { authorFeature } from './author-store.reducer';

export const {
  selectEntities: selectAuthorEntities,
  selectIds: selectAuthorIds,
  selectSelectedId: selectSelectedAuthorId,
  selectLoaded: selectAuthorLoaded,
  selectAuthorState,
} = authorFeature;

export const selectAuthors = createSelector(selectAuthorEntities, (entities) =>
  Object.values(entities).filter((e) => !!e)
);

export const selectSelectedAuthor = createSelector(
  selectAuthorEntities,
  selectSelectedAuthorId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
