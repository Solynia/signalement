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
  error: string | null;
};

const adapter = createEntityAdapter<Author>();
const initialState: AuthorStoreState = adapter.getInitialState({
  selectedId: undefined,
  loaded: false,
  error: null,
});

export const authorFeature = createFeature({
  name: AUTHOR_STORE_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(authorActions.initAuthorStore, (state) =>
      produce(state, (draft) => {
        draft.loaded = false;
        draft.error = null;
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
    on(authorActions.loadAuthorStoreFailure, (state, { error }) =>
      produce(state, (draft) => {
        draft.error = error;
      })
    ),
    on(authorActions.createAuthorSuccess, (state, { data }) =>
      adapter.addOne(data, state)
    ),
    on(authorActions.createAuthorFailure, (state, { error }) =>
      produce(state, (draft) => {
        draft.error = error;
      })
    ),
    // on(authorActions.updateAuthorSuccess, (state, { data }) =>
    //   adapter.updateOne({ id: data.id, changes: data }, state)
    // ),
    // on(authorActions.updateAuthorFailure, (state, { error }) =>
    //   produce(state, (draft) => {
    //     draft.error = error;
    //   })
    // ),
    on(authorActions.authorSelectionChanged, (state, { id }) =>
      produce(state, (draft) => {
        draft.selectedId = id;
      })
    )
  ),
});
