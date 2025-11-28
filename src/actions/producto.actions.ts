// Apuntamos al Gateway (Puerto 8080)
const API_URL = "http://localhost:8080/api/productos";
import type { Producto } from "../interfaces/producto.interface";

export const getProducts = async (): Promise<Producto[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Error al cargar productos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error conectando al backend:", error);
    return [];
  }
}

export const getProductById = async (id: number): Promise<Producto | undefined> => {
    // Reutilizamos getProducts o creamos un endpoint específico en el backend
    const productos = await getProducts();
    return productos.find(p => p.id === Number(id)); // Asegurar que sea número
}

export const getFeaturedProducts = async (): Promise<Producto[]> => {
    const productos = await getProducts();
    return productos.filter(p => p.destacado);
}