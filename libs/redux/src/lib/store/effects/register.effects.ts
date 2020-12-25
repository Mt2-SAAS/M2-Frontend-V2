import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// RXJS
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Actions
import * as RegisterActions from '../actions';

// Service
import { HttpService } from '@metin2/api';


@Injectable()
export class RegisterEffects {

    constructor(
        private actions$: Actions,
        private service: HttpService
    ){}


    RegisterUser$ = createEffect(
        () => this.actions$.pipe(
            ofType( RegisterActions.RegisterPlayer ),
            mergeMap(
                ({account}) => this.service.create_user(account)
                    .pipe(
                        map(() => RegisterActions.RegisterPlayerSuccess() ),
                        catchError( err => of(RegisterActions.LoadError({error: err})) )
                    )
            )
        )
    )

}
