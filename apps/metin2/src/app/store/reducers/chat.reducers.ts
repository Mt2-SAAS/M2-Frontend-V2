import { createReducer, on } from '@ngrx/store';
import { 
    LoadMessages,
    AddMessage
} from '../actions';
//Interfaces
import { Message } from '../../interfaces/';


export interface MessageState {
    messages: Message[];
}

export const MessageInitialState: MessageState = {
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
    }))
)

export function MessageReducer(state, action) {
    return _MessageReducer(state, action);
}