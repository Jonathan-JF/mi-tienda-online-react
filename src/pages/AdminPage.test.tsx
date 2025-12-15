import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminPage } from './AdminPage';
import { BrowserRouter } from 'react-router-dom';

// Mock de las acciones para no llamar al backend real durante el test
vi.mock('../actions/producto.actions', () => ({
    getProducts: vi.fn(() => Promise.resolve([
        { id: 1, nombre: 'Producto Test', precio: 1000, destacado: false, categoria: { id: 1, nombre: 'Bebidas' } }
    ])),
    deleteProduct: vi.fn(() => Promise.resolve(true)),
    createProduct: vi.fn(() => Promise.resolve(true)),
    updateProduct: vi.fn(() => Promise.resolve(true)),
}));

describe('AdminPage Component', () => {
    it('debe renderizar el título y el botón de crear', async () => {
        render(
            <BrowserRouter>
                <AdminPage />
            </BrowserRouter>
        );

        // Verifica que el título esté presente
        expect(screen.getByText(/Administración de Productos/i)).toBeDefined();
        
        // Verifica que el botón de nuevo producto esté presente
        const createButton = screen.getByText(/Nuevo Producto/i);
        expect(createButton).toBeDefined();
    });

    it('debe abrir el modal al hacer click en Nuevo Producto', async () => {
        render(
            <BrowserRouter>
                <AdminPage />
            </BrowserRouter>
        );

        const createButton = screen.getByText(/Nuevo Producto/i);
        fireEvent.click(createButton);

        // Busca el título del modal
        expect(screen.getByText('Agregar Nuevo Producto')).toBeDefined();
    });
});