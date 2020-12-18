import { Injectable } from '@angular/core';
import { ValidationRules } from './validation.rules';

@Injectable({
  providedIn: 'root'
})
export class ValidationService extends ValidationRules {

  constructor() {
    super();
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'This field is required!',
      'min': `Minimum allowed ${validatorValue.min}`,
      'max': `Maximum allowed ${validatorValue.max}`,
      'email': 'Invalid email address',
      'emptySpaces': 'Please remvoe trailing & leading spaces',
      'invalidAlphaNumeric': 'Invalid characters entered.',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidsubscription': 'Invalid subscription',
      'invalidEmailAddress': 'Invalid email address',
      'invalidphone': 'Invalid phone number',
      'invalidIpAddress': 'Invalid IP address',
      'invalidVersionNumber': 'Invalid version number',
      'invalidNumber': 'Invalid Number',
      'invalidLatitude': 'Invalid latitude',
      'invalidLongitude': 'Invalid longitude',
      'invalidUrl': 'Invalid Url.',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'invalidLetterNumberSpace': 'Invalid characters entered.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'maxlength': `Maximum length ${validatorValue.requiredLength}`,
      'ngbDate': `Invalid Date ${validatorValue.invalid}`,
      'invalidMacAdress': 'Invalid MAC address',
      'invalidprefix': 'Invalid prefix',
      'mustMatch': 'Password must be matched',
      'greaterThen': 'Max. value must be greater or equal to Min.',
      'lessThen': 'Min. value must be less or equal to Max.',
      'anyofChecked': 'Must one item checked atleast',
      'invalidUsername': 'Invalid user name',
      'minLengthArray': 'Must one item atleast',
      'invalidDailCode': 'Invalid Dail Code',
      'InvalidNumberStart': `Number must start from 3-9`,
      'InvalidNumberStartFromOne': `Prefix must start from 1`,
      'InvalidNumberStartFromTwo': `Prefix must start from 2`,
    };
    return config[validatorName];
  }
}
