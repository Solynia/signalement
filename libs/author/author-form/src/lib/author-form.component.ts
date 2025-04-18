import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const SEXES = ['Homme', 'Femme', 'Non-binaire'];

const getMinDate = () => {
  const today = new Date();
  return new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
};

const hundredYearsValidator: ValidatorFn = (
  control: AbstractControl<Date | null>
): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }
  const limit = getMinDate();
  const valid = value >= limit;
  return valid ? null : { age: true };
};

export interface AuthorFormValue {
  first_name: string;
  last_name: string;
  birth_date: Date;
  sex: string;
  email: string;
}

export type AuthorForm = {
  [P in keyof AuthorFormValue]: FormControl<AuthorFormValue[P]>;
};

export const authorFormGroupFactory = (
  initialValue?: Partial<AuthorFormValue>
) =>
  new FormGroup<AuthorForm>({
    first_name: new FormControl(initialValue?.first_name ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    last_name: new FormControl(initialValue?.last_name ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    birth_date: new FormControl(initialValue?.birth_date ?? new Date(), {
      nonNullable: true,
      validators: [Validators.required, hundredYearsValidator],
    }),
    sex: new FormControl(initialValue?.sex ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl(initialValue?.email ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

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
  providers: [provideNativeDateAdapter()],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorFormComponent {
  private readonly parentContainer = inject(ControlContainer);

  controlKey = input.required<string>();

  maxDate = new Date();
  minDate = getMinDate();
  sexes = SEXES;

  get form() {
    return (this.parentContainer.control as FormGroup).controls[
      this.controlKey()
    ] as FormGroup<AuthorForm>;
  }
}
