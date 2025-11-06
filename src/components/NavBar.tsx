// src/pages/sharedComponents/NavBar.tsx
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importante para la navegación

export const NavBar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="border-bottom border-secondary">
      <Container fluid>
        {/* El "Brand" o logo, usa Link to="/" */}
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
          <i className="fa-solid fa-store me-2"></i> {/* Cambié el ícono */}
          Mi Tienda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          {/* Estos son los links de tu tienda */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/productos" className="text-white">
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs" className="text-white">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/nosotros" className="text-white">
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto" className="text-white">
              Contacto
            </Nav.Link>
            <Nav.Link as={Link} to="/carrito" className="text-white">
              Carrito 🛒 <span className="badge bg-danger d-none">0</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-white">
              Login
            </Nav.Link>
          </Nav>
          {/* Borramos el formulario de búsqueda de robots */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}