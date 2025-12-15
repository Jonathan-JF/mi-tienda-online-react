import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, Badge, Alert } from 'react-bootstrap';

export const PerfilPage = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    // 1. Lógica de "Acceso Denegado"
    if (!currentUser) {
        return (
            <div className="container-gray p-5 text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="mb-4">
                    <i className="fa-solid fa-lock fa-4x text-muted"></i>
                </div>
                <h2 className="h3 mb-3">Acceso Denegado</h2>
                <p className="text-muted mb-4">Debes iniciar sesión para ver tu perfil y gestionar tu cuenta.</p>
                <div>
                    <Link to="/login" className="btn btn-primary px-4 py-2">
                        Ir a Iniciar Sesión
                    </Link>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // 2. Determinamos si es admin usando la propiedad correcta 'role'
    // Comprobamos tanto 'ADMIN' como 'admin' por seguridad
    const isAdmin = currentUser.role === 'ADMIN' || currentUser.role === 'admin';

    return (
        <div className="container-gray">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    {/* Header */}
                    <div className="text-center mb-5">
                        <h1 className="h3 fw-bold">Mi Perfil</h1>
                        <p className="text-muted">Gestiona tu cuenta y revisa tus pedidos</p>
                    </div>

                    {/* Tarjeta de Información del Usuario */}
                    <Card className="border-0 shadow-sm mb-4 overflow-hidden">
                        <div className="card-body p-4 text-center">
                            <div className="mb-4">
                                <div 
                                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mx-auto"
                                    style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                                >
                                    {/* Usamos fullName en lugar de nombre */}
                                    {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </div>
                            
                            <h2 className="h4 mb-1">{currentUser.fullName || 'Usuario'}</h2>
                            <p className="text-muted mb-3">{currentUser.email}</p>
                            
                            <div className="mb-4">
                                <Badge bg={isAdmin ? 'warning' : 'info'} className="px-3 py-2 text-dark border">
                                    {/* Usamos role en lugar de rol */}
                                    {currentUser.role || 'CLIENTE'}
                                </Badge>
                            </div>

                            <div className="d-grid gap-2 col-8 mx-auto">
                                <Button variant="outline-danger" onClick={handleLogout}>
                                    <i className="fa-solid fa-right-from-bracket me-2"></i>
                                    Cerrar Sesión
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* 3. Alerta de Rol */}
                    <Alert variant={isAdmin ? 'success' : 'info'} className="mt-4 shadow-sm border-0">
                        <div className="d-flex">
                            <i className={`fa-solid ${isAdmin ? 'fa-user-shield' : 'fa-user'} fa-2x me-3 opacity-50 align-self-center`}></i>
                            <div>
                                <h4 className="alert-heading h6 fw-bold">Información de Acceso</h4>
                                {isAdmin ? (
                                    <p className="mb-0 small">
                                        ¡Eres <strong>Administrador</strong>! Tienes acceso completo a todas las funcionalidades del sistema.
                                        Usa el panel inferior para gestionar la tienda.
                                    </p>
                                ) : (
                                    <p className="mb-0 small">
                                        Tu rol es <strong>Cliente</strong>. Tienes acceso a comprar productos y ver tu historial.
                                        El panel de administración está restringido para tu cuenta.
                                    </p>
                                )}
                            </div>
                        </div>
                    </Alert>

                    {/* 4. Panel de Administración (Solo visible para ADMIN) */}
                    {isAdmin && (
                        <div className="mt-4 p-4 rounded-3 shadow-sm text-white position-relative overflow-hidden" style={{ backgroundColor: '#2c3e50' }}>
                            <i className="fa-solid fa-gears position-absolute text-white" style={{ opacity: 0.05, fontSize: '8rem', right: '-20px', bottom: '-20px' }}></i>
                            
                            <div className="position-relative">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-warning text-dark rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                                        <i className="fa-solid fa-lock"></i>
                                    </div>
                                    <div>
                                        <h5 className="mb-0 text-warning fw-bold">Panel de Administración</h5>
                                        <small className="text-white-50">Funcionalidades exclusivas</small>
                                    </div>
                                </div>
                                
                                <div className="d-grid gap-2">
                                    <Link to="/admin" className="btn btn-warning fw-bold border-0">
                                        <i className="fa-solid fa-box-open me-2"></i>
                                        Gestionar Productos
                                    </Link>
                                    <Button variant="outline-light" onClick={() => alert('Módulo de órdenes en construcción')}>
                                        <i className="fa-solid fa-list-check me-2"></i>
                                        Ver Órdenes de Clientes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sección de Historial */}
                    {!isAdmin && (
                        <>
                            <h3 className="h5 mt-5 mb-3 text-muted">Mis Últimos Pedidos</h3>
                            <Card className="border-0 shadow-sm">
                                <Card.Body>
                                    <div className="text-center py-4 text-muted">
                                        <i className="fa-solid fa-receipt fa-2x mb-3 text-secondary opacity-50"></i>
                                        <p className="mb-0">Aún no has realizado compras recientes.</p>
                                        <Button variant="link" onClick={() => navigate('/productos')}>
                                            Ir a la tienda
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
};