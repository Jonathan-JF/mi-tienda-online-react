import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CartProvider, useCart } from './CartContext';

// Componente auxiliar para exponer el hook dentro del provider
const Consumer = ({ producto }: any) => {
  const { cartItems, addProduct, removeProduct, totalItems } = useCart();
  return (
    <div>
      <div>items: {cartItems.length}</div>
      <div>totalItems: {totalItems}</div>
      <button onClick={() => addProduct(producto)}>añadir</button>
      <button onClick={() => removeProduct(producto.id)}>eliminar</button>
    </div>
  );
};

const producto = { id: 1, nombre: 'Zapato', precio: 10000 };

describe('CartContext', () => {
  beforeEach(() => {
    if (typeof localStorage.clear === 'function') {
      localStorage.clear();
    } else {
      Object.keys(localStorage).forEach(k => localStorage.removeItem(k));
    }
    vi.clearAllMocks();
  });

  it('agrega un producto y actualiza totalItems', async () => {
    render(
      <CartProvider>
        <Consumer producto={producto} />
      </CartProvider>
    );

    const user = userEvent.setup();
    const btn = screen.getByRole('button', { name: /añadir/i });
    await user.click(btn);

    expect(screen.getByText(/items: 1/)).toBeInTheDocument();
    expect(screen.getByText(/totalItems: 1/)).toBeInTheDocument();
    // localStorage debe contener 'carrito'
    const stored = JSON.parse(localStorage.getItem('carrito') || '[]');
    expect(stored.length).toBe(1);
  });

  it('incrementa la cantidad si se agrega el mismo producto', async () => {
    render(
      <CartProvider>
        <Consumer producto={producto} />
      </CartProvider>
    );

    const user = userEvent.setup();
    const btn = screen.getByRole('button', { name: /añadir/i });
    await user.click(btn);
    await user.click(btn);

    expect(screen.getByText(/items: 1/)).toBeInTheDocument();
    expect(screen.getByText(/totalItems: 2/)).toBeInTheDocument();
  });

  it('elimina un producto del carrito', async () => {
    render(
      <CartProvider>
        <Consumer producto={producto} />
      </CartProvider>
    );

    const user = userEvent.setup();
    const addBtn = screen.getByRole('button', { name: /añadir/i });
    await user.click(addBtn);

    const removeBtn = screen.getByRole('button', { name: /eliminar/i });
    await user.click(removeBtn);

    expect(screen.getByText(/items: 0/)).toBeInTheDocument();
    expect(screen.getByText(/totalItems: 0/)).toBeInTheDocument();
  });
});
