// FIX: Ahora apuntamos a la ruta relativa /api/productos, para que Vite use su proxy.
// Vite tomará /api y lo redirigirá a http://localhost:8080
const API_BASE_URL = "/api";
const PRODUCTOS_URL = `${API_BASE_URL}/productos`;

import type { Producto } from "../interfaces/producto.interface";

export const getProducts = async (): Promise<Producto[]> => {
  try {
    // Usamos la URL relativa: /api/productos
    const response = await fetch(PRODUCTOS_URL); 
    if (!response.ok) {
        throw new Error("Error al cargar productos: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error conectando al backend (getProducts):", error);
    // Para el caso de "Failed to fetch" real (servidor caído), retorna array vacío
    return [];
  }
}

export const getProductById = async (id: number): Promise<Producto | undefined> => {
    // FIX: Ahora usamos una ruta específica en el backend para obtener un producto por ID
    try {
        const response = await fetch(`${PRODUCTOS_URL}/${id}`);
        if (!response.ok) {
             // Si el servidor retorna 404 para un ID no existente
            if (response.status === 404) return undefined;
            throw new Error("Error al buscar producto: " + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error conectando al backend (getProductById):", error);
        return undefined;
    }
}

export const getFeaturedProducts = async (): Promise<Producto[]> => {
    // FIX: Esto ya no es necesario si el backend puede filtrar
    // De momento, mantenemos la lógica en frontend hasta implementar /productos/destacados
    const products = await getProducts();
    return products.filter(p => p.destacado);
}