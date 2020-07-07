import { createReducer, on } from '@ngrx/store';
import {
    LoadMessages,
    AddMessage,
    LoadWSUsers
} from '../actions';
//Interfaces
import { Message, WSUser } from '@metin2/api';



export interface MessageState {
    wsUsers: WSUser[];
    messages: Message[];
}

export const MessageInitialState: MessageState = {
    wsUsers: [],
    messages: []
}

const _MessageReducer = createReducer(MessageInitialState,
    on(LoadMessages, (state, {messages}) => ({
        ...state,
        messages: [...messages]
    })),
    on(AddMessage, (state, {message}) => ({
        ...state,
        messages: [...state.messages, {...message} ]
    })),
    on(LoadWSUsers, (state, {wsUsers}) => ({
        ...state,
        wsUsers: [...wsUsers]
    }))
)

export function MessageReducer(state, action) {
    return _MessageReducer(state, action);
}
