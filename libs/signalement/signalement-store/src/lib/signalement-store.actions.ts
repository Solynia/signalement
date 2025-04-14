import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  Signalement,
  SignalementCreate,
} from '@signalement/signalement-service';

export const SIGNALEMENT_STORE_FEATURE_KEY = 'signalement';

export const signalementActions = createActionGroup({
  source: SIGNALEMENT_STORE_FEATURE_KEY,
  events: {
    initSignalementStore: emptyProps(),
    loadSignalementStoreSuccess: props<{ data: Signalement[] }>(),
    loadSignalementStoreFailure: props<{ error: string }>(),
    createSignalement: props<{ data: SignalementCreate }>(),
    createSignalementSuccess: props<{ data: Signalement }>(),
    createSignalementFailure: props<{ error: string }>(),
    // updateSignalement: props<{ data: SignalementUpdate }>(),
    // updateSignalementSuccess: props<{ data: Signalement }>(),
    // updateSignalementFailure: props<{ error: string }>(),
    signalementSelectionChanged: props<{ id: string | undefined }>(),
  },
});
