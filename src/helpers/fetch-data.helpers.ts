import axios from 'axios';

// Función "inteligente" que decide el puerto según la URL que pidas
const getBaseUrl = (endpoint: string) => {
    // Si la petición empieza con /auth, va al microservicio de usuarios (8081)
    if (endpoint.startsWith('/auth')) {
        return 'http://localhost:8081'; 
    }
    // Para todo lo demás (productos, categorías), va a la tienda (8082)
    return 'http://localhost:8082/api';
};

export const fetchData = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any) => {
    
    // Calculamos la URL completa
    const baseUrl = getBaseUrl(endpoint);
    // Limpiamos el endpoint para que no se duplique '/api' si ya venía
    const cleanEndpoint = endpoint.replace('/api', ''); 
    const url = `${baseUrl}${cleanEndpoint}`;

    console.log(`📡 Petición a: ${url}`); // Log para que veas en consola a dónde va

    try {
        const token = localStorage.getItem('token');
        
        const response = await axios({
            url,
            method,
            data,
            headers: {
                'Content-Type': 'application/json',
                // Enviamos el token si existe (Bearer simulado)
                ...(token && { Authorization: token }) 
            }
        });

        return response.data;
    } catch (error: any) {
        console.error('Error en fetch:', error);
        throw error.response?.data || error.message;
    }
};