import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { HomePage } from '../pages/HomePage';
import { ProductosPage } from '../pages/ProductosPage';
import { DetalleProductoPage } from '../pages/DetalleProductoPage';
import { CarritoPage } from '../pages/CarritoPage';
import { LoginPage } from '../pages/LoginPage';
import { RegistroPage } from '../pages/RegistroPage';
import { PerfilPage } from '../pages/PerfilPage';
import { AdminPage } from '../pages/AdminPage'; // Asegúrate de importar esto
import { ContactoPage } from '../pages/ContactoPage';
import { NosotrosPage } from '../pages/NosotrosPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const AppRoutes = () => {
    return (
        <Layout>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<HomePage />} />
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="/productos/:id" element={<DetalleProductoPage />} />
                <Route path="/contacto" element={<ContactoPage />} />
                <Route path="/nosotros" element={<NosotrosPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegistroPage />} />

                {/* Rutas Protegidas (Cualquier usuario logueado) */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/perfil" element={<PerfilPage />} />
                    <Route path="/carrito" element={<CarritoPage />} />
                </Route>

                {/* Rutas Exclusivas de Administrador (NIVEL 7.0) */}
                <Route element={<ProtectedRoute onlyAdmin={true} />}>
                    <Route path="/admin" element={<AdminPage />} />
                </Route>

                {/* Ruta 404 - Redireccionar al home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Layout>
    );
};
