import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LookupService {
    private lookupEndpoint = window.location.origin + "/assets/lookups/";

    constructor(private http: HttpClient) {
    }

    getProductCategory(params?: any): any {
        return this.http.get(`${this.lookupEndpoint}/productCategory.json`);
    }

    getProductType(params?: any): any {
        return this.http.get(`${this.lookupEndpoint}/productType.json`);
    }
}