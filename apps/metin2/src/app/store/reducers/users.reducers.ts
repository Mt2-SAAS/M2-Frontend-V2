import { createReducer, on } from '@ngrx/store';
import { 
    AddToken,
    DeleteToken,
    AddUser,
    DeleteUser,
    AddUserError,
    AddPlayer,
    DeletePlayer,
    AddPlayerError
} from '../actions';

import { UserLogin, Player } from '../../interfaces/';


export interface UsersState {
    token: string;
    user: UserLogin;
    players: Player[]
    error: any
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
    error: null
}

const _UsersReducer = createReducer(UsersInitialState,
    on(AddToken, (state, {token}) => ({
        ...state,
        token: token
    })),
    on(DeleteToken, (state) => ({
        ...state,
        token: null
    })),
    on(AddUser, (state, {user}) => ({
        ...state,
        user: user
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
    }))
)

export function UsersReducer(state, action) {
    return _UsersReducer(state, action);
  }