import { Injectable } from '@angular/core';
import { AccountSend, User, Download } from '@metin2/api';
import { environment } from '@env/environment';

// Base class
import { BaseHttp } from './base-http.service';

@Injectable()
export class HttpService extends BaseHttp {

  token: string;
  baseUrl = environment.baseUrl;

  get_guilds() {
    const url = `${this.baseUrl}/api/guild_rank/`;
    return this.get(url);
  }

  get_players() {
    const url = `${this.baseUrl}/api/player_rank/`;
    return this.get(url);
  }

  get_server_stats() {
    const url = `${this.baseUrl}/api/server_status/`;
    return this.get(url);
  }

  create_user(userForm: AccountSend) {
    const url = `${this.baseUrl}/api/signup/`;
    return this.post(url, userForm);
  }

  verify_user(username: string) {
    const url = `${this.baseUrl}/api/info/${username}`;
    return this.get(url);
  }

  login(LoginData: User) {
    const url = `${this.baseUrl}/api/token/`;
    const body = JSON.stringify(LoginData);
    return this.post(url, body);
  }

  get_downloads(){
    const url = `${this.baseUrl}/api/downloads/`;
    return this.get<Download[]>(url);
  }

}
