import { createReducer, on } from '@ngrx/store';
import {
    RegisterPlayer,
    RegisterPlayerSuccess,
    RegisterPlayerError
} from '../actions';
//Interfaces
import { AccountSend } from '@metin2/api';

export interface RegisterState {
    account: AccountSend
    success: boolean
    errors: any
}

export const RegisterPlayerInitialState: RegisterState  = {
    account: {
        login: '',
        password: '',
        real_name: '',
        email: '',
        social_id: 0,
    },
    success: false,
    errors: null,
}

const _RegisterPlayer = createReducer(RegisterPlayerInitialState,
    on(RegisterPlayer, (state, {account}) => ({
        ...state,
        account: account
    })),
    on(RegisterPlayerSuccess, (state) => ({
        ...state,
        success: true
    })),

    on(RegisterPlayerError, (state, {error}) => ({
        ...state,
        errors: error
    }))
)

export function RegisterPlayerReducer(state, action) {
    return _RegisterPlayer(state, action);
}
