import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { signalementActions } from '@signalement/signalement-store';

export const canSignalementIdSync: CanActivateFn = ({ params }) => {
  inject(Store).dispatch(
    signalementActions.signalementSelectionChanged({ id: params['id'] })
  );
  return true;
};

export const canSignalementIdFlush: CanDeactivateFn<unknown> = () => {
  inject(Store).dispatch(
    signalementActions.signalementSelectionChanged({ id: undefined })
  );
  return true;
};
