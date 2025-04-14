import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

export type TableItem = {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  sex: string;
  email: string;
};
const TABLE_COLUMNS = [
  'id',
  'first_name',
  'last_name',
  'birth_date',
  'sex',
  'email',
];
const defaultArray = (value: TableItem[] | null) => value ?? [];

@Component({
  selector: 'sg-author-table',
  imports: [
    MatTableModule,
    MatTooltipModule,
    RouterLink,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './author-table.component.html',
  styleUrl: './author-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorTableComponent {
  data = input([], { transform: defaultArray });
  readonly displayedColumns = TABLE_COLUMNS;
}
