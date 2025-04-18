import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authorEffects, authorFeature } from '@signalement/author-store';
import { messageFeature } from '@signalement/message-store';
import {
  signalementEffects,
  signalementFeature,
} from '@signalement/signalement-store';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(appRoutes),
    provideStore({ router: routerReducer }),
    provideRouterStore(),
    provideState(authorFeature),
    provideState(messageFeature),
    provideState(signalementFeature),
    provideEffects([authorEffects, signalementEffects]),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        hideRequiredMarker: false,
        floatLabel: 'always',
        subscriptSizing: 'fixed',
      },
    },
  ],
};
