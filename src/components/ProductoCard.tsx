// src/components/ProductoCard.tsx
import { Link } from 'react-router-dom';
import type { Producto } from '../interfaces/producto.interface';
// Definimos que este componente recibe "props"
interface Props {
producto: Producto;
}
export const ProductoCard = ({ producto }: Props) => {
return (
    // Esta es la tarjeta de tu HTML original
    <div className="col-md-3 mb-4">
    <div className="card h-100">
        <img src={producto.imagen} className="card-img-top" alt={producto.nombre} style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body text-center d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="fw-bold">${producto.precio.toLocaleString('es-CL')}</p>
        <div className="mt-auto">
            {/* Usamos Link para ir al detalle. (¡Lo crearemos después!) */}
            <Link to={`/producto/${producto.id}`} className="btn btn-outline-primary">
            Ver detalle
            </Link>
            {/* Este botón lo conectaremos al carrito más adelante */}
            <button className="btn btn-primary mt-2">
            Añadir
            </button>
        </div>
        </div>
    </div>
    </div>
);
}