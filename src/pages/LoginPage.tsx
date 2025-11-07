// src/pages/LoginPage.tsx
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
const [correo, setCorreo] = useState('');
const [password, setPassword] = useState('');
const [validated, setValidated] = useState(false);
const { login } = useAuth();
const navigate = useNavigate();

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
const form = event.currentTarget;

event.preventDefault();
event.stopPropagation();

if (form.checkValidity() === false) {
    setValidated(true); // Mostramos errores
    return;
    }

    setValidated(true);
const success = login(correo, password);
if (success) {
navigate('/');}
};
return (
    <div className="container-gray p-4" style={{ maxWidth: '500px', margin: 'auto' }}>
    <h1 className="mb-4">Iniciar Sesión</h1>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="login-correo">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            maxLength={100}
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
            Por favor, ingresa un correo válido.
        </Form.Control.Feedback>

        </Form.Group>
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
            <Button type="submit" variant="primary">
            Ingresar
            </Button>
            <Link to="/registro" className="btn btn-link">
            Crear cuenta
            </Link>
        </Form>
    </div>
);
}