import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionCreator } from '@ngrx/store';
import { AuthorService } from '@signalement/author-service';
import { messageActions } from '@signalement/message-store';
import { catchError, map, of, switchMap } from 'rxjs';
import { authorActions } from './author-store.actions';

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
  (action$ = inject(Actions), authorService = inject(AuthorService)) => {
    return action$.pipe(
      ofType(authorActions.initAuthorStore),
      switchMap(() => authorService.findAll()),
      map((data) => authorActions.loadAuthorStoreSuccess({ data })),
      catchError((error) => {
        console.error('Error', error);
        return of(authorActions.loadAuthorStoreFailure({ error }));
      })
    );
  },
  { functional: true }
);

export const createAuthor$ = createEffect(
  (action$ = inject(Actions), authorService = inject(AuthorService)) => {
    return action$.pipe(
      ofType(authorActions.createAuthor),
      switchMap(({ data }) => authorService.create(data)),
      map((data) => authorActions.createAuthorSuccess({ data })),
      catchError((error) => {
        console.error('Error', error);
        return of(authorActions.createAuthorFailure({ error }));
      })
    );
  },
  { functional: true }
);

// export const updateAuthor$ = createEffect(
//   (action$ = inject(Actions), authorService = inject(AuthorService)) => {
//     return action$.pipe(
//       ofType(authorActions.updateAuthor),
//       switchMap(({ data }) => authorService.update(data.id, data)),
//       map((data) => authorActions.updateAuthorSuccess({ data })),
//       catchError((error) => {
//         console.error('Error', error);
//         return of(authorActions.updateAuthorFailure({ error }));
//       })
//     );
//   },
//   { functional: true }
// );

export const displayLoadSuccessMessage = displaySuccessMessageFactory(
  authorActions.loadAuthorStoreSuccess,
  'Chargement terminé.'
);

export const displayCreateSuccessMessage = displaySuccessMessageFactory(
  authorActions.createAuthorSuccess,
  'Auteur créé.'
);

// export const displayUpdateSuccessMessage = displaySuccessMessageFactory(
//   authorActions.updateAuthorSuccess,
//   'Auteur mis à jour.'
// );

export const displayErrorMessage$ = createEffect(
  (action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(
        authorActions.loadAuthorStoreFailure,
        authorActions.createAuthorFailure
        // authorActions.updateAuthorFailure
      ),
      map(({ error }) => messageActions.errorEmitted({ error }))
    );
  },
  { functional: true }
);
