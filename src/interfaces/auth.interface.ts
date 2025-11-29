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
    fullName: string; // Nombre completo (coincide con el backend)
    email: string;
    role: string;   // Rol del usuario (ADMIN/CLIENTE)
}

export interface AuthResponse {
    ok: boolean;
    user?: User;
    token?: string;
    mensaje?: string;
}