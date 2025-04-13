import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { signalementActions } from './signalement-store.actions';

export const init$ = createEffect(
  (action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(signalementActions.initSignalementStore),
      switchMap(() =>
        of(signalementActions.loadSignalementStoreSuccess({ data: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(signalementActions.loadSignalementStoreFailure({ error }));
      })
    );
  },
  { functional: true }
);
