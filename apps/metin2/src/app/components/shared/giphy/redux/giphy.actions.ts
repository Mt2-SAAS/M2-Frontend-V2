import { createAction, props } from '@ngrx/store';
import { DownsizedLarge } from '../giphy.interfaces';

const InitLoadGif = createAction('[Giphy] START LOAD GIF');

const setKey = createAction(
    '[giphy] SET API KEY',
    props<{apikey: string}>()
);

const InitSearch = createAction(
    '[Giphy] START SEARCH',
    props<{search: string}>()
);

const LoadGif = createAction(
    '[Giphy] LOAD GIF SUCCESS',
    props<{gifs: DownsizedLarge[]}>()
);

const SearchGif = createAction(
    '[Giphy] SEARCH GIF SUCCESS',
    props<{gifs: DownsizedLarge[]}>()
);

const ErrorGif = createAction(
    '[Giphy] General Error',
    props<{error: any}>()
);

export {
    InitLoadGif,
    InitSearch,
    LoadGif,
    SearchGif,
    setKey,
    ErrorGif
}
