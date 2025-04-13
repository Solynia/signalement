import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SignalementService } from '@signalement/signalement-service';
import { catchError, map, of, switchMap } from 'rxjs';
import { signalementActions } from './signalement-store.actions';

export const init$ = createEffect(
  (
    action$ = inject(Actions),
    signalementService = inject(SignalementService)
  ) => {
    return action$.pipe(
      ofType(signalementActions.initSignalementStore),
      switchMap(() => signalementService.findAll()),
      map((data) => signalementActions.loadSignalementStoreSuccess({ data })),
      catchError((error) => {
        console.error('Error', error);
        return of(signalementActions.loadSignalementStoreFailure({ error }));
      })
    );
  },
  { functional: true }
);
