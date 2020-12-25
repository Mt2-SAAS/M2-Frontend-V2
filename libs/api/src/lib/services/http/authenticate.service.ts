import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CHPass } from '@metin2/api';
import { BaseHttpAuth } from './base-http.service';


@Injectable()
export class AuthenticateService extends BaseHttpAuth {

  baseUrl = environment.baseUrl;
  socketEndpoint = environment.socketUrl;

  get_current_user() {
    const url = `${this.baseUrl}/api/current_user/`;
    return this.get(url);
  }

  get_current_players() {
    const url = `${this.baseUrl}/api/current_players/`;
    return this.get(url);
  }

  change_password(payload: CHPass) {
    const url = `${this.baseUrl}/api/change_pass/`;
    const body = JSON.stringify(payload);
    return this.post(url, body);
  }

  get_messages() {
    const url = `${this.socketEndpoint}/messages`;
    return this.get(url);
  }

  get_payment_widget() {
    const url = `${this.baseUrl}/widget/`;
    return this.get(url);
  }

  use_payment_code(code: string){
    const url = `${this.baseUrl}/promo/${code}`;
    return this.get<{status: string}>(url);
  }

}
