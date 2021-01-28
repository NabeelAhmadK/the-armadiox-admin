import { Injectable } from '@angular/core';
import { HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsHandler {
  constructor(private toastService: ToastrService) { }

  handleError(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (response instanceof HttpErrorResponse) {
      // Server error happened
      if (!navigator.onLine) {
        // No Internet connection
        this.toastService.error('No Internet Connection', 'Connect');
      }
      // Http Error, Show notification to the user
      if (response.error) {
        if (!response.error.respPayload) {
          this.toastService.error(
            response.error.message || response.statusText,
            response.error.code || response.status
          );
        } else {
          let err = JSON.parse(response.error.respPayload);
          this.toastService.error(err.message, err.code);
        }

        if (
          response.error.message == 'Please authenticate'
        )
          window.location.href = '/';
      } else
        this.toastService.error(response.message, response.status.toString());
    } else {
      // Client Error Happend
      console.dir(response);
    }

    throw response;
  }
}
