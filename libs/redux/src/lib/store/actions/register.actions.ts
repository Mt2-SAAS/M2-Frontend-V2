import { createAction, props } from '@ngrx/store';
// Interface
import { AccountSend } from '@metin2/api';

// Register

export const RegisterPlayer = createAction(
    '[REGISTER] Register Player',
    props<{account: AccountSend }>()
)

export const RegisterPlayerSuccess = createAction(
    '[REGISTER] Register Player SuccesFull',
)

export const RegisterPlayerError = createAction(
    '[REGISTER] Error to Register Player',
    props<{error: any}>()
)
