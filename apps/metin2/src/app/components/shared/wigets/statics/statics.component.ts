import { Component, OnInit } from '@angular/core';

import { ServerStats } from '@metin2/api';
// Redux
import { Store } from '@ngrx/store';
import { AppState} from '@store';
import { InitGetServerStatics } from '@store/actions';

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styles: []
})
export class StaticsComponent implements OnInit {

  loading: boolean;
  stats: ServerStats;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.store.select('ui').subscribe( ({server_stats, loading}) => {
      this.stats = server_stats;
      this.loading = loading;
    })

    this.store.dispatch(InitGetServerStatics());
  }

}
