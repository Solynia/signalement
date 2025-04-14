import { Route } from '@angular/router';
import {
  canSignalementIdFlush,
  canSignalementIdSync,
} from '@signalement/signalement-route-guards';

export const appRoutes: Route[] = [
  {
    path: 'authors',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@signalement/authors-page').then(
            (c) => c.AuthorsPageComponent
          ),
        title: 'Authors | Signalement',
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('@signalement/author-details-page').then(
            (c) => c.AuthorDetailsPageComponent
          ),
        title: 'Edit author | Signalement',
      },
      {
        path: 'new',
        loadComponent: () =>
          import('@signalement/author-details-page').then(
            (c) => c.AuthorDetailsPageComponent
          ),
        title: 'New author | Signalement',
      },
    ],
  },
  {
    path: 'signalements',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@signalement/signalements-page').then(
            (c) => c.SignalementsPageComponent
          ),
        title: 'Signalements | Signalement',
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('@signalement/signalement-details-page').then(
            (c) => c.SignalementDetailsPageComponent
          ),
        title: 'Edit signalement | Signalement',
        canActivate: [canSignalementIdSync],
        canDeactivate: [canSignalementIdFlush],
      },
      {
        path: 'new',
        loadComponent: () =>
          import('@signalement/signalement-details-page').then(
            (c) => c.SignalementDetailsPageComponent
          ),
        title: 'New signalement | Signalement',
        canActivate: [canSignalementIdSync],
        canDeactivate: [canSignalementIdFlush],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
