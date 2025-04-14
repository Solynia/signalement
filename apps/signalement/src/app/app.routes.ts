import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'authors',
    loadComponent: () =>
      import('@signalement/authors-page').then((c) => c.AuthorsPageComponent),
    title: 'Authors | Signalement',
  },
  {
    path: 'authors/:id',
    loadComponent: () =>
      import('@signalement/author-details-page').then(
        (c) => c.AuthorDetailsPageComponent
      ),
    title: 'Edit author | Signalement',
  },
  {
    path: 'authors/new',
    loadComponent: () =>
      import('@signalement/author-details-page').then(
        (c) => c.AuthorDetailsPageComponent
      ),
    title: 'New author | Signalement',
  },
  {
    path: 'signalements',
    loadComponent: () =>
      import('@signalement/signalements-page').then(
        (c) => c.SignalementsPageComponent
      ),
    title: 'Signalements | Signalement',
  },
  {
    path: 'signalements/:id',
    loadComponent: () =>
      import('@signalement/signalement-details-page').then(
        (c) => c.SignalementDetailsPageComponent
      ),
    title: 'Edit signalement | Signalement',
  },
  {
    path: 'signalements/new',
    loadComponent: () =>
      import('@signalement/signalement-details-page').then(
        (c) => c.SignalementDetailsPageComponent
      ),
    title: 'New signalement | Signalement',
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
