import { Component, OnInit } from '@angular/core';

//Redux
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { HiddenLoginModal } from '../../../store/actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  modal: boolean;

  constructor(   
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select('ui').subscribe(({modal_login}) => {
      this.modal = modal_login;
    })
  }

}
