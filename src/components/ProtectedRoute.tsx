import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
    requireAdmin?: boolean;
}

export const ProtectedRoute = ({ requireAdmin = false }: Props) => {
    const { currentUser } = useAuth();

    // 1. Si no hay usuario logueado, enviar al login
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // 2. Si la ruta requiere admin y el usuario NO es admin
    if (requireAdmin && currentUser.role !== 'ADMIN') {
        // Podrías crear una página de "No Autorizado", pero por ahora redirigimos al home
        alert("Acceso denegado: Se requieren permisos de Administrador.");
        return <Navigate to="/" replace />;
    }

    // 3. Si cumple todo, renderizar el contenido (Outlet)
    return <Outlet />;
};