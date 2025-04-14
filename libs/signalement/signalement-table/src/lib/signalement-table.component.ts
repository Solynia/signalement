import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { defaultArray } from '@signalement/ts-utils';

export type TableItem = {
  id: string;
  description: string;
  authorName: string;
  authorEmail: string;
  observationCount: number;
};
const TABLE_COLUMNS = ['id', 'description', 'author', 'observationCount'];

@Component({
  selector: 'sg-signalement-table',
  imports: [MatTableModule, MatTooltipModule, RouterLink],
  templateUrl: './signalement-table.component.html',
  styleUrl: './signalement-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalementTableComponent {
  data = input([], { transform: defaultArray<TableItem> });
  readonly displayedColumns = TABLE_COLUMNS;
}
