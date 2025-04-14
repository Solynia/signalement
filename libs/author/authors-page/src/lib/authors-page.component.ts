import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { selectAuthors } from '@signalement/author-store';
import { AuthorTableComponent, TableItem } from '@signalement/author-table';

const selectData = createSelector(selectAuthors, (authors) =>
  authors.map<TableItem>((a) => a)
);

@Component({
  selector: 'sg-authors-page',
  imports: [AuthorTableComponent, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './authors-page.component.html',
  styleUrl: './authors-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsPageComponent {
  private readonly store = inject(Store);
  authors = this.store.selectSignal(selectData);
}
