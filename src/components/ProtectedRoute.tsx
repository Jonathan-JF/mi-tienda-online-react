import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 1. Definimos la interfaz aquí mismo para que TypeScript sepa qué es "onlyAdmin"
interface ProtectedRouteProps {
    onlyAdmin?: boolean;
}

export const ProtectedRoute = ({ onlyAdmin = false }: ProtectedRouteProps) => {
    // 2. Quitamos "isLoading" porque tu AuthContext no lo tiene (la carga es instantánea desde localStorage)
    const { currentUser } = useAuth();

    // 3. Verificación estándar
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // 4. Verificación de Rol (si se requiere Admin)
    if (onlyAdmin) {
        // Verificamos si el rol es 'ADMIN' o 'admin' para ser flexibles
        const isAdmin = currentUser.role === 'ADMIN' || currentUser.role === 'admin';
        
        if (!isAdmin) {
            // Si intenta entrar a /admin y no es admin, lo mandamos a su perfil
            return <Navigate to="/perfil" replace />;
        }
    }

    return <Outlet />;
};