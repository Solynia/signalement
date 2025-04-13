import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
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
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthorFormComponent, AuthorFormValue } from '@signalement/author-form';
import { ReplaySubject, takeUntil, tap } from 'rxjs';

export interface SignalementFormValue {
  description: string;
  observations: string[];
  author: AuthorFormValue;
}

type SignalementForm = {
  [P in keyof SignalementFormValue]: FormControl<SignalementFormValue[P]>;
};

type OnChangeFn = (value: SignalementFormValue | null) => void;

type OnTouchedFn = () => void;

@Component({
  selector: 'sg-signalement-form',
  imports: [
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    AuthorFormComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SignalementFormComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: SignalementFormComponent,
    },
  ],
  templateUrl: './signalement-form.component.html',
  styleUrl: './signalement-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalementFormComponent
  implements ControlValueAccessor, Validator, AfterViewInit, OnDestroy
{
  readonly observations = signal<string[]>([]);

  protected destroyed$ = new ReplaySubject<void>(1);

  readonly form = new FormGroup<SignalementForm>({
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    observations: new FormControl([], {
      nonNullable: true,
    }),
    author: new FormControl(
      {
        first_name: '',
        last_name: '',
        birth_date: new Date(),
        sex: '',
        email: '',
      },
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
  });

  value: SignalementFormValue | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: SignalementFormValue | null) => {};

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

  writeValue(value: SignalementFormValue): void {
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

  addObservation(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.observations.update((observations) => [...observations, value]);
    }

    event.chipInput.clear();
  }

  editObservation(event: MatChipEditedEvent, observation: string) {
    const value = event.value.trim();

    if (!value) {
      this.removeObservation(observation);
      return;
    }

    this.observations.update((observations) => {
      const index = observations.indexOf(observation);
      if (index >= 0) {
        observations[index] = value;
        return [...observations];
      }
      return observations;
    });
  }

  removeObservation(value: string) {
    this.observations.update((observations) =>
      observations.filter((o) => o !== value)
    );
  }
}
