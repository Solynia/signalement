import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import {
  SignalementFormComponent,
  SignalementFormValue,
} from '@signalement/signalement-form';
import { Signalement } from '@signalement/signalement-service';
import { selectSelectedSignalement } from '@signalement/signalement-store';
import { ReplaySubject, takeUntil, tap } from 'rxjs';

const modelToFormValue = (
  signalement?: Signalement
): SignalementDetailsFormValue['signalement'] => ({
  description: signalement?.description ?? '',
  observations: signalement?.observations.map((o) => o.name) ?? [],
  author: {
    first_name: signalement?.author.first_name ?? '',
    last_name: signalement?.author.last_name ?? '',
    birth_date: signalement?.author.birth_date ?? new Date(),
    sex: signalement?.author.sex ?? '',
    email: signalement?.author.email ?? '',
  },
});

export interface SignalementDetailsFormValue {
  signalement: SignalementFormValue;
}

type SignalementForm = {
  [P in keyof SignalementDetailsFormValue]: FormControl<
    SignalementDetailsFormValue[P]
  >;
};

@Component({
  selector: 'sg-signalement-details-page',
  imports: [ReactiveFormsModule, MatButtonModule, SignalementFormComponent],
  templateUrl: './signalement-details-page.component.html',
  styleUrl: './signalement-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalementDetailsPageComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);

  private readonly destroyed$ = new ReplaySubject<void>(1);

  readonly form = new FormGroup<SignalementForm>({
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
    throw new Error('Method not implemented.');
  }
}
