import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionCreator } from '@ngrx/store';
import { authorActions } from '@signalement/author-store';
import { messageActions } from '@signalement/message-store';
import { SignalementService } from '@signalement/signalement-service';
import { catchError, map, of, switchMap } from 'rxjs';
import { signalementActions } from './signalement-store.actions';

const displaySuccessMessageFactory = (
  action: ActionCreator,
  message: string
) => {
  return createEffect(
    (action$ = inject(Actions)) => {
      return action$.pipe(
        ofType(action),
        map(() => messageActions.messageEmitted({ message }))
      );
    },
    { functional: true }
  );
};

export const init$ = createEffect(
  (
    action$ = inject(Actions),
    signalementService = inject(SignalementService)
  ) => {
    return action$.pipe(
      ofType(
        signalementActions.initSignalementStore,
        authorActions.updateAuthorSuccess
      ),
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

export const updateSignalement$ = createEffect(
  (
    action$ = inject(Actions),
    signalementService = inject(SignalementService)
  ) => {
    return action$.pipe(
      ofType(signalementActions.updateSignalement),
      switchMap(({ data }) => signalementService.update(data.id, data)),
      map((data) => signalementActions.updateSignalementSuccess({ data })),
      catchError((error) => {
        console.error('Error', error);
        return of(signalementActions.updateSignalementFailure({ error }));
      })
    );
  },
  { functional: true }
);

export const displayLoadSuccessMessage = displaySuccessMessageFactory(
  signalementActions.loadSignalementStoreSuccess,
  'Chargement terminé.'
);

export const displayCreateSuccessMessage = displaySuccessMessageFactory(
  signalementActions.createSignalementSuccess,
  'Signalement créé.'
);

export const displayUpdateSuccessMessage = displaySuccessMessageFactory(
  signalementActions.updateSignalementSuccess,
  'Signalement mis à jour.'
);

export const displayErrorMessage$ = createEffect(
  (action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(
        signalementActions.loadSignalementStoreFailure,
        signalementActions.createSignalementFailure,
        signalementActions.updateSignalementFailure
      ),
      map(({ error }) => messageActions.errorEmitted({ error }))
    );
  },
  { functional: true }
);
