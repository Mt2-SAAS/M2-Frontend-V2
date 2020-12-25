import { createReducer, on } from '@ngrx/store';
import {
    AddToken,
    DeleteToken,
    AddUser,
    DeleteUser,
    AddUserError,
    AddPlayer,
    DeletePlayer,
    AddPlayerError,
    AddOwnPlayer,
    DeleteOwnPlayer,
    AddOwnPlayerError
} from '../actions';

import { UserLogin, Player } from '@metin2/api';
import { InitAddOwnPlayer } from '../actions/users.actions';


export interface UsersState {
    token: string;
    user: UserLogin;
    players: Player[]
    error: any
    loading: boolean
}

const initialUser: UserLogin = {
    login: '',
    email: '',
    real_name: '',
    status: '',
    coins: 0,
    create_time: ''
}

export const UsersInitialState: UsersState = {
    token: null,
    user: initialUser,
    players: [],
    error: null,
    loading: false
}

const _UsersReducer = createReducer(UsersInitialState,
    on(AddToken, (state, {token}) => ({
        ...state,
        token: token,
        loading: true
    })),
    on(DeleteToken, (state) => ({
        ...state,
        token: null
    })),
    on(AddUser, (state, {user}) => ({
        ...state,
        user: user,
        loading: false
    })),
    on(DeleteUser, (state) => ({
        ...state,
        user: initialUser
    })),
    on(AddUserError, (state, {error}) => ({
        ...state,
        error: error
    })),
    on(AddPlayer, (state, {players}) => ({
        ...state,
        players: players
    })),
    on(DeletePlayer, (state) => ({
        ...state,
        players: null
    })),
    on(AddPlayerError, (state, {error}) => ({
        ...state,
        error: error
    })),
    on(InitAddOwnPlayer, (state) => ({
        ...state,
        players: [],
        loading: true
    })),
    on(AddOwnPlayer, (state, {players}) => ({
        ...state,
        players: players,
        loading: false

    })),
    on(DeleteOwnPlayer, (state) => ({
        ...state,
        players: null,
        loading: false
    })),
    on(AddOwnPlayerError, (state, {error}) => ({
        ...state,
        error: error,
        loading: false
    }))
)

export function UsersReducer(state, action) {
    return _UsersReducer(state, action);
}
