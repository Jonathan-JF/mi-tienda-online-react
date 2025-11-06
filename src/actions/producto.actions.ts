// src/actions/producto.actions.ts
import { productos } from "../data/productos.data";
import type { Producto } from "../interfaces/producto.interface";

// Función para obtener TODOS los productos
export const getProducts = (): Producto[] => {
return productos;
}

// Función para obtener productos por ID (para la página de detalle)
export const getProductById = (id: number): Producto | undefined => {
  // Usamos .find() para buscar el producto por su id
return productos.find(producto => producto.id === id);
}

// Función para obtener productos DESTACADOS (para el Home)
//
export const getFeaturedProducts = (): Producto[] => {
  // Usamos .filter() para obtener solo los destacados
return productos.filter(producto => producto.destacado);
}