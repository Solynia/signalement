import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sg-authors-page',
  imports: [],
  templateUrl: './authors-page.component.html',
  styleUrl: './authors-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsPageComponent {}
