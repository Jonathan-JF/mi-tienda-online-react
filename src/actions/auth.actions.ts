import { type AuthResponse, type LoginData, type RegisterData, type User } from "../interfaces/auth.interface";

// FIX: Usamos la ruta relativa base del API para que Vite use su proxy
const API_BASE_URL = 'VITE_API_URL=https://www.google.com/search?q=https://mi-gateway-tienda.onrender.com/api';

// 2. Función de LOGIN
export const loginAction = async (data: LoginData): Promise<AuthResponse> => {
    try {
        // Usamos la ruta relativa: /api/auth/login
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,       // Enviamos "email"
                password: data.password  // Enviamos "password"
            })
        });

        // El backend responde con 401 si las credenciales son incorrectas
        if (!response.ok) {
            // Intentamos leer el mensaje de error del cuerpo si está disponible
            const errorBody = await response.json().catch(() => ({ mensaje: 'Credenciales incorrectas o error de conexión.' }));
            throw new Error(errorBody.mensaje || 'Error de autenticación');
        }

        const result = await response.json();

        // 3. Devolvemos los datos limpios a la App
        const user: User = {
            id: result.id || '1',
            fullName: result.fullName, // Viene del Backend
            email: data.email,
            role: result.role || 'CLIENTE' // Viene del Backend
        };

        return {
            ok: true,
            user,
            token: result.token
        };

    } catch (error) {
        console.error("Error en login:", error);
        return {
            ok: false,
            // Aseguramos que el mensaje de error sea el correcto para el frontend
            mensaje: error instanceof Error ? error.message : 'Error desconocido al iniciar sesión'
        };
    }
};

// 4. Función de REGISTRO
export const registerAction = async (data: RegisterData): Promise<AuthResponse> => {
    try {
        // Usamos la ruta relativa: /api/auth/registro
        const response = await fetch(`${API_BASE_URL}/auth/registro`, {
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
            const errorBody = await response.json().catch(() => ({ mensaje: 'Error al registrar usuario.' }));
            throw new Error(errorBody.mensaje || 'Error al registrar');
        }
        
        // Asumiendo que el registro es exitoso y el backend devuelve un mensaje simple
        return {
            ok: true,
            user: {
                id: 'temp',
                fullName: data.fullName,
                email: data.email,
                role: 'CLIENTE'
            },
            mensaje: 'Registro exitoso' // Añadir un mensaje para la página de Registro
        };

    } catch (error) {
        console.error("Error en registro:", error);
        return { 
            ok: false, 
            mensaje: error instanceof Error ? error.message : "No se pudo registrar el usuario" 
        };
    }
};