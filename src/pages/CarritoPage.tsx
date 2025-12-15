import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { createBoleta } from '../actions/producto.actions';

export const CarritoPage = () => {
    const { cartItems, removeProduct, totalPrice, totalItems, cartItems: items } = useCart(); // Accedemos a items para limpiar si quieres implementarlo
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [buying, setBuying] = useState(false);

    const handleCompra = async () => {
        if (!currentUser) {
            alert("Debes iniciar sesión para comprar.");
            navigate('/login');
            return;
        }

        if (window.confirm(`¿Confirmar compra por $${totalPrice.toLocaleString('es-CL')}?`)) {
            setBuying(true);
            
            // Preparamos los detalles para el backend
            const detalles = cartItems.map(item => ({
                productoId: item.id,
                cantidad: item.cantidad,
                precioUnitario: item.precio
            }));

            // Enviamos al backend
            const success = await createBoleta(totalPrice, currentUser.email, detalles);

            if (success) {
                // Aquí deberíamos vaciar el carrito, pero para no complicar el context ahora
                // simplemente simulamos el éxito y redirigimos.
                // Idealmente agregarías un clearCart() en el Context.
                alert("¡Compra exitosa! Tu pedido ha sido registrado.");
                localStorage.removeItem('carrito'); // Limpieza manual simple
                window.location.href = "/"; // Recarga para limpiar estado visual
            } else {
                alert("Hubo un error al procesar tu compra. Intenta nuevamente.");
            }
            setBuying(false);
        }
    };

    if (totalItems === 0) {
        return (
            <div className="container-gray text-center py-5">
                <i className="fa-solid fa-cart-arrow-down fa-3x text-muted mb-3"></i>
                <h2 className="h4">Tu carrito está vacío</h2>
                <p className="text-muted mb-4">Añade productos para verlos aquí.</p>
                <Link to="/productos" className="btn btn-primary">
                    Ver Productos
                </Link>
            </div>
        );
    }

    return (
        <div className="container-gray">
            <h1 className="mb-4 h3">Carrito de Compras</h1>
            
            <div className="table-responsive mb-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-end">Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id} className="border-bottom">
                                <td>
                                    <div className="fw-bold">{item.nombre}</div>
                                    <small className="text-muted">${item.precio.toLocaleString('es-CL')} unitario</small>
                                </td>
                                <td className="text-center align-middle">
                                    <span className="badge bg-light text-dark border px-3 py-2">
                                        {item.cantidad}
                                    </span>
                                </td>
                                <td className="text-end align-middle fw-bold">
                                    ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                                </td>
                                <td className="text-end align-middle">
                                    <button
                                        className="btn btn-sm text-danger"
                                        onClick={() => removeProduct(item.id)}
                                        title="Eliminar"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex flex-column align-items-end border-top pt-4">
                <div className="mb-3 text-end">
                    <span className="text-muted me-3">Total a pagar:</span>
                    <span className="h2 fw-bold text-primary">${totalPrice.toLocaleString('es-CL')}</span>
                </div>
                
                <div className="d-flex gap-2">
                    <Link to="/productos" className="btn btn-outline-secondary">
                        Seguir comprando
                    </Link>
                    <Button 
                        variant="success" 
                        size="lg" 
                        onClick={handleCompra}
                        disabled={buying}
                    >
                        {buying ? 'Procesando...' : 'Pagar ahora'}
                    </Button>
                </div>
            </div>
        </div>
    );
}