import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';

const DURATION = 2000;

export type MessageNotification = {
  label: string;
  type: 'message' | 'error';
} | null;

@Component({
  selector: 'sg-message-notification',
  imports: [],
  templateUrl: './message-notification.component.html',
  styleUrl: './message-notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageNotificationComponent {
  private readonly snackBar = inject(MatSnackBar);

  message = input<MessageNotification>();
  dismiss = output<void>();

  private readonly open = effect(() => {
    const message = this.message();
    if (!message) {
      this.snackBar.dismiss();
      return;
    }
    this.snackBar
      .open(message.label, 'Fermer', {
        duration: DURATION,
        panelClass: message.type,
      })
      .afterDismissed()
      .pipe(tap(() => this.dismiss.emit()))
      .subscribe();
  });
}
