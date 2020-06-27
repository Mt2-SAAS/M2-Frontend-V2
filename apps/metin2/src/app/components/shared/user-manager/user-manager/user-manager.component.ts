import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '@metin2/api';

// Redux
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import {
  HiddenProfileModal,
} from '@store/actions';


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styles: []
})

export class UserManagerComponent implements OnInit {

  modal: boolean

  constructor(
    private store: Store<AppState>,
    private login: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    this.store.select('ui').subscribe(({
      modal_profile,
    }) => {
      this.modal = modal_profile;
    });
  }

  logout() {
    this.login.logout();
    this.store.dispatch(HiddenProfileModal({hidden: true}));
    this.router.navigate(['/'])
  }

  close_modal() {
    this.store.dispatch(HiddenProfileModal({hidden: true}));
    this.router.navigate(['/'])
  }
}
