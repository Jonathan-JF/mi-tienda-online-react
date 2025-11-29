import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

export const PerfilPage = () => {
    const { currentUser } = useAuth();
    
    // Si no está autenticado, mostramos un mensaje (aunque la NavBar ya lo oculta)
    if (!currentUser) {
        return (
            <div className="container-gray p-5 text-center">
                <h2>Acceso Denegado</h2>
                <p>Debes iniciar sesión para ver tu perfil.</p>
                <Link to="/login" className="btn btn-primary">
                    Ir a Login
                </Link>
            </div>
        );
    }

    // Lógica de restricción basada en el rol
    const isAdmin = currentUser.role === 'ADMIN';

    return (
        <div className="container-gray p-4">
            <h1 className="mb-4">Mi Perfil</h1>
            <p><strong>Usuario:</strong> {currentUser.fullName}</p>
            <p><strong>Correo:</strong> {currentUser.email}</p>
            <p><strong>Rol:</strong> <span className={`fw-bold ${isAdmin ? 'text-warning' : 'text-info'}`}>{currentUser.role}</span></p>

            <Alert variant={isAdmin ? 'success' : 'info'} className="mt-4">
                <h4 className="alert-heading">Información de Acceso</h4>
                {isAdmin ? (
                    <p>
                        ¡Eres **Administrador**! Tienes acceso completo a todas las funcionalidades. 
                        A continuación, puedes ver un ejemplo de tus privilegios.
                    </p>
                ) : (
                    <p>
                        Tu rol es **Cliente**. Tienes acceso a la tienda y al carrito. 
                        El panel de administración está restringido para ti.
                    </p>
                )}
            </Alert>
            
            {/* Ejemplo de funcionalidad restringida (solo para ADMIN) */}
            {isAdmin && (
                <div className="mt-4 p-3" style={{ backgroundColor: '#4a4a4a', borderRadius: '10px' }}>
                    <h5 className="text-warning">Panel de Administración</h5>
                    <p className="text-white-50">Estas funcionalidades solo son visibles para usuarios con el rol ADMIN.</p>
                    <Link to="/admin/productos" className="btn btn-warning me-2">
                        Gestionar Productos (Bloqueado)
                    </Link>
                    <Link to="/admin/ordenes" className="btn btn-warning">
                        Ver Órdenes (Bloqueado)
                    </Link>
                </div>
            )}

            <div className="mt-5">
                <button className="btn btn-outline-light" onClick={() => alert('Función no implementada')}>
                    Ver Historial de Compras
                </button>
            </div>
        </div>
    );
}