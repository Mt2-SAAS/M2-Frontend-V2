import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseHttp {

    constructor(
        private http: HttpClient
    ){}

    get_headers() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        return httpOptions;
    }

    get<T>(url: string) {
        return this.http.get<T>(url, this.get_headers());
    }

    post<T>(url: string, body: any) {
        return this.http.post<T>(url, body, this.get_headers());
    }

}

@Injectable()
export class BaseHttpAuth extends BaseHttp {

    private get_token() {
        return localStorage.getItem('token');
    }

    get_headers() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${this.get_token()}`
            })
        };
        return httpOptions;
    }
}
