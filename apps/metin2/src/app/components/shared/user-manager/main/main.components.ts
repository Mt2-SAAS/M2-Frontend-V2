import { Component, OnInit } from '@angular/core';

// Redux
import { Store } from '@ngrx/store';
import { AppState } from '@store';

// interfaces
import { UserLogin } from '@metin2/api';


@Component({
  selector: 'main-manager',
  templateUrl: './main.components.html',
  styles: []
})
export class MainManagerComponent implements OnInit {

  user: UserLogin;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select('user').subscribe(({user}) => {
      this.user = user;
    })
  }

}
