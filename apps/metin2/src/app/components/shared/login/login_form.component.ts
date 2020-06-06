import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Servicios
import { AuthService } from '../../../services/auth/auth.service';

// Interfaces
import { User } from '@metin2/api';

// Redux
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { HiddenLoginModal, AddToken, ShowProfileModal } from '../../../store/actions';

@Component({
    selector: 'loginForm',
    templateUrl: './login_form.component.html',
    styles: []
})
export class LoginFormComponent {

    modal: boolean;
    message: string;
    user: User = {
        login: null,
        password: null
    };
    loginForm: FormGroup;

    constructor(
        private login: AuthService,
        private store: Store<AppState>,
        private router: Router
    ) {
        this.loginForm = new FormGroup({
            login : new FormControl('', [
              Validators.required,
              Validators.minLength(4)
            ]),
            password: new FormControl('', [
              Validators.required,
              Validators.minLength(4)
            ])
          });
          this.loginForm.reset(this.user);
    }

    send() {
        this.login.login( this.loginForm.value ).subscribe(
          ({token}) => {
              // Add token to store
              localStorage.setItem('token', token);
              // Add to redux state
              this.store.dispatch(AddToken({token: token}))
              // Clean Form
              this.loginForm.reset(this.user);
              // Close Modal
              this.store.dispatch(HiddenLoginModal({hidden: true}));
              this.store.dispatch(ShowProfileModal({show: true}));
              this.router.navigate(['/modal', {outlets: {'modal': ['main']}}])
          },
          err => {
              console.log(err);
              this.message = 'Nombre de usuario o contraseña incorrecta';
              setTimeout(() => {
                this.message = '';
              }, 3000);
          }
        );
    }

    close_modal() {
      this.store.dispatch(HiddenLoginModal(HiddenLoginModal({hidden: true})))
    }
}
