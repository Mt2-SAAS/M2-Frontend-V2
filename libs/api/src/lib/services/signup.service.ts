import { Injectable } from '@angular/core';
import { HttpService } from './http/http.service';
import { AccountSend } from '@metin2/api';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  errorMessage: string;
  showMessage: boolean;

  tmpUser: any;

  constructor(
    private http: HttpService
  ) { }

  private showErrors() {
    this.showMessage = true;
    setTimeout( () => {
      this.showMessage = false;
    }, 5000);
  }

  signup(user: AccountSend) {
    return this.http.create_user(user);
  }

  check_user(username: string) {
    return this.http.verify_user(username);
  }


}
