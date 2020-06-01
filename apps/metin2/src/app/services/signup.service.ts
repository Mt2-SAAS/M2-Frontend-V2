import { Injectable } from '@angular/core';
import { HttpService } from './http/http.service';
import { AccountSend } from '../interfaces/account';


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

  public signup(user: AccountSend) {
    return this.http.create_user(user).subscribe(
      response => {
        this.tmpUser = response;
      },
      err => {
        this.errorMessage = err.error['non_field_errors'][0];
        this.showErrors();
      });

  }

  public check_user(username: string) {
    return this.http.verify_user(username);
  }


}
