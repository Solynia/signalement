import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Author } from '@signalement/author-service';
import { produce } from 'immer';
import {
  AUTHOR_STORE_FEATURE_KEY,
  authorActions,
} from './author-store.actions';

export type AuthorStoreState = EntityState<Author> & {
  selectedId: string | undefined;
  loaded: boolean;
};

const adapter = createEntityAdapter<Author>();
const initialState: AuthorStoreState = adapter.getInitialState({
  selectedId: undefined,
  loaded: false,
});

export const authorFeature = createFeature({
  name: AUTHOR_STORE_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(authorActions.initAuthorStore, (state) =>
      produce(state, (draft) => {
        draft.loaded = false;
      })
    ),
    on(authorActions.loadAuthorStoreSuccess, (state, { data }) =>
      adapter.setAll(
        data,
        produce(state, (draft) => {
          draft.loaded = true;
        })
      )
    ),

    on(authorActions.createAuthorSuccess, (state, { data }) =>
      adapter.addOne(data, state)
    ),
    on(authorActions.updateAuthorSuccess, (state, { data }) =>
      adapter.updateOne({ id: data.id, changes: data }, state)
    ),
    on(authorActions.authorSelectionChanged, (state, { id }) =>
      produce(state, (draft) => {
        draft.selectedId = id;
      })
    )
  ),
});
