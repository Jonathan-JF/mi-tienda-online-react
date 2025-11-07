// src/interfaces/auth.interface.ts
// (Tu 'scripts.js' solo guardaba correo y pass, pero añadiremos nombre)
export interface User {
nombre: string;
correo: string;
password?: string;
}