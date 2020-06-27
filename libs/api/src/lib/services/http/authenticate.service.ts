import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';


@Injectable()
export class AuthenticateService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  private get_headers(): HttpHeaders {
    return new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + this.get_token()
      });
  }

  private get_token() {
      return localStorage.getItem('token');
  }

  private get(url: string) {
    return this.http.get(url, {headers: this.get_headers()} );
  }

  private post(url: string, body: any) {
    const data = JSON.stringify(body);
    return this.http.post(url, body, {headers: this.get_headers()} );
  }

  get_current_user() {
    const url = `${this.baseUrl}/api/current_user/`;
    return this.get(url);
  }

  get_current_players() {
    const url = `${this.baseUrl}/api/current_players/`;
    return this.get(url);
  }

}
