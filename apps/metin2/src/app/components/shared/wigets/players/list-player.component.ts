import { Component, OnInit } from '@angular/core';

// Interfaces
import { Player } from '../../../../interfaces/';

// Redux
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { HiddenRankingPlayerModal } from '../../../../store/actions';

@Component({
  selector: 'ListPlayer',
  templateUrl: './list-player.component.html',
  styles: []
})
export class ListPlayersComponent implements OnInit {

  players: Player[] = []
  positions_class = ['fisrt_position', 'second_position', 'threeth_position', 'fourth_position', 'fith_position']

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select('ranking').subscribe(({players}) => {
      this.players = players.slice(0, 5);
    })
  }

  close_modal() {
    this.store.dispatch(HiddenRankingPlayerModal({hidden: true}))
  }

}
