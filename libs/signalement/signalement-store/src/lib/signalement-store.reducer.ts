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
};

const adapter = createEntityAdapter<Signalement>();
const initialState: SignalementStoreState = adapter.getInitialState({
  selectedId: undefined,
  loaded: false,
});

export const signalementFeature = createFeature({
  name: SIGNALEMENT_STORE_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(signalementActions.initSignalementStore, (state) =>
      produce(state, (draft) => {
        draft.loaded = false;
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
    on(signalementActions.createSignalementSuccess, (state, { data }) =>
      adapter.addOne(data, state)
    ),
    on(signalementActions.updateSignalementSuccess, (state, { data }) =>
      adapter.updateOne({ id: data.id, changes: data }, state)
    ),
    on(signalementActions.signalementSelectionChanged, (state, { id }) =>
      produce(state, (draft) => {
        draft.selectedId = id;
      })
    )
  ),
});
