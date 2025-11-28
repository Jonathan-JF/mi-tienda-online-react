import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';

const Consumer = () => {
  const { currentUser, login, register, logout } = useAuth();
  return (
    <div>
      <div>usuario: {currentUser ? currentUser.nombre : 'null'}</div>
      <button onClick={() => register('Juan','j@d.com','123')}>registrar</button>
      <button onClick={() => login('j@d.com','123')}>login</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('registra un usuario y lo guarda en localStorage', async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    const user = userEvent.setup();
    const regBtn = screen.getByRole('button', { name: /registrar/i });
    await user.click(regBtn);

    const stored = JSON.parse(localStorage.getItem('usuario_registrado') || '{}');
    expect(stored.correo).toBe('j@d.com');
  });

  it('loguea correctamente y crea session', async () => {
    // Primero registrar
    localStorage.setItem('usuario_registrado', JSON.stringify({ nombre: 'Juan', correo: 'j@d.com', password: '123' }));

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    const user = userEvent.setup();
    const loginBtn = screen.getByRole('button', { name: /login/i });
    await user.click(loginBtn);

    const session = JSON.parse(localStorage.getItem('session') || 'null');
    expect(session.correo).toBe('j@d.com');
    expect(screen.getByText(/usuario: Juan/)).toBeInTheDocument();
  });

  it('logout elimina la session', async () => {
    localStorage.setItem('session', JSON.stringify({ nombre: 'Juan', correo: 'j@d.com' }));

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    const user = userEvent.setup();
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    await user.click(logoutBtn);

    expect(localStorage.getItem('session')).toBeNull();
    expect(screen.getByText(/usuario: null/)).toBeInTheDocument();
  });
});
