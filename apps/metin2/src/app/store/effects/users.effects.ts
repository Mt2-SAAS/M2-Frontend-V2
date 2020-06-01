import { Injectable } from '@angular/core';

// Efects
import { Actions, createEffect, ofType,  } from '@ngrx/effects';

// RXJS
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Actions
import * as usersActions from '../actions';

// Services
import { AuthenticateService } from '../../services/services.module';

// Interface
import { UserLogin } from '../../interfaces/';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private authenticate: AuthenticateService
    ){}


    AddUser$ = createEffect(
        () => this.actions$.pipe(
            ofType( usersActions.AddToken ),
            mergeMap(
                () => this.authenticate.get_current_user()
                    .pipe(
                        map((user: UserLogin) => usersActions.AddUser({user: user}) ),
                        catchError( err => of(usersActions.AddUserError({error: err}))),
                    )
            )
        )
    )

    // AddCurrentPlayers = createEffect(
    //     () => this.actions$.pipe(
    //         ofType( usersActions.TogleManagerPlayer ),
    //         mergeMap(
    //             () => this.authenticate.get_current_players()
    //                 .pipe(
    //                     map((players: Player[]) => usersActions.AddPlayer({players: players}) ),
    //                     catchError( err => of(usersActions.AddPlayerError({error: err})) )
    //                 )
    //         )
    //     )
    // )

}