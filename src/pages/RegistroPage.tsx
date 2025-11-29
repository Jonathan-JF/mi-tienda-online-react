// src/pages/RegistroPage.tsx
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RegistroPage = () => {
const [nombre, setNombre] = useState('');
const [correo, setCorreo] = useState('');
const [password, setPassword] = useState('');

const [validated, setValidated] = useState(false);
const [emailError, setEmailError] = useState('');
const [errorBackend, setErrorBackend] = useState<string | null>(null); // Nuevo estado para errores de backend
const [loading, setLoading] = useState(false);

const { register } = useAuth();
const navigate = useNavigate();

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();
    setErrorBackend(null);
    
    // Lógica del correo
    const allowedDomains = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    let isEmailValid = allowedDomains.some(domain => correo.endsWith(domain));

    if (!isEmailValid) {
    setEmailError('Correo no permitido. Solo se aceptan @duoc.cl, @profesor.duoc.cl o @gmail.com');
    } else {
    setEmailError('');
    }

    if (form.checkValidity() === false || !isEmailValid) {
      setValidated(true); // Esto activa los mensajes de error
    return;
    }

    // Si todo es válido:
    setValidated(true);
    setLoading(true);

    // Llamamos a la función de registro ASÍNCRONA del contexto
    const success = await register(nombre, correo, password); 
    
    setLoading(false);
    
    if (success) {
        // Redirigir si el registro fue exitoso
        navigate('/login');
    } else {
        // Si no fue exitoso, el error ya fue mostrado por el alert en AuthContext.
        // Pero lo colocamos también aquí para tener un manejo de error más robusto
        setErrorBackend('Error en el registro. Intente con otro correo.'); 
    }
};

return (
    <div className="container-gray p-4" style={{ maxWidth: '500px', margin: 'auto' }}>
    <h1 className="mb-4">Crear cuenta</h1>
    
      {/* Alerta de Error del Backend */}
      {errorBackend && (
        <Alert variant="danger" onClose={() => setErrorBackend(null)} dismissible>
          {errorBackend}
        </Alert>
      )}

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="reg-nombre">
        <Form.Label>Nombre completo</Form.Label>
        <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            maxLength={50}
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
            Por favor, ingresa tu nombre.
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="reg-correo">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            maxLength={100}
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            isInvalid={!!emailError}
        />
        <Form.Control.Feedback type="invalid">
            {emailError || 'Por favor, ingresa un correo válido.'}
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="reg-pass">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
            type="password"
            placeholder="Crea una contraseña"
            minLength={4}
            maxLength={10}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
            Por favor, ingresa una contraseña (mín. 4 caracteres).
        </Form.Control.Feedback>
        </Form.Group>
        
        <Button type="submit" variant="primary" className="me-2" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarme'}
        </Button>
        <Link to="/login" className="btn btn-link">
        Ya tengo cuenta
        </Link>
    </Form>
    </div>
);
}