import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-validation-popover',
  templateUrl: './validation-popover.component.html',
  styleUrls: ['./validation-popover.component.scss']
})
export class ValidationPopoverComponent implements OnInit {
  @Input() control: FormGroup;
  @Input() show: boolean;
  constructor() { }

  ngOnInit() {}

 get errorMessage() {
    for (let propertyName in this.control.errors) {
      if ((this.control.errors.hasOwnProperty(propertyName) && this.control.touched) || this.show) {
          // if((!this.control.errors.required && this.control.value.toString().trim() == ""))
          //   return null;
          
          return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}
