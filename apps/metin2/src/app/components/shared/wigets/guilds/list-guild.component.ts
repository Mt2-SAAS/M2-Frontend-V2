import { Component, OnInit } from "@angular/core";

// Interfaces
import { Guild } from '@metin2/api';
// Redux
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { HiddenRankingGuildModal } from '@store/actions';


@Component({
    selector: 'ListGuild',
    templateUrl: './list-guild.component.html',
    styles: [],
})
export class ListGuildComponent implements OnInit {

    loading: boolean;
    guilds: Guild[] = [];
    positions_class = ['fisrt_position', 'second_position', 'threeth_position', 'fourth_position', 'fith_position']

    constructor(
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.store.select('ranking').subscribe(({guilds, loading}) => {
            this.guilds = guilds.slice(0,5)
            this.loading = loading;
        });
    }

    close_modal() {
        this.store.dispatch(HiddenRankingGuildModal({hidden: true}));
    }

}
