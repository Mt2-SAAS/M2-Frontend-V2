import { Component  } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../../services/auth/auth.service';

// Redux
import { Store } from '@ngrx/store'
import { AppState } from '../../../store/app.reducers';
import { ShowLoginModal, ShowProfileModal } from '../../../store/actions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {

  constructor(
    public login: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  show_login_modal() {
    this.store.dispatch(ShowLoginModal({show: true}))
  }

  show_profile_modal() {
    this.store.dispatch(ShowProfileModal({show: true}))
    this.router.navigate(['/modal', {outlets: {'modal': ['main']}}])
  }
}
