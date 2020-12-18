import { Validators, AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";

export class ValidationRules {

  static emailValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static ipValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/)) {
      return null;
    } else {
      return { 'invalidIpAddress': true };
    }
  }

  static realNumberValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.toString().match(/^-{0,1}\d*\.{0,1}\d+$/)) {
      return null;
    } else {
      return { 'invalidVersionNumber': true };
    }
  }

  static numberValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.toString().match(/^\d+$/)) {
      return null;
    } else {
      return { 'invalidNumber': true };
    }
  }

  static decimalValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.toString().match(/^\d+(\.\d{1,2})?$/)) {
      return null;
    } else {
      return { 'invalidNumber': true };
    }
  }

  static latitudeValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)) {
      return null;
    } else {
      return { 'invalidLatitude': true };
    }
  }

  static longitudeValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}/)) {
      return null;
    } else {
      return { 'invalidLongitude': true };
    }
  }

  static onlyLetterNumberSpace(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/^[^*|\":<>[\]{}`\\()';@&$]+$/)) {
      return null;
    } else {
      return { 'invalidLetterNumberSpace': true };
    }
  }

  static urlValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/ig) || control.value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/)) {
      return null;
    } else {
      return { 'invalidUrl': true };
    }
  }

  static onlyAlphaNumeric(control: AbstractControl): ValidationErrors {
    if (!control.value || (control.value.length && !control.value.match(/[^A-Za-z0-9 _-]/)))
      return ValidationRules.emptySpacesValidator(control);
    else
      return { 'invalidAlphaNumeric': true };
  }

  static onlyUsername(control: AbstractControl): ValidationErrors {
    if (!control.value || (control.value.length && control.value.match(/^[-\w\.\$@\*\!]{1,50}$/)))
      return null;
    else
      return { 'invalidUsername': true };
  }

  static onlyMACAddress(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/^[0-9a-f]{1,2}([\.:-])(?:[0-9a-f]{1,2}\1){4}[0-9a-f]{1,2}$/gmi)) {
      return null;
    } else {
      return { 'invalidMacAdress': true };
    }
  }

  static onlyPrefix(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/^[0-9*#]+$/)) {
      return null;
    } else {
      return { 'invalidprefix': true };
    }
  }

  static smsSubscriptionValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/^[A-Za-z0-9*#]+$/)) {
      return null;
    } else {
      return { 'invalidsubscription': true };
    }
  }

  static ussdSubscriptionValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/^[0-9*#]+$/)) {
      return null;
    } else {
      return { 'invalidsubscription': true };
    }
  }

  static phoneValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/^((\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/g)) {
      return null;
    } else {
      return { 'invalidphone': true };
    }
  }

  static dailCodeValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || !control.value.length || control.value.match(/^\*[0-9\*#]*[0-9]+[0-9\*#]*#$/)) {
      return null;
    } else {
      return { 'invalidDailCode': true };
    }
  }


  static validateStartNumber(controlName: string, ...number): ValidationErrors {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (control.value) {
        let index = number.indexOf(parseInt(control.value[0]));
        if (index >= 0)
          control.setErrors({ InvalidNumberStart: number });
      } else {
        control.setErrors(null);
      }
    }
  }

  static validateStartNumberFromOne(controlName: string, ...number): ValidationErrors {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (control.value) {
        let index = number.indexOf(parseInt(control.value[0]));
        if (index < 0)
          control.setErrors({ InvalidNumberStartFromOne: number });
      } else {
        control.setErrors(null);
      }
    }
  }

  static validateStartNumberFromTwo(controlName: string, ...number): ValidationErrors {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (control.value) {
        let index = number.indexOf(parseInt(control.value[0]));
        if (index < 0)
          control.setErrors({ InvalidNumberStartFromTwo: number });
      } else {
        control.setErrors(null);
      }
    }
  }

  // static anyofChecked(control: AbstractControl): ValidationErrors {    
  //    if (control.errors && !control.errors.mustMatch) {
  //         // return if another validator has already found an error on the matchingControl
  //         return;
  //     }

  //     // set error on matchingControl if validation fails
  //     const rolePermissions = control.get('rolePermissions'); 
  //     if (!rolePermissions) {
  //        // matchingControl.setErrors({ mustMatch: true });                  
  //         return { 'anyofChecked': true };
  //     } else {
  //       // matchingControl.setErrors(null);
  //         return null;
  //     }

  //}

  static matchValidator(controlName: string, matchingControlName: string): ValidationErrors {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  static greateThanValidator(duration_call_min: string, duration_call_max: string, calls_min: string, calls_max: string, delay_min: string, delay_max: string, sleep_min?: string, sleep_max?: string, sleep_calls_min?: string, sleep_calls_max?: string): ValidationErrors {
    return (formGroup: FormGroup) => {
      const duration_call_minControl = formGroup.controls[duration_call_min];
      const duration_call_maxControl = formGroup.controls[duration_call_max];

      const calls_minControl = formGroup.controls[calls_min];
      const calls_maxControl = formGroup.controls[calls_max];

      const delay_minControl = formGroup.controls[delay_min];
      const delay_maxControl = formGroup.controls[delay_max];

      const sleep_minControl = formGroup.controls[sleep_min];
      const sleep_maxControl = formGroup.controls[sleep_max];

      const sleep_calls_minControl = formGroup.controls[sleep_calls_min];
      const sleep_calls_maxControl = formGroup.controls[sleep_calls_max];

      if (sleep_calls_minControl && sleep_calls_maxControl) {
        if ((sleep_calls_minControl.errors && !sleep_calls_minControl.errors.lessThen) || (sleep_calls_maxControl.errors && !sleep_calls_maxControl.errors.greaterThen))
          return;
        else if (sleep_calls_minControl.value && sleep_calls_maxControl.value &&
          (Number(sleep_calls_minControl.value) > Number(sleep_calls_maxControl.value) ||
            Number(sleep_calls_maxControl.value) < Number(sleep_calls_minControl.value))) {
          sleep_calls_minControl.setErrors({ lessThen: true });
          sleep_calls_maxControl.setErrors({ greaterThen: true });
        }
        else {
          sleep_calls_minControl.setErrors(null);
          sleep_calls_maxControl.setErrors(null);
        }
      }

      if (sleep_minControl && sleep_maxControl) {
        if ((sleep_minControl.errors && !sleep_minControl.errors.lessThen) || (sleep_maxControl.errors && !sleep_maxControl.errors.greaterThen))
          return;
        else if (sleep_minControl.value && sleep_maxControl.value &&
          (Number(sleep_minControl.value) > Number(sleep_maxControl.value) ||
            Number(sleep_maxControl.value) < Number(sleep_minControl.value))) {
          sleep_minControl.setErrors({ lessThen: true });
          sleep_maxControl.setErrors({ greaterThen: true });
        }
        else {
          sleep_minControl.setErrors(null);
          sleep_maxControl.setErrors(null);
        }
      }

      // set error on greaterThen if validation fails
      if ((duration_call_minControl.errors && !duration_call_minControl.errors.lessThen) || (duration_call_maxControl.errors && !duration_call_maxControl.errors.greaterThen))
        return;
      else if (duration_call_minControl.value && duration_call_maxControl.value &&
        (Number(duration_call_minControl.value) > Number(duration_call_maxControl.value) ||
          Number(duration_call_maxControl.value) < Number(duration_call_minControl.value))) {
        duration_call_minControl.setErrors({ lessThen: true });
        duration_call_maxControl.setErrors({ greaterThen: true });
      }
      else {
        duration_call_minControl.setErrors(null);
        duration_call_maxControl.setErrors(null);
      }

      if ((calls_minControl.errors && !calls_minControl.errors.lessThen) || (calls_maxControl.errors && !calls_maxControl.errors.greaterThen))
        return;
      else if (calls_minControl.value && calls_maxControl.value &&
        (Number(calls_minControl.value) > Number(calls_maxControl.value) ||
          Number(calls_maxControl.value) < Number(calls_minControl.value))) {
        calls_minControl.setErrors({ lessThen: true });
        calls_maxControl.setErrors({ greaterThen: true });
      }
      else {
        calls_minControl.setErrors(null);
        calls_maxControl.setErrors(null);
      }

      if ((delay_minControl.errors && !delay_minControl.errors.lessThen) || (delay_maxControl.errors && !delay_maxControl.errors.greaterThen))
        return;
      else if (delay_minControl.value && delay_maxControl.value &&
        (Number(delay_minControl.value) > Number(delay_maxControl.value) ||
          Number(delay_maxControl.value) < Number(delay_minControl.value))) {
        delay_minControl.setErrors({ lessThen: true });
        delay_maxControl.setErrors({ greaterThen: true });
      }
      else {
        delay_minControl.setErrors(null);
        delay_maxControl.setErrors(null);
      }
    }
  }

  static greaterThenValidator(minControlName: string, maxControlName: string): ValidationErrors {
    return (formGroup: FormGroup) => {
      const minControl = formGroup.controls[minControlName];
      const maxControl = formGroup.controls[maxControlName];

      if (maxControl.errors && !maxControl.errors.greaterThen) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on greaterThen if validation fails
      if (minControl.value && maxControl.value && parseInt(minControl.value) > parseInt(maxControl.value))
        minControl.setErrors({ greaterThen: true });
      else
        minControl.setErrors(null);
    }
  }

  static atleastOnePhoneNumber(controlToNumber: string, controlFromNumber: string, matchingControlName: string, bypassControlName: string): ValidationErrors {
    return (formGroup: FormGroup) => {
      const bypassControl = formGroup.controls[bypassControlName];
      const toName = formGroup.controls[controlToNumber];
      const fromName = formGroup.controls[controlFromNumber];
      const matchingControl = formGroup.controls[matchingControlName];

      if (!bypassControl.value && matchingControl.value == 2 && toName.value.length < 1)
        toName.setErrors({ minLengthArray: true });
      else if (!bypassControl.value && matchingControl.value == 1 && fromName.value.length < 1)
        fromName.setErrors({ minLengthArray: true });
      else {
        fromName.setErrors(null);
        toName.setErrors(null);
        return null;
      }
    }
  }

  static minLengthArray(min: number): ValidationErrors {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value.length >= min) {
        control.setErrors(null);
        return null;
      }

      control.setErrors({ minLengthArray: true });
    }
  }

  static emptySpacesValidator(control: AbstractControl): ValidationErrors {
    if (!control.value || control.value.toString().trim() != "") {
      return null;
    } else {
      return { 'emptySpaces': true };
    }
  }

  // static sameValueValidation(controlA: string, controlB: string): ValidationErrors {
  //   return (formGroup: FormGroup) => {
  //     const control_A = formGroup.controls[controlA];
  //     const control_B = formGroup.controls[controlB];

  //     if (control_A.errors && control_B) {
  //       // return if another validator has already found an error on the matchingControl
  //       return;
  //     }

  //     // set error on greaterThen if validation fails
  //     if (minControl.value && maxControl.value && parseInt(minControl.value) > parseInt(maxControl.value))
  //       minControl.setErrors({ greaterThen: true });
  //     else
  //       minControl.setErrors(null);
  //   }
  // }

}