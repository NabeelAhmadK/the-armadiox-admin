import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorRoutingModule } from './error.routing';

import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NotFoundComponent } from './not-found/not-found.component';

const PAGES = [AccessDeniedComponent, NotFoundComponent];

import { ErrorsHandler } from './errors-handler';

@NgModule({
  declarations: [...PAGES],
  imports: [CommonModule, ErrorRoutingModule],
  exports: [...PAGES],
  providers: [ErrorsHandler],
})
export class ErrorModule {}
