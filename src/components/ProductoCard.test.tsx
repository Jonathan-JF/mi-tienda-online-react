import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock del hook useCart para espiar addProduct
const addProduct = vi.fn();
vi.mock('../context/CartContext', () => ({
  useCart: () => ({ addProduct })
}));

import { ProductoCard } from './ProductoCard';

const producto = {
  id: 1,
  nombre: 'Camisa',
  descripcion: 'Producto de prueba',
  precio: 19990,
  imagen: '/camisa.jpg'
};

describe('ProductoCard', () => {
  it('renderiza nombre, precio y botones', () => {
    render(
      <MemoryRouter>
        <ProductoCard producto={producto as any} />
      </MemoryRouter>
    );

    expect(screen.getByText('Camisa')).toBeInTheDocument();
    expect(screen.getByText(/19.990/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver detalle/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /añadir/i })).toBeInTheDocument();
  });

  it('llama a addProduct al hacer click en Añadir', async () => {
    render(
      <MemoryRouter>
        <ProductoCard producto={producto as any} />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const btn = screen.getByRole('button', { name: /añadir/i });
    await user.click(btn);

    expect(addProduct).toHaveBeenCalledWith(producto);
  });
});
