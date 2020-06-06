import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Services
import { HttpService } from '../../../../services/http/http.service';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';

@Component({
  selector: 'manager-passwd',
  templateUrl: './password.component.html',
  styles: []
})
export class PasswdComponent implements OnInit {

  form: FormGroup
  message: any;

  constructor(
    private http: HttpService
  ) {
    this.form = new FormGroup({
      current_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      new_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      new_password_again: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  ngOnInit() { }

  send() {
    this.http.change_password(this.form.value).subscribe(
    () => {
      // Show Message
      this.show_message('Contraseña cambiada con exito');
      // Clean form
      this.form.reset();
    },
    () => {
      this.show_message('Contraseña incorrecta');
    })
  }

  show_message(messge: string) {
    this.message = messge
    setTimeout(() => {
      this.message = null
    }, 3000)

  }

}
