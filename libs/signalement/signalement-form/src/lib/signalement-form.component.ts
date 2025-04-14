import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
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
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthorFormComponent, AuthorFormValue } from '@signalement/author-form';
import { defaultArray } from '@signalement/ts-utils';
import { produce } from 'immer';
import { ReplaySubject, takeUntil, tap } from 'rxjs';

type AuthorInput = {
  id: string;
  first_name: string;
  last_name: string;
};

const authorOptionsFactory = <T extends AuthorInput>(values: T[] | null) =>
  defaultArray(values).map(({ id, first_name, last_name }) => ({
    id,
    label: `${first_name} ${last_name}`,
  }));

export interface SignalementFormValue {
  description: string;
  observations: ObservationChip[];
  authorId: string;
  author: AuthorFormValue;
}

type SignalementForm = {
  [P in keyof SignalementFormValue]: FormControl<SignalementFormValue[P]>;
};

type OnChangeFn = (value: SignalementFormValue | null) => void;

type OnTouchedFn = () => void;

type ObservationChip = { id?: string; name: string };

@Component({
  selector: 'sg-signalement-form',
  imports: [
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
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
  authors = input([], {
    transform: authorOptionsFactory<AuthorInput>,
  });
  readonly checked = signal(true);
  readonly observations = signal<ObservationChip[]>([]);

  private readonly destroyed$ = new ReplaySubject<void>(1);

  readonly form = new FormGroup<SignalementForm>({
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    observations: new FormControl([], {
      nonNullable: true,
    }),
    authorId: new FormControl('', {
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

  ngAfterViewInit() {
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

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  writeValue(value: SignalementFormValue) {
    this.form.setValue(value);
    this.value = value;
    this.observations.set(value.observations);
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

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
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

  //#region toggle check
  readonly checkLabel = computed(() =>
    this.checked() ? 'Auteur existant' : 'Nouvel Auteur'
  );

  onCheckChange = effect(() => {
    if (this.checked()) {
      this.form.controls.authorId.enable();
      this.form.controls.authorId.addValidators(Validators.required);
      this.form.controls.author.disable();
      this.form.controls.author.removeValidators(Validators.required);
    } else {
      this.form.controls.authorId.disable();
      this.form.controls.author.addValidators(Validators.required);
      this.form.controls.author.enable();
      this.form.controls.authorId.removeValidators(Validators.required);
    }
    // trigger validation check
    this.form.setValue(this.form.getRawValue());
  });
  //#endregion toggle check

  //#region observation chips
  addObservation(event: MatChipInputEvent) {
    const name = (event.value || '').trim();

    if (name) {
      this.observations.update((observations) => [...observations, { name }]);
    }

    event.chipInput.clear();
    this.updateObservationControl();
  }

  editObservation(event: MatChipEditedEvent, observation: ObservationChip) {
    const value = event.value.trim();

    if (!value) {
      this.removeObservation(observation);
      return;
    }

    this.observations.update((observations) => {
      const index = observations.findIndex((o) => o.name === observation.name);
      if (index >= 0) {
        return produce(observations, (draft) => {
          draft[index].name = value;
        });
      }
      return observations;
    });
    this.updateObservationControl();
  }

  removeObservation(value: ObservationChip) {
    this.observations.update((observations) =>
      observations.filter((o) => o.name !== value.name)
    );
    this.updateObservationControl();
  }

  private updateObservationControl() {
    this.form.controls.observations.setValue(this.observations());
  }
  //#endregion observation chips
}
