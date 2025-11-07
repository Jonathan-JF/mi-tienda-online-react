// src/context/CartContext.tsx

import { createContext, useState, useEffect, useContext, type ReactNode} from 'react';
import type { Producto } from '../interfaces/producto.interface';
import type { CartItem } from '../interfaces/cart.interface';

interface CartContextType {
cartItems: CartItem[];
addProduct: (producto: Producto) => void;
removeProduct: (id: number) => void;
totalItems: number;
totalPrice: number;
}
// El "!" le dice a TypeScript que confiamos en que siempre habrá un valor.
const CartContext = createContext<CartContextType>(null!);
// 3. Creamos el "Proveedor" (el componente que maneja la lógica)
interface Props {
children: ReactNode;
}
export const CartProvider = ({ children }: Props) => {
  // 4. Esta es la lógica de tu scripts.js:
  // let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
    const items = localStorage.getItem('carrito');
    return items ? JSON.parse(items) : [];
    } catch (error) {
    return [];
    }
  });
  // 5. Esta es tu función "guardarCarrito()"
  // Se ejecuta CADA VEZ que "cartItems" cambia.
useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cartItems));
}, [cartItems]);

  // 6. Esta es tu función "agregarAlCarrito()"
const addProduct = (producto: Producto) => {
    setCartItems(prevItems => {
      // Busca si el producto ya existe
    const existingItem = prevItems.find(item => item.id === producto.id);
    
    if (existingItem) {
        // Si existe, actualiza la cantidad
        return prevItems.map(item =>
        item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
    } else {
        // Si no existe, añádelo al carrito con cantidad 1
        return [...prevItems, { ...producto, cantidad: 1 }];
    }
    });
    alert(`${producto.nombre} agregado al carrito`);
};

const removeProduct = (id: number) => {
  setCartItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  const totalItems = cartItems.reduce((total, item) => {
    return total + item.cantidad;
  }, 0);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.precio * item.cantidad);
  }, 0);



return (
    <CartContext.Provider
    value={{cartItems,addProduct,removeProduct,totalItems,totalPrice}}>
    {children}
    </CartContext.Provider>
);
}
export const useCart = () => {
const context = useContext(CartContext);
if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
}
return context;
}