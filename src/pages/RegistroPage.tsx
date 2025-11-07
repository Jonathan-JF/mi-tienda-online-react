// src/pages/RegistroPage.tsx
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const RegistroPage = () => {
const [nombre, setNombre] = useState('');
const [correo, setCorreo] = useState('');
const [password, setPassword] = useState('');

  // 2. Función de envío
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 3. Simulación de tu lógica de scripts.js
    console.log('Registrando usuario:', { nombre, correo, password });
    alert('Registro exitoso (simulado). Ahora puedes iniciar sesión.');
    // Aquí, en el futuro, guardaríamos en LocalStorage y redirigiríamos a /login
};

return (
    // Usamos el HTML de registro.html como base
    <div className="container-gray p-4" style={{ maxWidth: '500px', margin: 'auto' }}>
    <h1 className="mb-4">Crear cuenta</h1>
    <Form onSubmit={handleSubmit}>
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
        />
        <Form.Text className="text-muted">
            Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com
        </Form.Text>
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
        </Form.Group>
            <Button type="submit" variant="primary">
            Registrarme
            </Button>
            <Link to="/login" className="btn btn-link">
                Ya tengo cuenta
            </Link>
    </Form>
    </div>
);
}