import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { selectSignalements } from '@signalement/signalement-store';
import {
  SignalementTableComponent,
  TableItem,
} from '@signalement/signalement-table';

const pouet = createSelector(selectSignalements, (signalements) =>
  signalements.map<TableItem>((s) => ({
    id: s.id,
    description: s.description,
    authorName: `${s.author.first_name} ${s.author.last_name}`,
    authorEmail: s.author.email,
    observationCount: s.observations.length,
  }))
);

@Component({
  selector: 'sg-signalements-page',
  imports: [SignalementTableComponent],
  templateUrl: './signalements-page.component.html',
  styleUrl: './signalements-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalementsPageComponent {
  private readonly store = inject(Store);
  signalements = this.store.selectSignal(pouet);
}
