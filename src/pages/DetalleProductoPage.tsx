// src/pages/DetalleProductoPage.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../actions';
import type { Producto } from '../interfaces/producto.interface';
import { useCart } from '../context/CartContext';

export const DetalleProductoPage = () => {
const { id } = useParams();
const [producto, setProducto] = useState<Producto | null>(null);
const { addProduct } = useCart();

  // 3. useEffect para buscar el producto cuando la página cargue
useEffect(() => {
    if (id) {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
        // 4. Llamamos a nuestra "action" asíncrona para buscar el producto
        const fetchProduct = async () => {
          const foundProduct = await getProductById(numericId);
          setProducto(foundProduct || null);
        };
        fetchProduct();
    }
    }
  }, [id]); // Se vuelve a ejecutar si el ID de la URL cambia
  // 5. Manejo de estado: Si no hemos encontrado el producto
if (!producto) {
    return (
    <div className="container-gray p-5 text-center">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o fue eliminado.</p>
    </div>
    );
}
  // 6. Si encontramos el producto, mostramos sus detalles
return (
    <div className="container-gray">
    <h1 className="mb-4">Detalle del Producto</h1>
    <div className="row">
        <div className="col-md-6">
        <img src={producto.imagen} className="img-fluid rounded" alt={producto.nombre} />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <p><strong>Precio:</strong> ${producto.precio.toLocaleString('es-CL')}</p>
        <button className="btn btn-primary"
        onClick={() => addProduct(producto)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  </div>
);
}