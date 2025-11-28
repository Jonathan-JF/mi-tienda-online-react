import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock de hooks
vi.mock('../context/CartContext', () => ({
  useCart: () => ({ totalItems: 3 })
}));
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ currentUser: { nombre: 'Ana' }, logout: vi.fn() })
}));

import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('muestra el badge con totalItems y saludo cuando hay usuario', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Mi Tienda/)).toBeInTheDocument();
    expect(screen.getByText(/Carrito/)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/Hola, Ana/)).toBeInTheDocument();
  });
});
