import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthorService } from '@signalement/author-service';
import { catchError, map, of, switchMap } from 'rxjs';
import { authorActions } from './author-store.actions';

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
