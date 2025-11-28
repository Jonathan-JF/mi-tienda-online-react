// src/pages/ProductosPage.tsx
import { useState, useEffect } from 'react';
import { getProducts } from '../actions'; // Importamos la acción
import { ProductoCard } from '../components/ProductoCard'; // Importamos la tarjeta
import type { Producto } from '../interfaces/producto.interface';

export const ProductosPage = () => {
  // 1. Creamos un "estado" para guardar la lista de productos
  const [productos, setProductos] = useState<Producto[]>([]);
  // 2. Usamos useEffect para cargar los datos UNA SOLA VEZ
  useEffect(() => {
    // 3. Llamamos a nuestra "action" asíncrona
    const fetchProducts = async () => {
      const data = await getProducts();
      setProductos(data);
    };
    fetchProducts();
  }, []); // El [] vacío significa "ejecutar solo cuando el componente carga"
  return (
    <>
      <h1 className="mb-4">Lista de Productos</h1>
      <div className="row" id="lista-productos">
        {/* 5. Hacemos un "map" (un bucle) sobre el estado de productos */}
        {productos.map(producto => (
          // 6. Por cada producto, renderizamos un ProductoCard
          <ProductoCard
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>
    </>
  );
}