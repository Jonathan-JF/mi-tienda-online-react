// src/components/ProductoCard.tsx
import { Link } from 'react-router-dom';
import type { Producto } from '../interfaces/producto.interface';
import { useCart } from '../context/CartContext';
// Definimos que este componente recibe "props"
interface Props {
producto: Producto;
}
export const ProductoCard = ({ producto }: Props) => {
    const { addProduct } = useCart();

return (
    // Esta es la tarjeta de tu HTML original
    <div className="col-md-3 mb-4">
    <div className="card h-100">
        <img src={producto.imagen} className="card-img-top" alt={producto.nombre} style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body text-center d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="fw-bold">${producto.precio.toLocaleString('es-CL')}</p>
        <div className="mt-auto">
            <Link to={`/producto/${producto.id}`} className="btn btn-outline-primary">
            Ver detalle
            </Link>
            <button className="btn btn-primary mt-2"
            onClick={() => addProduct(producto)}
            >
            Añadir
            </button>
        </div>
        </div>
    </div>
    </div>
);
}