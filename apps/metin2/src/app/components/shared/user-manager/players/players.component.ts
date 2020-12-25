import { Component, OnInit } from '@angular/core';

// Redux
import { Store } from '@ngrx/store';
import { AppState} from '@store';
import { InitAddOwnPlayer } from '@store/actions';

import { Player } from '@metin2/api';


@Component({
  selector: 'manager-player-list',
  templateUrl: 'players.component.html',
  styleUrls: []
})
export class PlayersListComponent implements OnInit {

  loading: boolean;
  players: Player[] = []

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.store.select('user').subscribe(({players, loading}) => {
      this.players = players;
      this.loading = loading;
    });

    this.get_own_players();
  }

  get_own_players() {
    this.store.dispatch(InitAddOwnPlayer());
  }

}
