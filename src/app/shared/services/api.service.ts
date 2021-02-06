import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
        return this.http.get('product');
    }

    GetProductbyId(productId: any): Observable<any> {
        return this.http.get(`product/${productId}`);
    }

    SaveProduct(payload: any): Observable<any> {
        return this.http.post(`product`, payload);
    }

    UpdateProduct(payload: any): Observable<any> {
        return this.http.patch(`product/${payload.id}`, payload);
    }

    SaveCustomer(payload: any): Observable<any> {
        return this.http.post<any>(`users`, payload);
    }

    GetCustomer(filters?: any): Observable<any> {
        let params = this.paramsBuilder(filters)
        return this.http.get('users', { params: params });
    }

    GetCustomerbyId(customerId: any): Observable<any> {
        return this.http.get<any>(`users/${customerId}`)
    }

    DeleteCustomer(customerId: any): Observable<any> {
        return this.http.delete(`users/${customerId}`)
    }

    paramsBuilder(filter: any) {
        let params = new HttpParams();

        if (filter) {

            if (filter.pagination) {
                params = params.append('page', filter.pagination.pageNum);
                params = params.append('limit', filter.pagination.pageSize);
            }
            if (filter.sortBy) {
                params = params.append('sortBy', filter.sortBy)
            }
            if (filter.name) {
                params = params.append('name', filter.name);
            }
            if (filter.role) {
                params = params.append('role', filter.role);
            }

            if (filter.searchText && filter.searchText != '') {
                params = params.append(filter.searchBy, filter.searchText);
            }
            return params
        }
    }
}