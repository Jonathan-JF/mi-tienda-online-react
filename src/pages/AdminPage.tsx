import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../actions/producto.actions';
import type { Producto } from '../interfaces/producto.interface';
import { Link } from 'react-router-dom';

export const AdminPage = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarProductos = async () => {
        setLoading(true);
        const data = await getProducts();
        setProductos(data);
        setLoading(false);
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            const success = await deleteProduct(id);
            if (success) {
                alert('Producto eliminado');
                cargarProductos(); // Recargar la lista
            } else {
                alert('Error al eliminar el producto');
            }
        }
    };

    return (
        <div className="container-gray p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Panel de Administración</h1>
                <button className="btn btn-success" onClick={() => alert("Implementar Crear Producto aquí")}>
                    + Nuevo Producto
                </button>
            </div>

            {loading ? (
                <p>Cargando inventario...</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>
                                        <img src={p.imagen} alt={p.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    </td>
                                    <td>{p.nombre}</td>
                                    <td>${p.precio.toLocaleString('es-CL')}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary me-2">Editar</button>
                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};