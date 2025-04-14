import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { authorActions } from '@signalement/author-store';

export const canAuthorIdSync: CanActivateFn = ({ params }) => {
  inject(Store).dispatch(
    authorActions.authorSelectionChanged({ id: params['id'] })
  );
  return true;
};

export const canAuthorIdFlush: CanDeactivateFn<unknown> = () => {
  inject(Store).dispatch(
    authorActions.authorSelectionChanged({ id: undefined })
  );
  return true;
};
