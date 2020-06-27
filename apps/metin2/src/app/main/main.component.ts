import { Component, OnInit } from '@angular/core';

// Title
import { Title } from '@angular/platform-browser';

// Redux
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { AddToken } from '@store/actions';
// Services
import { AuthService } from '@metin2/api';

// Environments
import { environment } from '@env/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  serverName: string;
  serverInfo: string

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle(environment.serverName);
    if(localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token');
      // Token is valid?
      if (this.auth.isAuthenticated()){
        this.store.dispatch(AddToken({token: token}))
      }
    }
  }
}
