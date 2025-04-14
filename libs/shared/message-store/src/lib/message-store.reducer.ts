import { createFeature, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import {
  MESSAGE_STORE_FEATURE_KEY,
  messageActions,
} from './message-store.actions';

export type MessageStoreState = {
  error: string | null;
  message: string | null;
};

const initialState: MessageStoreState = {
  error: null,
  message: null,
};

export const messageFeature = createFeature({
  name: MESSAGE_STORE_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(messageActions.errorEmitted, (state, { error }) =>
      produce(state, (draft) => {
        draft.error = error;
      })
    ),
    on(messageActions.messageEmitted, (state, { message }) =>
      produce(state, (draft) => {
        draft.message = message;
      })
    ),

    on(messageActions.messagesDismissed, () => initialState)
  ),
});
