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