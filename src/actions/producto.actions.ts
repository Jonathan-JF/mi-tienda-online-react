import type { Producto } from "../interfaces/producto.interface";

// Usamos la ruta relativa que va al proxy de Vite -> Gateway
const API_BASE_URL = "/api";
const PRODUCTOS_URL = `${API_BASE_URL}/productos`;
const BOLETAS_URL = `${API_BASE_URL}/boletas`;

// Helper para obtener cabeceras con el token
const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token || '' 
    };
};

// --- OBTENER PRODUCTOS (Público) ---
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

// --- OBTENER POR ID (Público) ---
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

// --- DESTACADOS (Público - Simulado filtrando en front) ---
export const getFeaturedProducts = async (): Promise<Producto[]> => {
    const products = await getProducts();
    return products.filter(p => p.destacado);
}

// --- CREAR PRODUCTO (Protegido - Requiere Token) ---
export const createProduct = async (producto: Omit<Producto, 'id'> & { categoriaId: number }): Promise<boolean> => {
    try {
        const response = await fetch(PRODUCTOS_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(producto)
        });

        if (response.ok) return true;

        const errorData = await response.json().catch(() => null);
        console.error("Error al crear producto:", errorData);
        return false;
    } catch (error) {
        console.error("Error de red al crear:", error);
        return false;
    }
};

// --- ACTUALIZAR PRODUCTO (Nuevo) ---
export const updateProduct = async (id: number, producto: Partial<Producto> & { categoriaId: number }): Promise<boolean> => {
    try {
        const response = await fetch(`${PRODUCTOS_URL}/${id}`, {
            method: 'PUT', // Usamos PUT para actualizar
            headers: getAuthHeaders(),
            body: JSON.stringify(producto)
        });

        if (response.ok) return true;
        
        console.error("Error al actualizar:", await response.text());
        return false;
    } catch (error) {
        console.error("Error de red al actualizar:", error);
        return false;
    }
};

// --- ELIMINAR PRODUCTO (Protegido - Requiere Token) ---
export const deleteProduct = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${PRODUCTOS_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (response.ok || response.status === 204) return true;
        
        console.error("Error al eliminar:", await response.text());
        return false;
    } catch (error) {
        console.error("Error de red al eliminar:", error);
        return false;
    }
};

// --- CREAR BOLETA / COMPRAR ---
export const createBoleta = async (total: number, usuarioCorreo: string, detalles: any[]): Promise<boolean> => {
    try {
        const boletaData = {
            usuarioCorreo,
            total,
            detalles
        };

        const response = await fetch(BOLETAS_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(boletaData)
        });

        if (response.ok) return true;
        
        console.error("Error al comprar:", await response.text());
        return false;
    } catch (error) {
        console.error("Error de red al comprar:", error);
        return false;
    }
};