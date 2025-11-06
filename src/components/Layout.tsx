// src/components/Layout.tsx

import { Outlet } from "react-router-dom"; // Outlet es donde se cargarán las páginas
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = () => {
return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />

    <main style={{ flex: 1 }} className="container my-5">
        {/* Aquí es donde React "pinta" la página (HomePage, ProductosPage, etc) */}
        <Outlet />
    </main>

    <Footer />
    </div>
);
}