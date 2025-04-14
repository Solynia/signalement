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

export const createSignalement$ = createEffect(
  (
    action$ = inject(Actions),
    signalementService = inject(SignalementService)
  ) => {
    return action$.pipe(
      ofType(signalementActions.createSignalement),
      switchMap(({ data }) => signalementService.create(data)),
      map((data) => signalementActions.createSignalementSuccess({ data })),
      catchError((error) => {
        console.error('Error', error);
        return of(signalementActions.createSignalementFailure({ error }));
      })
    );
  },
  { functional: true }
);

// export const updateSignalement$ = createEffect(
//   (
//     action$ = inject(Actions),
//     signalementService = inject(SignalementService)
//   ) => {
//     return action$.pipe(
//       ofType(signalementActions.updateSignalement),
//       switchMap(({ data }) => signalementService.update(data.id, data)),
//       map((data) => signalementActions.updateSignalementSuccess({ data })),
//       catchError((error) => {
//         console.error('Error', error);
//         return of(signalementActions.updateSignalementFailure({ error }));
//       })
//     );
//   },
//   { functional: true }
// );
