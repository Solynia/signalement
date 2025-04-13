import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

export type TableItem = {
  id: string;
  description: string;
  authorName: string;
  authorEmail: string;
  observationCount: number;
};
const TABLE_COLUMNS = ['id', 'description', 'author', 'observationCount'];
const defaultArray = (value: TableItem[] | null) => value ?? [];

@Component({
  selector: 'sg-signalement-table',
  imports: [MatTableModule, MatTooltipModule],
  templateUrl: './signalement-table.component.html',
  styleUrl: './signalement-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalementTableComponent {
  data = input([], { transform: defaultArray });
  readonly displayedColumns = TABLE_COLUMNS;
}
