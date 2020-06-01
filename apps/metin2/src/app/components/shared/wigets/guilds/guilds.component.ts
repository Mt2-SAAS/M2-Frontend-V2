import { Component, OnInit, ElementRef } from '@angular/core';
// import { HttpService } from '../../../../services/http/http.service';

// Redux
import { Store } from '@ngrx/store'
import { AppState } from '../../../../store/app.reducers'
import { ShowRankingGuildModal } from '../../../../store/actions';

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styles: []
})
export class GuildsComponent implements OnInit {

  modal: boolean;
  
  constructor(
      private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select('ui').subscribe(({modal_ranking_guild}) => {
      this.modal = modal_ranking_guild;
    })
  }

  show_modal() {
    this.store.dispatch(ShowRankingGuildModal({show: true}))
  }
}



