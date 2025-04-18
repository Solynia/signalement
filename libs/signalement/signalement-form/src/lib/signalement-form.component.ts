import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
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
import {
  AuthorForm,
  AuthorFormComponent,
  authorFormGroupFactory,
  AuthorFormValue,
} from '@signalement/author-form';
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

export type SignalementForm = {
  [P in keyof Omit<SignalementFormValue, 'author'>]: FormControl<
    SignalementFormValue[P]
  >;
} & {
  author: FormGroup<AuthorForm>;
};

export const signalementFormGroupFactory = (
  initialValue?: Partial<SignalementFormValue>
) =>
  new FormGroup<SignalementForm>({
    description: new FormControl(initialValue?.description ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    observations: new FormControl(initialValue?.observations ?? [], {
      nonNullable: true,
    }),
    authorId: new FormControl(initialValue?.authorId ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: authorFormGroupFactory(initialValue?.author),
  });

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
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './signalement-form.component.html',
  styleUrl: './signalement-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalementFormComponent implements OnInit, OnDestroy {
  private readonly parentContainer = inject(ControlContainer);
  private readonly destroyed$ = new ReplaySubject<void>(1);

  controlKey = input.required<string>();
  authors = input([], {
    transform: authorOptionsFactory<AuthorInput>,
  });
  readonly checked = signal(true);
  readonly observations = signal<ObservationChip[]>([]);

  get form() {
    return (this.parentContainer.control as FormGroup).controls[
      this.controlKey()
    ] as FormGroup<SignalementForm>;
  }

  ngOnInit() {
    this.form.controls.observations.valueChanges
      .pipe(
        tap((value) => this.observations.set(value)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  //#region toggle check
  readonly checkLabel = computed(() =>
    this.checked() ? 'Auteur existant' : 'Nouvel Auteur'
  );

  onCheckChange = effect(() => {
    if (this.checked()) {
      this.form.controls.authorId.enable();
      this.form.controls.author.disable();
    } else {
      this.form.controls.authorId.disable();
      this.form.controls.author.enable();
    }
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
