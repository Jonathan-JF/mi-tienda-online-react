// src/pages/ContactoPage.tsx
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const ContactoPage = () => {
const [nombre, setNombre] = useState('');
const [correo, setCorreo] = useState('');
const [comentario, setComentario] = useState('');
const [validated, setValidated] = useState(false);

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
const form = event.currentTarget;
    
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
    setValidated(true);
    return;
    }
    setValidated(true);

    console.log('Enviando contacto:', { nombre, correo, comentario });
    alert('¡Gracias por tu mensaje! Te responderemos pronto (simulación).');
    setNombre('');
    setCorreo('');
    setComentario('');
    setValidated(false);
};
return (
    <div className="container-gray p-4" style={{ maxWidth: '600px', margin: 'auto' }}>
    <h1 className="mb-4">Contáctanos</h1>
    <p className="text-muted">Completa el formulario y te responderemos pronto.</p>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="contacto-nombre">
        <Form.Label>Nombre completo</Form.Label>
        <Form.Control
            type="text"
            placeholder="Tu nombre"
            maxLength={100}
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
            Por favor, ingresa tu nombre.
        </Form.Control.Feedback>

        </Form.Group>

        <Form.Group className="mb-3" controlId="contacto-correo">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
            type="email"
            placeholder="Tu correo"
            maxLength={100}
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
            Por favor, ingresa un correo válido.
        </Form.Control.Feedback>

        </Form.Group>
        <Form.Group className="mb-3" controlId="contacto-comentario">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control
            as="textarea"
            rows={4}
            placeholder="Escribe tu mensaje aquí..."
            maxLength={500}
            required
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
            Por favor, escribe un mensaje.
        </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary">
        Enviar
        </Button>
    </Form>
    </div>
);
}