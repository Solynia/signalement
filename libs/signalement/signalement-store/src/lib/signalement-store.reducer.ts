import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Signalement } from '@signalement/signalement-service';
import { produce } from 'immer';
import {
  SIGNALEMENT_STORE_FEATURE_KEY,
  signalementActions,
} from './signalement-store.actions';

export type SignalementStoreState = EntityState<Signalement> & {
  selectedId: string | undefined;
  loaded: boolean;
  error: string | null;
  message: string | null;
};

const adapter = createEntityAdapter<Signalement>();
const initialState: SignalementStoreState = adapter.getInitialState({
  selectedId: undefined,
  loaded: false,
  error: null,
  message: null,
});

export const signalementFeature = createFeature({
  name: SIGNALEMENT_STORE_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(signalementActions.initSignalementStore, (state) =>
      produce(state, (draft) => {
        draft.loaded = false;
        draft.error = null;
      })
    ),
    on(signalementActions.loadSignalementStoreSuccess, (state, { data }) =>
      adapter.setAll(
        data,
        produce(state, (draft) => {
          draft.loaded = true;
        })
      )
    ),
    on(signalementActions.loadSignalementStoreFailure, (state, { error }) =>
      produce(state, (draft) => {
        draft.error = error;
      })
    ),
    on(signalementActions.createSignalementSuccess, (state, { data }) =>
      adapter.addOne(
        data,
        produce(state, (draft) => {
          draft.message = 'Signalement ajouté avec succès';
        })
      )
    ),
    on(signalementActions.createSignalementFailure, (state, { error }) =>
      produce(state, (draft) => {
        draft.error = error;
      })
    ),
    // on(signalementActions.updateSignalementSuccess, (state, { data }) =>
    //   adapter.updateOne(
    //     { id: data.id, changes: data },
    //     produce(state, (draft) => {
    //       draft.message = 'Signalement modifié avec succès';
    //     })
    //   )
    // ),
    // on(signalementActions.updateSignalementFailure, (state, { error }) =>
    //   produce(state, (draft) => {
    //     draft.error = error;
    //   })
    // ),
    on(signalementActions.signalementSelectionChanged, (state, { id }) =>
      produce(state, (draft) => {
        draft.selectedId = id;
      })
    ),
    on(signalementActions.messagesDismissed, (state) =>
      produce(state, (draft) => {
        draft.error = null;
        draft.message = null;
      })
    )
  ),
});
