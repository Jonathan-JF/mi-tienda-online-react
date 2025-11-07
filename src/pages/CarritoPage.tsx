// src/pages/CarritoPage.tsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const CarritoPage = () => {

const { cartItems, removeProduct, totalPrice, totalItems } = useCart();
if (totalItems === 0) {
    return (
    <div className="container-gray p-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <p>Añade productos para verlos aquí.</p>
        <Link to="/productos" className="btn btn-primary">
        Ver Productos
        </Link>
    </div>
    );
}
return (
    <div className="container-gray">
    <h1 className="mb-4">Carrito de Compras</h1>
      {/* 4. Hacemos un "map" (bucle) sobre los items del carrito */}
    {cartItems.map(item => (
        <div
        key={item.id}
        className="d-flex justify-content-between align-items-center border-bottom py-2"
        >
        <div>
            <strong>{item.nombre}</strong><br />
            Cantidad: {item.cantidad}
        </div>
    <div>
            {/* Calculamos el subtotal del item */}
            ${(item.precio * item.cantidad).toLocaleString('es-CL')}
            <button
            className="btn btn-sm btn-danger ms-2"
            onClick={() => removeProduct(item.id)}
            >
            x
            </button>
        </div>
    </div>
    ))}
    <h4 id="carrito-total" className="mt-3">
        Total: ${totalPrice.toLocaleString('es-CL')}
    </h4>
    </div>
);
}