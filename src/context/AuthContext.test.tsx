import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'; // Importamos waitFor
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';

// 1. Mockeamos completamente las acciones de autenticación para simular el backend
// Esto evita el "Failed to fetch" y simula las respuestas asíncronas.
const mockUser = {
  id: '1',
  fullName: 'Juan Pérez',
  email: 'j@d.com',
  role: 'CLIENTE',
};
const mockToken = 'test-token-123';

const mockLoginAction = vi.fn().mockResolvedValue({
  ok: true,
  user: mockUser,
  token: mockToken,
});

const mockRegisterAction = vi.fn().mockResolvedValue({
  ok: true,
  user: mockUser,
  mensaje: 'Registro exitoso',
});

// Importante: mockear el módulo que contiene las acciones
vi.mock('../actions/auth.actions', () => ({
  loginAction: mockLoginAction,
  registerAction: mockRegisterAction,
}));


// Componente auxiliar para exponer el hook dentro del provider
const Consumer = () => {
  const { currentUser, login, register, logout } = useAuth();
  
  // Nota: El componente anterior usaba currentUser.nombre, pero ahora es currentUser.fullName
  // Ajustamos para que coincida con la nueva interfaz de usuario
  return (
    <div>
      <div>usuario: {currentUser ? currentUser.fullName : 'null'}</div>
      {/* Las funciones register y login ahora esperan la estructura de datos del backend */}
      <button onClick={() => register('Juan Pérez','j@d.com','123')}>registrar</button>
      {/* En el test de login, simulamos la llamada asíncrona */}
      <button onClick={async () => {
        const result = await mockLoginAction({ email: 'j@d.com', password: '123' } as any);
        if (result.ok && result.user) {
          login(result.user, result.token);
        }
      }}>login</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  // Ahora usamos 'user_session' y 'auth_token' en lugar de 'session' y 'usuario_registrado'
  const SESSION_KEY = 'user_session';
  const TOKEN_KEY = 'auth_token';

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('llama a registerAction y navega (simulado)', async () => {
    // Nota: El contexto ya NO guarda el usuario registrado en localStorage, 
    // solo llama a la acción.
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    const user = userEvent.setup();
    const regBtn = screen.getByRole('button', { name: /registrar/i });
    await user.click(regBtn);
    
    // Verificamos que la acción de backend simulada fue llamada con los datos
    expect(mockRegisterAction).toHaveBeenCalledWith({
      fullName: 'Juan Pérez',
      email: 'j@d.com',
      password: '123',
    });
    
    // Y verificamos que NO se creó la sesión de login (solo fue registro)
    expect(localStorage.getItem(SESSION_KEY)).toBeNull();
  });

  it('loguea correctamente, guarda session/token y actualiza el estado', async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    const user = userEvent.setup();
    const loginBtn = screen.getByRole('button', { name: /login/i });
    await user.click(loginBtn);
    
    // Esperamos a que la promesa se resuelva y el estado se actualice
    await waitFor(() => {
        expect(screen.getByText(/usuario: Juan Pérez/)).toBeInTheDocument();
    });
    
    // Verificamos que se guardaron los datos correctos del backend en localStorage
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    expect(session.email).toBe('j@d.com');
    expect(localStorage.getItem(TOKEN_KEY)).toBe(mockToken);
  });

  it('logout elimina la session y el token', async () => {
    // Simulamos que ya había una sesión guardada y un token
    localStorage.setItem(SESSION_KEY, JSON.stringify(mockUser));
    localStorage.setItem(TOKEN_KEY, mockToken);
    
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );
    
    // El estado inicial del contexto debe cargar la sesión del localStorage
    expect(screen.getByText(/usuario: Juan Pérez/)).toBeInTheDocument();

    const user = userEvent.setup();
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    await user.click(logoutBtn);

    // Verificamos que se limpió el localStorage
    expect(localStorage.getItem(SESSION_KEY)).toBeNull();
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    // Verificamos que el estado del componente se limpió
    expect(screen.getByText(/usuario: null/)).toBeInTheDocument();
  });
});

function beforeEach(arg0: () => void) {
  throw new Error('Function not implemented.');
}
