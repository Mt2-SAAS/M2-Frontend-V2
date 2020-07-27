import { createAction, props } from '@ngrx/store';

// interface
import { DataGram, WSUser } from '@metin2/api';


export const LoadMessages = createAction(
    '[WS] Load Messages',
    props<{messages: DataGram[]}>()
);


export const AddMessage = createAction(
    '[WS] Add Message',
    props<{message: DataGram}>()
);


export const LoadWSUsers = createAction(
    '[WS] Load WSUsers',
    props<{wsUsers: WSUser[]}>()
);
