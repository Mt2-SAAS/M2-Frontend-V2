import { createReducer, on } from '@ngrx/store';
import { DownsizedLarge } from '../giphy.interfaces';
import {
    InitLoadGif,
    InitSearch,
    LoadGif,
    SearchGif,
    setKey,
    ErrorGif
} from './giphy.actions'

interface GiphyState {
    loading: boolean;
    imgs: DownsizedLarge[];
    apikey: string;
    error: any;
}

const InitialState: GiphyState = {
    loading: false,
    imgs: [],
    apikey: null,
    error: null
}

const _giphyReducer = createReducer(InitialState,
    on(InitLoadGif, (state) => ({
        ...state,
        loading: true
    })),
    on(LoadGif, (state, {gifs}) => ({
        ...state,
        loading: false,
        imgs: gifs
    })),
    on(InitSearch, (state) => ({
        ...state,
        loading: true
    })),
    on(SearchGif, (state, {gifs}) => ({
        ...state,
        loading: false,
        imgs: gifs
    })),
    on(setKey, (state, {apikey}) => ({
        ...state,
        apikey: apikey
    })),
    on(ErrorGif, (state, {error}) => ({
        ...state,
        error: error,
        loading: false
    }))
)

function giphyReducer(state, action) {
    return _giphyReducer(state, action);
}

export {
    InitialState,
    GiphyState,
    giphyReducer
}
