import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
@Injectable({
    providedIn: 'root'
})
export class APIService {


    apiURL = 'https://armadiox-api.herokuapp.com/api/armadiox/';
    private userEndpoint = 'user';
    constructor(private http: HttpClient, private toast: ToastrService) {

    }
    /*========================================
      CRUD Methods for consuming RESTFul API
    =========================================*/

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }


    // HttpClient API get() method => Fetch Product list
    GetProducts(): Observable<any> {
        return this.http.get<any>(this.apiURL + 'product')
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    GetProductbyId(productId: any): Observable<any> {
        return this.http.get<any>(`${this.apiURL}product/${productId}`)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    SaveProduct(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiURL}product`, payload)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    SaveCustomer(payload: any): Observable<any> {
        return this.http.post<any>(`users`, payload);
    }

    GetCustomer(): Observable<any> {
        return this.http.get('users');
    }

    GetCustomerbyId(customerId: any): Observable<any> {
        return this.http.get<any>(`users/${customerId}`)

    }

    LogIn(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiURL}auth/login`, credentials)
            .pipe(retry(1),
                catchError(this.handleError)
            )
    }

    // Error handling 
    handleError(error) {
        // let errorMessage = '';
        // if (error.error instanceof ErrorEvent) {
        //     // Get client-side error
        //     errorMessage = error.error.errmsg;
        // } else {
        //     // Get server-side error
        //     console.log(error);
        //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.errors.message}`;
        // }
        // this.toast.error('hello');
        // return throwError(errorMessage);
        return 'Error'
    }
}