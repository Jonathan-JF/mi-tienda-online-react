import type { Producto } from "../interfaces/producto.interface";

// Estos son tus productos de scripts.js
export const productos: Producto[] = [
{
    id: 1,
    nombre: "Vino Don Melchor",
    precio: 20000,
    imagen: "https://donmelchor.com/wp-content/uploads/2024/11/Post-Web-DM-2-1024x683.jpg",
    descripcion: "Un vino chileno de clase mundial, ideal para ocasiones especiales.",
    destacado: true
},
{
    id: 2,
    nombre: "Score Energy Drink",
    precio: 1500,
    imagen: "https://scoreenergydrink.com/cdn/shop/files/SCOREGORILLA500ML_9e93e49e-5f8c-43b1-a992-108f18bec960.jpg?v=1734648539&width=800",
    descripcion: "La bebida energética favorita de los jóvenes.",
    destacado: true
},
{
    id: 3,
    nombre: "Cerveza artesanal",
    precio: 2500,
    imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800",
    descripcion: "Cerveza artesanal chilena, refrescante y con carácter.",
    destacado: false
}
];