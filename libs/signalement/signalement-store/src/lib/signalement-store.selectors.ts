import { createSelector } from '@ngrx/store';
import { signalementFeature } from './signalement-store.reducer';

export const {
  selectEntities: selectSignalementEntities,
  selectIds: selectSignalementIds,
  selectSelectedId: selectSelectedSignalementId,
  selectLoaded: selectSignalementLoaded,
  selectSignalementState,
} = signalementFeature;

export const selectSignalements = createSelector(
  selectSignalementEntities,
  (entities) => Object.values(entities).filter((e) => !!e)
);

export const selectSelectedSignalement = createSelector(
  selectSignalementEntities,
  selectSelectedSignalementId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
