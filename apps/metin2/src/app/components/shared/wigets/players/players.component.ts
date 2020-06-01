import { Component, OnInit } from '@angular/core';

// Store
import { Store } from '@ngrx/store'
import { AppState } from '../../../../store/app.reducers'
import { ShowRankingPlayerModal, HiddenRankingPlayerModal } from '../../../../store/actions';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styles: []
})
export class PlayersComponent implements OnInit {

  modal: boolean;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select('ui').subscribe(({modal_ranking_player}) => {
      this.modal = modal_ranking_player;
    })
  }

  show_modal() {
    this.store.dispatch(ShowRankingPlayerModal({show: true}))
  }
}
