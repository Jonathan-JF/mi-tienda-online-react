// src/routes/AppRoutes.tsx
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

export const AppRoutes = () => {
    const routes = useRoutes([
        {
        path: '/',
        element: <Layout />,
        children: [
            {path: '/',element: <HomePage />},
            {path: '/productos',element: <ProductosPage />},
            {path: '/producto/:id',element: <DetalleProductoPage />},
            {path: '/carrito',element: <CarritoPage />},
            {path: '/login',element: <LoginPage />},
            {path: '/registro',element: <RegistroPage />},
            {path: '/nosotros',element: <NosotrosPage />},
            {path: '/blogs',element: <BlogsPage />},
            {path: '/contacto',element: <ContactoPage />},
            {path: '/blogs/:id',element: <div>Detalle del blog (próximamente)</div>},
            ]
        },
        {
            path: '*',
            element: <div>Pagina no encontrada - 404</div>
        }
    ]);
    return routes;
}