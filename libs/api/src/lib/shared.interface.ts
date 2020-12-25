export interface Account {
    login: string;
    password: string;
    password_again: string;
    real_name: string;
    email: string;
    social_id: number;
    checkbox: boolean;
}

export interface AccountSend {
    login: string;
    password: string;
    real_name: string;
    email: string;
    social_id: number;
}

export interface CHPass {
    current_password: string;
    new_password: string;
    new_password_again: string
}

export interface Guild {
    name: string;
    level: number;
    exp: number;
    ladder_point: number
}

export interface DjangoResponse {
    count: number;
    next: string;
    previous: string;
    results: any[];
}

export interface DataGram {
    userlogin: string,
    create_at: string,
    payload: MessagePayload
}

export interface MessagePayload {
    color?: string,
    gif?: string,
    message?: any,
}

export interface WSUser {
    id: string,
    name: string,
    status: boolean,
    color: string
}

export interface Player {
    account_id: number
    name: string
    level: number
    exp: number
}

export interface User {
    login: string;
    password: string;
}

export interface UserLogin {
    login: string;
    email: string;
    real_name: string
    status: string;
    coins: number;
    create_time: string;
}

export interface ServerStats {
    online: number;
    lastonline: number;
    accounts: number;
    players: number;
}

export interface Download {
    provider: string;
    weight: number;
    link: string;
    create_at: string;
    modified_at: string;
}
