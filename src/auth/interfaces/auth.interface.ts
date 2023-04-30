
export interface PayloadI {
    sub: string;
}

export interface AuthI {
    email: string;
    password: string;
}

export interface AuthTokenResult {
    sub: string;
    iat: number;
    exp: number;
}

export interface IUseToken {
    sub: string;
    isExpired: boolean;
}