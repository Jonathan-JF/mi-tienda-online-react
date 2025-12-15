import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../actions/producto.actions';
import type { Producto } from '../interfaces/producto.interface';
import { Modal, Button, Form, Table, Badge, Alert } from 'react-bootstrap';

export const AdminPage = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Control del Modal
    const [showModal, setShowModal] = useState(false);
    
    // Estado para saber si estamos editando (null = creando, number = ID del producto a editar)
    const [editingId, setEditingId] = useState<number | null>(null);
    
    // Estado del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        imagen: '',
        descripcion: '',
        destacado: false,
        categoriaId: 1
    });

    // Cargar productos
    const cargarProductos = async () => {
        setLoading(true);
        const data = await getProducts();
        setProductos(data);
        setLoading(false);
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    // Función para abrir el modal en modo CREAR
    const handleOpenCreate = () => {
        setEditingId(null); // Modo crear
        setFormData({ nombre: '', precio: '', imagen: '', descripcion: '', destacado: false, categoriaId: 1 }); // Limpiar
        setShowModal(true);
    };

    // Función para abrir el modal en modo EDITAR
    const handleOpenEdit = (producto: Producto) => {
        setEditingId(producto.id); // Modo editar con este ID
        setFormData({
            nombre: producto.nombre,
            precio: producto.precio.toString(),
            imagen: producto.imagen,
            descripcion: producto.descripcion,
            destacado: producto.destacado,
            // @ts-ignore: Accedemos al ID de la categoría de forma segura
            categoriaId: producto.categoria?.id || 1 
        });
        setShowModal(true);
    };

    // Guardar (Crear o Editar)
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const productoToSend = {
            ...formData,
            precio: parseFloat(formData.precio) || 0,
            categoriaId: Number(formData.categoriaId)
        };

        let success;
        
        if (editingId) {
            // Actualizar
            success = await updateProduct(editingId, productoToSend);
        } else {
            // Crear
            success = await createProduct(productoToSend);
        }
        
        if (success) {
            alert(editingId ? 'Producto actualizado correctamente' : 'Producto creado exitosamente');
            setShowModal(false);
            cargarProductos(); // Refrescar lista
        } else {
            alert('Ocurrió un error. Revisa los datos e intenta nuevamente.');
        }
    };

    // Eliminar
    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            const success = await deleteProduct(id);
            if (success) {
                setProductos(prev => prev.filter(p => p.id !== id));
            } else {
                alert('Error al eliminar.');
            }
        }
    };

    return (
        <div className="container-gray p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3 mb-0">Administración de Productos</h1>
                    <p className="text-muted small mb-0">Crea, edita y elimina productos del inventario</p>
                </div>
                <Button variant="success" onClick={handleOpenCreate}>
                    <i className="fa-solid fa-plus me-2"></i>
                    Nuevo Producto
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <div className="card shadow-sm border-0 overflow-hidden">
                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Producto</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th className="text-center">Estado</th>
                                <th className="text-end pe-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(p => (
                                <tr key={p.id}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center">
                                            <img 
                                                src={p.imagen || 'https://via.placeholder.com/40'} 
                                                alt={p.nombre} 
                                                className="rounded me-3"
                                                style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                                            />
                                            <div>
                                                <div className="fw-bold">{p.nombre}</div>
                                                <div className="small text-muted text-truncate" style={{maxWidth: '200px'}}>
                                                    {p.descripcion}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="fw-bold text-dark">
                                        ${p.precio.toLocaleString('es-CL')}
                                    </td>
                                    <td className="text-center">
                                        {p.destacado ? (
                                            <Badge bg="warning" text="dark">Destacado</Badge>
                                        ) : (
                                            <span className="text-muted small">-</span>
                                        )}
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm" 
                                                onClick={() => handleOpenEdit(p)}
                                                title="Editar"
                                            >
                                                <i className="fa-solid fa-pen"></i>
                                            </Button>
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm" 
                                                onClick={() => handleDelete(p.id)}
                                                title="Eliminar"
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {productos.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-5 text-muted">
                                        No hay productos registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            )}

            {/* Modal Reutilizable (Crear / Editar) */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSave}>
                    <Modal.Body>
                        <Alert variant="info" className="py-2 small mb-3">
                            <i className="fa-solid fa-circle-info me-2"></i>
                            {editingId ? 'Modifica los campos que desees actualizar.' : 'Todos los campos marcados son obligatorios.'}
                        </Alert>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Producto</Form.Label>
                            <Form.Control 
                                type="text" 
                                required
                                value={formData.nombre}
                                onChange={e => setFormData({...formData, nombre: e.target.value})}
                            />
                        </Form.Group>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Precio ($)</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        min="0"
                                        required
                                        value={formData.precio}
                                        onChange={e => setFormData({...formData, precio: e.target.value})}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Categoría</Form.Label>
                                    <Form.Select 
                                        value={formData.categoriaId}
                                        onChange={e => setFormData({...formData, categoriaId: Number(e.target.value)})}
                                    >
                                        <option value={1}>Bebidas</option>
                                        <option value={2}>Alcohol</option>
                                        <option value={3}>Snacks</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label>URL de la Imagen</Form.Label>
                            <Form.Control 
                                type="url" 
                                required
                                value={formData.imagen}
                                onChange={e => setFormData({...formData, imagen: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={formData.descripcion}
                                onChange={e => setFormData({...formData, descripcion: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="destacadoCheck">
                            <Form.Check 
                                type="checkbox" 
                                label="¿Destacar en inicio?"
                                checked={formData.destacado}
                                onChange={e => setFormData({...formData, destacado: e.target.checked})}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            {editingId ? 'Guardar Cambios' : 'Crear Producto'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};