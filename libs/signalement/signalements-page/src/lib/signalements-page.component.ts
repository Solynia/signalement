import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SignalementTableComponent } from '@signalement/signalement-table';

@Component({
  selector: 'sg-signalements-page',
  imports: [SignalementTableComponent],
  templateUrl: './signalements-page.component.html',
  styleUrl: './signalements-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalementsPageComponent {
  signalements = signal([]);
}
