import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const startendtime: ValidatorFn = (control: AbstractControl):ValidationErrors|null => {
    let start = control.get('start');
    let end = control.get('end');
    if(start && end && start.value != '' && end.value != '' && start?.value >= end?.value ) {
        end.setErrors({ 'incorrect': true });
        return {
            startendtimeerror : true
        }
    }
return null;
}