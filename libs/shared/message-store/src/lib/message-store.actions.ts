import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const MESSAGE_STORE_FEATURE_KEY = 'message';

export const messageActions = createActionGroup({
  source: MESSAGE_STORE_FEATURE_KEY,
  events: {
    errorEmitted: props<{ error: string }>(),
    messageEmitted: props<{ message: string }>(),
    messagesDismissed: emptyProps(),
  },
});
