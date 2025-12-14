// Usamos la ruta relativa que va al proxy -> Gateway
const API_BASE_URL = "/api";
const PRODUCTOS_URL = `${API_BASE_URL}/productos`;

import type { Producto } from "../interfaces/producto.interface";

// Helper para obtener cabeceras con el token
const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        // Si existe el token, lo agregamos como Bearer (aunque tu backend usa un string simple, el estándar es Bearer)
        // Nota: Asegúrate que tu backend espere "Bearer <token>" o solo "<token>"
        'Authorization': token || '' 
    };
};

export const getProducts = async (): Promise<Producto[]> => {
  try {
    const response = await fetch(PRODUCTOS_URL); 
    if (!response.ok) {
        throw new Error("Error al cargar productos: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error conectando al backend (getProducts):", error);
    return [];
  }
}

export const getProductById = async (id: number): Promise<Producto | undefined> => {
    try {
        const response = await fetch(`${PRODUCTOS_URL}/${id}`);
        if (!response.ok) {
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
    const products = await getProducts();
    return products.filter(p => p.destacado);
}

// Nueva función para eliminar producto (Requiere Auth)
export const deleteProduct = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${PRODUCTOS_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders() // Enviamos el token aquí
        });

        if (response.ok) return true;
        
        console.error("Error al eliminar:", await response.text());
        return false;
    } catch (error) {
        console.error("Error de red al eliminar:", error);
        return false;
    }
};