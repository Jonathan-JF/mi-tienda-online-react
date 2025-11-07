// src/context/AuthContext.tsx

import { createContext, useState, useEffect, useContext, type ReactNode,  } from 'react';
import { type User } from '../interfaces/auth.interface';

// 1. Definimos la FORMA de nuestro contexto
interface AuthContextType {
currentUser: User | null; // El usuario logueado (o null)
login: (correo: string, password: string) => boolean;
register: (nombre: string, correo: string, password: string) => boolean;
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
  //    Inicializamos leyendo la 'session' del localStorage
const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
    } catch (error) {
    return null;
    }
});

  // 5. Esta es tu función "registrarUsuario()" [cite: jonathan-jf/prueba-fullstack2/Prueba-FullStack2-66ba8a1d6cccda2777ede612ca3ffac866ae04d9/assets/js/scripts.js]
const register = (nombre: string, correo: string, password: string): boolean => {
    // NOTA: Tu script original solo permitía UN usuario.
    // Vamos a simular lo mismo.
    const newUser: User = { nombre, correo, password };
    localStorage.setItem('usuario_registrado', JSON.stringify(newUser));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    return true;
};
  // 6. Esta es tu función "loginUsuario()" [cite: jonathan-jf/prueba-fullstack2/Prueba-FullStack2-66ba8a1d6cccda2777ede612ca3ffac866ae04d9/assets/js/scripts.js]
const login = (correo: string, password: string): boolean => {
    const data = localStorage.getItem('usuario_registrado');
    if (!data) {
    alert('No hay ningún usuario registrado.');
    return false;
    }
    
    const userRegistrado: User = JSON.parse(data);

    console.log("--- INICIANDO LOGIN ---");
    console.log("Datos del Formulario:", { correo, password });
    console.log("Datos de LocalStorage:", {correo: userRegistrado.correo,
      password: userRegistrado.password});
      
    console.log("Comparando:", `'${password}' === '${userRegistrado.password}'`);

    if (userRegistrado.correo === correo && userRegistrado.password === password) {
      // ¡Login exitoso!
    const sessionUser: User = { nombre: userRegistrado.nombre, correo: userRegistrado.correo };
    
      // Guardamos la sesión activa
    localStorage.setItem('session', JSON.stringify(sessionUser));
      setCurrentUser(sessionUser); // Actualizamos el estado
    
    alert(`Bienvenido, ${sessionUser.nombre}`);
    return true;
    } else {
      // Login fallido
    alert('Correo o contraseña incorrectos');
    return false;
    }
};
  // 7. Función de Logout
const logout = () => {
    localStorage.removeItem('session'); // Borramos la sesión
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