import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap'; // Importaciones necesarias
import { useAuth } from '../context/AuthContext';
import { loginAction } from '../actions/auth.actions';

export const LoginPage = () => {
  // Estado del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados de validación y error
  const [validated, setValidated] = useState(false);
  const [errorBackend, setErrorBackend] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    
    // 1. Detener el comportamiento por defecto del formulario
    event.preventDefault();
    event.stopPropagation();
    setErrorBackend(null);

    // 2. Validación visual de Bootstrap (campos vacíos, formato email)
    setValidated(true);
    if (form.checkValidity() === false) {
      return; // Si el formulario es inválido visualmente, no enviamos nada
    }

    setLoading(true);

    // 3. LLAMADA AL BACKEND (La lógica que creamos antes)
    const result = await loginAction({ email, password });

    setLoading(false);

    if (result.ok && result.user) {
      // 4. Si el backend dice OK, guardamos sesión y redirigimos
      login(result.user, result.token || '');
      navigate('/');
    } else {
      // 5. Si falla (credenciales malas), mostramos error
      setErrorBackend(result.mensaje || 'Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="container p-4" style={{ maxWidth: '500px', margin: 'auto', marginTop: '50px' }}>
      <h1 className="mb-4 text-center">Iniciar Sesión</h1>

      {/* Alerta de Error del Backend */}
      {errorBackend && (
        <Alert variant="danger" onClose={() => setErrorBackend(null)} dismissible>
          {errorBackend}
        </Alert>
      )}

      <Form noValidate validated={validated} onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
        
        {/* Campo Correo */}
        <Form.Group className="mb-3" controlId="login-correo">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            maxLength={100}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa un correo válido.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Campo Contraseña */}
        <Form.Group className="mb-3" controlId="login-pass">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            minLength={4}
            maxLength={10}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa tu contraseña.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Botones */}
        <div className="d-grid gap-2">
            <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
        </div>

        <div className="text-center mt-3">
            <Link to="/registro" className="text-decoration-none">
            ¿No tienes cuenta? Regístrate aquí
            </Link>
        </div>
      </Form>
    </div>
  );
};