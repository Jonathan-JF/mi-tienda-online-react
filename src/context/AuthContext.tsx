// src/context/AuthContext.tsx

import { createContext, useState, useContext, type ReactNode } from 'react';
import { type User } from '../interfaces/auth.interface';
import { registerAction } from '../actions/auth.actions'; // Importamos la acción de registro

// 1. Definimos la FORMA de nuestro contexto
interface AuthContextType {
currentUser: User | null; // El usuario logueado (o null)
// Función de login recibe el objeto User y el token del backend (IE3.3.2)
login: (user: User, token: string) => void; 
// Función de registro solo llama a la action de backend
register: (nombre: string, correo: string, password: string) => Promise<boolean>;
logout: () => void;
}
// 2. Creamos el Contexto
const AuthContext = createContext<AuthContextType>(null!);

// 3. Creamos el "Proveedor"
interface Props {
children: ReactNode;
}
export const AuthProvider = ({ children }: Props) => {
  // 4. Estado para el usuario actual
  //    Inicializamos leyendo la 'user_session' del localStorage para persistencia
const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
    // Usamos 'user_session' para evitar conflicto con el mock de tests si existía 'session'
    const session = localStorage.getItem('user_session'); 
    // También comprobamos que el token exista para considerar la sesión válida
    const token = localStorage.getItem('auth_token');
    return session && token ? JSON.parse(session) : null;
    } catch (error) {
    return null;
    }
});

  // 5. La lógica de Registro llama a la acción de backend
  const register = async (nombre: string, correo: string, password: string): Promise<boolean> => {
    const result = await registerAction({ fullName: nombre, email: correo, password: password });
    if (result.ok) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        return true;
    } else {
        alert(`Error en el registro: ${result.mensaje}`);
        return false;
    }
  };


  // 6. Nueva función de Login que recibe el objeto User y el token del backend
  const login = (user: User, token: string) => {
    // Guardamos la sesión activa y el token
    localStorage.setItem('user_session', JSON.stringify(user));
    localStorage.setItem('auth_token', token); // Guardamos el token (IE3.3.2)
    setCurrentUser(user); // Actualizamos el estado
    alert(`Bienvenido, ${user.fullName}`);
    return true;
  };

  // 7. Función de Logout
const logout = () => {
    localStorage.removeItem('user_session'); // Borramos la sesión
    localStorage.removeItem('auth_token');  // Borramos el token
    setCurrentUser(null); // Actualizamos el estado
    alert('Has cerrado sesión.');
};
  // 8. Hacemos que todo esté disponible
return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
    {children}
    </AuthContext.Provider>
);
}
// 9. Creamos un Hook personalizado
export const useAuth = () => {
const context = useContext(AuthContext);
if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
}
return context;
}