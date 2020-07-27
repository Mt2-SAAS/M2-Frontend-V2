import { createAction, props } from '@ngrx/store';

// Interface
import { UserLogin, Player } from '@metin2/api';

// Users Actions

export const AddToken = createAction(
    '[USERS] Add Token to Store',
    props<{token: string}>()
)

export const DeleteToken = createAction(
    '[USERS] Delete Token from Store'
)

export const AddUser = createAction(
    '[USERS] Add user to Store',
    props<{user: UserLogin}>()
)

export const DeleteUser = createAction(
    '[USERS] Delete user from Store',
)

export const AddUserError = createAction(
    '[USERS] Error to load user',
    props<{error: any}>()
)

// Players

export const AddPlayer = createAction(
    '[USERS] Add Player to Store',
    props<{players: Player[]}>()
)

export const DeletePlayer = createAction(
    '[USERS] Delete Player from Store',
)

export const AddPlayerError = createAction(
    '[USERS] Error to load Player',
    props<{error: any}>()
)

// Own Players
export const InitAddOwnPlayer = createAction(
    '[USERS] Init Add AddOwnPlayer to Store',
)

export const AddOwnPlayer = createAction(
    '[USERS] Add AddOwnPlayer to Store',
    props<{players: Player[]}>()
)

export const DeleteOwnPlayer = createAction(
    '[USERS] Delete AddOwnPlayer from Store',
)

export const AddOwnPlayerError = createAction(
    '[USERS] Error to load AddOwnPlayer',
    props<{error: any}>()
)
