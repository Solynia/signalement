import { createSelector } from '@ngrx/store';
import { signalementFeature } from './signalement-store.reducer';

export const {
  selectEntities: selectSignalementEntities,
  selectIds: selectSignalementIds,
  selectSelectedId: selectSelectedSignalementId,
  selectLoaded: selectSignalementLoaded,
  selectError: selectSignalementError,
  selectSignalementState,
} = signalementFeature;

export const selectSignalements = createSelector(
  selectSignalementEntities,
  (entities) => Object.values(entities)
);

export const selectSelectedSignalement = createSelector(
  selectSignalementEntities,
  selectSelectedSignalementId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
