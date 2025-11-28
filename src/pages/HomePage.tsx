// src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
import { getFeaturedProducts } from '../actions'; // Importamos la acción de destacados
import { ProductoCard } from '../components/ProductoCard'; // Reutilizamos la tarjeta
import type { Producto } from '../interfaces/producto.interface';

export const HomePage = () => {
  // 1. Estado para guardar los productos destacados
const [destacados, setDestacados] = useState<Producto[]>([]);
  // 2. useEffect para cargar los datos
useEffect(() => {
    // 3. Llamamos a la action de "destacados" (async)
    const fetchDestacados = async () => {
      const data = await getFeaturedProducts();
      setDestacados(data);
    };
    fetchDestacados();
}, []);

return (
    <>
    <section className="text-center mb-5">
        <h1>Bienvenido a Mi Tienda</h1>
        <p className="lead">Encuentra los mejores productos al mejor precio</p>
        <img
        src="https://plus.unsplash.com/premium_photo-1664305046686-8fb0b095617e?q=80&w=880&auto=format&fit=crop&ixlib.rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%D" 
        className="img-fluid rounded"
        alt="Banner Tienda"
        />
    </section>

    <section>
        <h2 className="mb-4">Productos destacados</h2>
        <div className="row" id="productosDestacados">
          {/* 5. Hacemos un "map" (bucle) sobre los destacados */}
        {destacados.map(producto => (
            // 6. Renderizamos la misma tarjeta reutilizable
            <ProductoCard
            key={producto.id}
            producto={producto}
            />
        ))}
        </div>
    </section>
    </>
);
}