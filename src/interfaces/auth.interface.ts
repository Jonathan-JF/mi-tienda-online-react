export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    fullName: string;
    email: string;
    password: string;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
}

export interface AuthResponse {
    ok: boolean;
    user?: User;
    token?: string;
    mensaje?: string;
}