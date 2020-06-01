import { createReducer, on } from '@ngrx/store';
import { 
    LoadGuilds,
    LoadPlayers,
    LoadError,
} from '../actions';
//Interfaces
import { Guild , Player} from '../../interfaces/';


export interface RankingsState {
    guilds: Guild[]
    players: Player[]
    errors: any
}

export const RankingsInititalState: RankingsState = {
    guilds: [],
    players: [],
    errors: null,
}

const _RankingsReducer = createReducer(RankingsInititalState,
    on(LoadGuilds, (state, {guilds}) => ({
        ...state,
        guilds: guilds
    })),
    on(LoadPlayers, (state, {players}) => ({
        ...state,
        players: players
    })),
    on(LoadError, (state, {error}) => ({
        ...state,
        errors: error
    }))
)

export function RankingReducer(state, action) {
    return _RankingsReducer(state, action);
}