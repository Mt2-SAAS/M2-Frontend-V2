import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// RXJS
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Actions
import * as rankingsActions from '../actions';

// Service
import { HttpService } from '@metin2/api';

// Interface
import { DjangoResponse } from '@metin2/api';

@Injectable()
export class UIEffects {

    constructor(
        private actions$: Actions,
        private service: HttpService
    ){}


    LoadGuilds$ = createEffect(
        () => this.actions$.pipe(
            ofType( rankingsActions.ShowRankingGuildModal ),
            mergeMap(
                () => this.service.get_guilds()
                    .pipe(
                        map(({results} : DjangoResponse ) => rankingsActions.LoadGuilds({guilds: results}) ),
                        catchError( err => of(rankingsActions.LoadError({error: err})) )
                    )
            )
        )
    )

    LoadPlayers$ = createEffect(
        () => this.actions$.pipe(
            ofType( rankingsActions.ShowRankingPlayerModal ),
            mergeMap(
                () => this.service.get_players()
                    .pipe(
                        map(( {results} : DjangoResponse ) => rankingsActions.LoadPlayers({players: results}) ),
                        catchError( err => of(rankingsActions.LoadError({error: err})) )
                    )
            )
        )
    )

}
