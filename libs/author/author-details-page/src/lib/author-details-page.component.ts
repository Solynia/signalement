import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  AuthorForm,
  AuthorFormComponent,
  authorFormGroupFactory,
  AuthorFormValue,
} from '@signalement/author-form';
import {
  Author,
  AuthorCreate,
  AuthorUpdate,
} from '@signalement/author-service';
import { authorActions, selectSelectedAuthor } from '@signalement/author-store';
import { map, ReplaySubject, take, takeUntil, tap } from 'rxjs';

const modelToFormValue = (
  author?: Author
): AuthorDetailsFormValue['author'] => ({
  first_name: author?.first_name ?? '',
  last_name: author?.last_name ?? '',
  birth_date: author?.birth_date ?? new Date(),
  sex: author?.sex ?? '',
  email: author?.email ?? '',
});

const formValueToCreate = (
  value: AuthorDetailsFormValue['author']
): AuthorCreate => value;

const formValueToUpdate = (
  id: string,
  value: AuthorDetailsFormValue['author']
): AuthorUpdate => ({ id, ...value });

export interface AuthorDetailsFormValue {
  author: AuthorFormValue;
}

type AuthorDetailsForm = {
  [P in keyof Omit<AuthorDetailsFormValue, 'author'>]: FormControl<
    AuthorDetailsFormValue[P]
  >;
} & {
  author: FormGroup<AuthorForm>;
};

@Component({
  selector: 'sg-author-details-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    AuthorFormComponent,
  ],
  templateUrl: './author-details-page.component.html',
  styleUrl: './author-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorDetailsPageComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  private readonly destroyed$ = new ReplaySubject<void>(1);

  readonly form = new FormGroup<AuthorDetailsForm>({
    author: authorFormGroupFactory(modelToFormValue()),
  });

  ngOnInit(): void {
    this.store
      .select(selectSelectedAuthor)
      .pipe(
        tap((author) => {
          this.form.setValue({ author: modelToFormValue(author) });
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.store
      .select(selectSelectedAuthor)
      .pipe(
        take(1),
        map((a) =>
          a
            ? authorActions.updateAuthor({
                data: formValueToUpdate(a.id, this.form.getRawValue().author),
              })
            : authorActions.createAuthor({
                data: formValueToCreate(this.form.getRawValue().author),
              })
        ),
        tap((action) => this.store.dispatch(action)),
        tap(() => this.router.navigate(['/authors'])),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }
}
