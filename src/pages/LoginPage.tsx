// src/pages/LoginPage.tsx
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  // 1. Creamos un estado para cada input del formulario
const [correo, setCorreo] = useState('');
const [password, setPassword] = useState('');
  // 2. Esta función se llama cuando el usuario envía el formulario
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que la página se recargue
    // 3. Replicamos la lógica de tu scripts.js
    // (Por ahora, solo simulamos. No guardamos en LocalStorage aún)
    console.log('Intentando iniciar sesión con:', { correo, password });

    if (correo === 'admin@duoc.cl' && password === 'admin') {
    alert('Login exitoso (simulado)');
      // Aquí, en el futuro, redirigiríamos al usuario
    } else {
    alert('Correo o contraseña incorrectos (simulado)');
    }
};
return (
    <div className="container-gray p-4" style={{ maxWidth: '500px', margin: 'auto' }}>
    <h1 className="mb-4">Iniciar Sesión</h1>
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="login-correo">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            maxLength={100}
            required
            value={correo} // 4. Conectamos el estado al input
            onChange={(e) => setCorreo(e.target.value)} // 5. Actualizamos el estado al escribir
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="login-pass">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            minLength={4}
            maxLength={10}
            required
            value={password} // 4. Conectamos el estado al input
            onChange={(e) => setPassword(e.target.value)} // 5. Actualizamos el estado al escribir
        />
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