import { Component, OnInit } from '@angular/core';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { ShowRankingPlayerModal, InitLoadPlayers } from '@store/actions';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styles: []
})
export class PlayersComponent implements OnInit {

  loading: boolean;
  modal: boolean;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select('ui').subscribe(({modal_ranking_player}) => {
      this.modal = modal_ranking_player;
    });

    this.store.select('ranking').subscribe(({loading}) => {
      this.loading = loading;
    });
  }

  show_modal() {
    this.store.dispatch(ShowRankingPlayerModal({show: true}));
    this.store.dispatch(InitLoadPlayers());
  }
}
