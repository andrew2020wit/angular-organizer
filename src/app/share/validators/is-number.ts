import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !(typeof +control.value === 'number' && isFinite(+control.value));

    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
