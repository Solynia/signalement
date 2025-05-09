import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { selectSignalements } from '@signalement/signalement-store';
import {
  SignalementTableComponent,
  TableItem,
} from '@signalement/signalement-table';

const selectData = createSelector(selectSignalements, (signalements) =>
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
  imports: [
    SignalementTableComponent,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './signalements-page.component.html',
  styleUrl: './signalements-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalementsPageComponent {
  private readonly store = inject(Store);
  signalements = this.store.selectSignal(selectData);
}
