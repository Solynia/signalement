import { TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReplaySubject, takeUntil, tap } from 'rxjs';

const SEXES = ['Homme', 'Femme', 'Non-binaire'];

export interface AuthorFormValue {
  first_name: string;
  last_name: string;
  birth_date: Date;
  sex: string;
  email: string;
}

type AuthorForm = {
  [P in keyof AuthorFormValue]: FormControl<AuthorFormValue[P]>;
};

type OnChangeFn = (value: AuthorFormValue | null) => void;

type OnTouchedFn = () => void;

@Component({
  selector: 'sg-author-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    TitleCasePipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AuthorFormComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AuthorFormComponent,
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorFormComponent
  implements ControlValueAccessor, Validator, AfterViewInit, OnDestroy
{
  maxDate = new Date();
  minDate = new Date(
    this.maxDate.getFullYear() - 100,
    this.maxDate.getMonth(),
    this.maxDate.getDate()
  );
  sexes = SEXES;

  protected destroyed$ = new ReplaySubject<void>(1);

  readonly form = new FormGroup<AuthorForm>({
    first_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    last_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    birth_date: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    sex: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  value: AuthorFormValue | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: AuthorFormValue | null) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  touched = false;

  disabled = false;

  ngAfterViewInit(): void {
    this.form.valueChanges
      .pipe(
        tap(() => {
          this.markAsTouched();
          this.onChange(this.form.getRawValue());
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  writeValue(value: AuthorFormValue): void {
    this.form.setValue(value);
    this.value = value;
  }

  registerOnChange(onChange: OnChangeFn) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: OnTouchedFn) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAllAsTouched() {
    this.form.markAllAsTouched();
  }

  validate(): ValidationErrors | null {
    if (!this.form.valid) {
      return { invalid: true };
    }
    return null;
  }
}
