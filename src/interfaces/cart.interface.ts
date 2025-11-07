// src/interfaces/cart.interface.ts

import type { Producto } from "./producto.interface";

export type CartItem = Producto & {
cantidad: number;
}