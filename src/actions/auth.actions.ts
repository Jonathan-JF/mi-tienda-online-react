import { type AuthResponse, type LoginData, type RegisterData } from "../interfaces/auth.interface";

// 1. Leemos la URL del Gateway desde el archivo .env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// 2. Función de LOGIN
export const loginAction = async (data: LoginData): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,       // Enviamos "email"
                password: data.password  // Enviamos "password"
            })
        });

        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }

        const result = await response.json();

        // 3. Devolvemos los datos limpios a la App
        return {
            ok: true,
            user: {
                id: '1',
                fullName: result.usuario, // Viene del Backend
                email: data.email,
                role: result.role || 'client'
            },
            token: result.token
        };

    } catch (error) {
        console.error("Error en login:", error);
        return {
            ok: false,
            mensaje: 'Error: Credenciales inválidas o servidor caído'
        };
    }
};

// 3. Función de REGISTRO
export const registerAction = async (data: RegisterData): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/registro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: data.fullName,
                email: data.email,
                password: data.password,
                rol: 'CLIENTE' // Por defecto registramos clientes
            })
        });

        if (!response.ok) {
            throw new Error('Error al registrar');
        }

        return {
            ok: true,
            user: {
                id: 'temp',
                fullName: data.fullName,
                email: data.email,
                role: 'client'
            }
        };

    } catch (error) {
        console.error(error);
        return { ok: false, mensaje: "No se pudo registrar el usuario" };
    }
};