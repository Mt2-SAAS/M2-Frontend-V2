import { createReducer, on } from '@ngrx/store';
import {
    InitLoadPlayers,
    InitLoadGuilds,
    LoadGuilds,
    LoadPlayers,
    LoadError,
} from '../actions';
//Interfaces
import { Guild , Player} from '@metin2/api';


export interface RankingsState {
    guilds: Guild[]
    players: Player[]
    loading: boolean
    errors: any
}

export const RankingsInititalState: RankingsState = {
    guilds: [],
    players: [],
    loading: false,
    errors: null,
}

const _RankingsReducer = createReducer(RankingsInititalState,
    on(InitLoadPlayers, (state) => ({
        ...state,
        loading: true,
        players: []
    })),
    on(InitLoadGuilds, (state) => ({
        ...state,
        loading: true,
        guilds: []
    })),
    on(LoadGuilds, (state, {guilds}) => ({
        ...state,
        guilds: guilds,
        loading: false
    })),
    on(LoadPlayers, (state, {players}) => ({
        ...state,
        players: players,
        loading: false
    })),
    on(LoadError, (state, {error}) => ({
        ...state,
        errors: error,
        loading: false
    }))
)

export function RankingReducer(state, action) {
    return _RankingsReducer(state, action);
}
