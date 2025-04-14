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
import { selectAuthors } from '@signalement/author-store';
import {
  SignalementFormComponent,
  SignalementFormValue,
} from '@signalement/signalement-form';
import {
  Signalement,
  SignalementCreate,
  SignalementUpdate,
} from '@signalement/signalement-service';
import {
  selectSelectedSignalement,
  signalementActions,
} from '@signalement/signalement-store';
import { filter, map, ReplaySubject, take, takeUntil, tap } from 'rxjs';

const modelToFormValue = (
  signalement?: Signalement
): SignalementDetailsFormValue['signalement'] => ({
  description: signalement?.description ?? '',
  observations: signalement?.observations ?? [],
  authorId: signalement?.author.id ?? '',
  author: {
    first_name: signalement?.author.first_name ?? '',
    last_name: signalement?.author.last_name ?? '',
    birth_date: signalement?.author.birth_date ?? new Date(),
    sex: signalement?.author.sex ?? '',
    email: signalement?.author.email ?? '',
  },
});

const formValueToCreate = (
  value: SignalementDetailsFormValue['signalement']
): SignalementCreate => ({
  description: value.description,
  author: {
    id: value.authorId,
    first_name: value.author.first_name,
    last_name: value.author.last_name,
    birth_date: value.author.birth_date,
    sex: value.author.sex,
    email: value.author.email,
  },
  observations: value.observations,
});

const formValueToUpdate = (
  id: string,
  value: SignalementDetailsFormValue['signalement']
): SignalementUpdate => ({
  id,

  description: value.description,
  author: {
    id: value.authorId,
    first_name: value.author.first_name,
    last_name: value.author.last_name,
    birth_date: value.author.birth_date,
    sex: value.author.sex,
    email: value.author.email,
  },
  observations: value.observations,
});

export interface SignalementDetailsFormValue {
  signalement: SignalementFormValue;
}

type SignalementDetailsForm = {
  [P in keyof SignalementDetailsFormValue]: FormControl<
    SignalementDetailsFormValue[P]
  >;
};

@Component({
  selector: 'sg-signalement-details-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    SignalementFormComponent,
  ],
  templateUrl: './signalement-details-page.component.html',
  styleUrl: './signalement-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalementDetailsPageComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  private readonly destroyed$ = new ReplaySubject<void>(1);

  readonly authors = this.store.selectSignal(selectAuthors);
  readonly form = new FormGroup<SignalementDetailsForm>({
    signalement: new FormControl<SignalementFormValue>(modelToFormValue(), {
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    this.store
      .select(selectSelectedSignalement)
      .pipe(
        tap((signalement) => {
          this.form.setValue({ signalement: modelToFormValue(signalement) });
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
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      return;
    }

    this.store
      .select(selectSelectedSignalement)
      .pipe(
        take(1),
        filter((s) => !s),
        map((s) =>
          // s
          //   ? signalementActions.updateSignalement({
          //       data: formValueToUpdate(
          //         s.id,
          //         this.form.getRawValue().signalement
          //       ),
          //     })
          //   :
          signalementActions.createSignalement({
            data: formValueToCreate(this.form.getRawValue().signalement),
          })
        ),
        tap((action) => this.store.dispatch(action)),
        tap(() => this.router.navigate(['/signalements'])),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }
}
