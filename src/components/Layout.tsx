import { Header } from './Header';
import { Footer } from './Footer';
import type { ReactNode } from 'react';

// Definimos que este componente acepta 'children' (otros componentes dentro)
interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header siempre visible arriba */}
            <Header />
            
            {/* El contenido variable (las rutas) va aquí */}
            <main className="flex-grow-1">
                {children}
            </main>

            {/* Footer siempre visible abajo */}
            <Footer />
        </div>
    );
};