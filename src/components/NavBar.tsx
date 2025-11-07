// src/pages/sharedComponents/NavBar.tsx
import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const NavBar = () => {
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="border-bottom border-secondary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
          <i className="fa-solid fa-store me-2"></i> {/* Cambié el ícono */}
          Mi Tienda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
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
              Carrito 🛒<span className={`badge bg-danger ${totalItems > 0 ? '' : 'd-none'}`}>
              {totalItems}</span>
            </Nav.Link>
            {currentUser ? (
              <NavDropdown title={`Hola, ${currentUser.nombre}`} id="user-dropdown" menuVariant="dark">
              <NavDropdown.Item as={Link} to="/perfil">Mi Perfil</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar Sesión
              </NavDropdown.Item>
              </NavDropdown> ) : (
              <Nav.Link as={Link} to="/login" className="text-white">
                Login
              </Nav.Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}