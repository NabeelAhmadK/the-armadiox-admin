import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationPopoverComponent } from './validation-popover/validation-popover.component';
import { ValidationService } from './validation.service';

@NgModule({
  declarations: [ValidationPopoverComponent],
  imports: [
    CommonModule
  ],
  exports: [ValidationPopoverComponent],
  providers: [ValidationService]
})
export class ValidationModule { }
