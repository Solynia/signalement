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
    title: 'Author | Signalement',
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
    title: 'Signalement | Signalement',
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
