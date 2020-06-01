import { Component, OnInit } from "@angular/core";

// Interfaces
import { Guild } from '../../../../interfaces/';
// Redux
import { AppState } from '../../../../store/app.reducers';
import { Store } from '@ngrx/store';
import { HiddenRankingGuildModal } from '../../../../store/actions';


@Component({
    selector: 'ListGuild',
    templateUrl: './list-guild.component.html',
    styles: [],
})
export class ListGuildComponent implements OnInit {

    guilds: Guild[] = [];
    positions_class = ['fisrt_position', 'second_position', 'threeth_position', 'fourth_position', 'fith_position']

    constructor(
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.store.select('ranking').subscribe(({guilds}) => {
            this.guilds = guilds.slice(0,5)
        })
    }

    close_modal() {
        this.store.dispatch(HiddenRankingGuildModal({hidden: true}))
    }

}