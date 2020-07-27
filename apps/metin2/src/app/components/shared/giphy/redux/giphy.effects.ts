import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// Actions
import * as giphyActions from './giphy.actions';

// Services
import { GiphyService } from '../giphy.service';

// RXJS
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Interfaces
import { DownsizedLarge } from '../giphy.interfaces';


@Injectable()
class GiphyEffects {

    constructor(
        private actions$: Actions,
        private giphy: GiphyService
    ) {}

    LoadGifs$ = createEffect(
        () => this.actions$.pipe(
            ofType(giphyActions.InitLoadGif),
            mergeMap(
                () => this.giphy.trending()
                    .pipe(
                        map(
                            ({data}: {data: any[]}) => {
                                let arr: DownsizedLarge[] = data.map(
                                    element => {
                                        const {images: {downsized_large}} = element;
                                        return downsized_large
                                    }
                                )
                                return arr
                            }
                        )
                    )
                    .pipe(
                        map((data) => giphyActions.LoadGif({gifs: data})),
                        catchError( err => of(giphyActions.ErrorGif({error: err})) )
                    )
            )
        )
    )

    searchGif$ = createEffect(
        () => this.actions$.pipe(
            ofType(giphyActions.InitSearch),
            mergeMap(
                ({search}) => this.giphy.search(search)
                    .pipe(
                        map(
                            ({data}: {data: any[]}) => {
                                let arr: DownsizedLarge[] = data.map(
                                    element => {
                                        const {images: {downsized_large}} = element;
                                        return downsized_large
                                    }
                                )
                                return arr
                            }
                        )
                    )
                    .pipe(
                        map((data) => giphyActions.LoadGif({gifs: data}) ),
                        catchError( err => of(giphyActions.ErrorGif({error: err})) )
                    )
            )
        )
    )

}

const EffectsArray: any[]  = [GiphyEffects]

export {
    EffectsArray
}
