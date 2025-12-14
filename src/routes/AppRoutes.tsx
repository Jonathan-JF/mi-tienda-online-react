import { useRoutes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { HomePage } from "../pages/HomePage";
import { ProductosPage } from "../pages/ProductosPage";
import { DetalleProductoPage } from "../pages/DetalleProductoPage";
import { CarritoPage } from "../pages/CarritoPage";
import { LoginPage } from "../pages/LoginPage";
import { RegistroPage } from "../pages/RegistroPage";
import { NosotrosPage } from "../pages/NosotrosPage";
import { BlogsPage } from "../pages/BlogsPage";
import { ContactoPage } from "../pages/ContactoPage";
import { PerfilPage } from "../pages/PerfilPage";
import { AdminPage } from "../pages/AdminPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                // Rutas Públicas
                { path: '/', element: <HomePage /> },
                { path: '/productos', element: <ProductosPage /> },
                { path: '/producto/:id', element: <DetalleProductoPage /> },
                { path: '/login', element: <LoginPage /> },
                { path: '/registro', element: <RegistroPage /> },
                { path: '/nosotros', element: <NosotrosPage /> },
                { path: '/blogs', element: <BlogsPage /> },
                { path: '/contacto', element: <ContactoPage /> },

                // Rutas Protegidas (Cualquier usuario logueado)
                {
                    element: <ProtectedRoute />,
                    children: [
                        { path: '/carrito', element: <CarritoPage /> },
                        { path: '/perfil', element: <PerfilPage /> },
                    ]
                },

                // Rutas Protegidas (Solo ADMIN)
                {
                    element: <ProtectedRoute requireAdmin={true} />,
                    children: [
                        { path: '/admin', element: <AdminPage /> },
                    ]
                }
            ]
        },
        {
            path: '*',
            element: <div>Pagina no encontrada - 404</div>
        }
    ]);
    return routes;
}