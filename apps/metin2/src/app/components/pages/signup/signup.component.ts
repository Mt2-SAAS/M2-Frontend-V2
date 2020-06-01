import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// importando interfaces
import { Account } from '../../../interfaces/account';
import { SignupService } from '../../../services/signup.service';

// RXJS
import { Observable } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form) {
    border: 1px solid red;
  }
  `]
})
export class SignupComponent implements OnInit {

  sigupForm: FormGroup;
  username: boolean;

  checkbox: boolean;

  account: Account = {
    login: null,
    password: null,
    password_again: null,
    real_name: null,
    email: null,
    social_id: 1234567,
    checkbox: false
  };

  constructor(
    public service: SignupService
  ) {
    this.sigupForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ], [ this.verifyUser.bind(this) ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      password_again: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      real_name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      social_id: new FormControl('', [
        Validators.required,
        Validators.pattern('.{7,7}')
      ]),
      checkbox: new FormControl('', [
        Validators.required
      ])
    });
    this.sigupForm.reset(this.account);
   }

  ngOnInit() {
  }


  send() {
    const data = this.sigupForm.value;
    delete data.password_again;
    delete data.checkbox;
    this.service.signup(data);
    this.sigupForm.reset(this.account);
  }

  public verifyUser(control: FormControl): Promise<any> | Observable<any> {
    const usuario = control.value.toLowerCase();
    const promesa = new Promise(
      (resolve, reject) => {
        this.servicio(usuario);
        setTimeout( () => {
          if (this.username) {
            resolve({existe: true});
          } else {
            resolve( null );
          }
        }, 2000);
      }
    );
    return promesa;
  }

  public servicio(usuario: string) {
    this.service.check_user( usuario ).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status) {
          this.username = true;
        } else {
          this.username = false;
        }
      },
      // Manejando el error
      () => {
      this.username = false;
    });
  }

}
