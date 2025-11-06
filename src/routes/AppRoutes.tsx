// src/routes/AppRoutes.tsx
import { useRoutes } from "react-router-dom";
// Importamos nuestra plantilla principal
import { Layout } from "../components/Layout";
// Importamos las páginas que acabamos de crear
import { HomePage } from "../pages/HomePage";
import { ProductosPage } from "../pages/ProductosPage";
// (Añadiremos más páginas aquí)
export const AppRoutes = () => {
    const routes = useRoutes([
        {
            // Ruta principal
            path: '/',
            element: <Layout />, // Usa el Layout como elemento
            children: [
                // Rutas "hijas" que se pintarán dentro del <Outlet> del Layout
                {
                    path: '/', // El Home
                    element: <HomePage />
                },
                {
                    path: '/productos', // La página de productos
                    element: <ProductosPage />
                },
                // (Añadiremos /detalle/:id, /login, etc. aquí)
            ]
        },
        {
            // Ruta para "página no encontrada"
            path: '*',
            element: <div>Pagina no encontrada - 404</div>
        }
    ]);
    return routes;
}