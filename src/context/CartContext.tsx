'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/services/CartService';
import CartService from '@/services/CartService';
import { BookResponse } from '@/types/BookType';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

interface CartContextType {
    cart: CartItem[];
    totalItems: number;
    totalPrice: number;
    addItem: (product: BookResponse) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {

    const { user } = useAuth();
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        if (user) {
            setCart(CartService.getCart(user.id));
        } else {
            setCart([]);
        }
    }, [user]);

    function addItem(product: BookResponse) {
        if (!user) {
            toast.error("Você precisa estar logado.");
            return;
        }

        const updatedCart = CartService.addItem(product, user.id);
        setCart([...updatedCart]);

        toast.success(`"${product.title}" adicionado ao carrinho!`);
    }

    function removeItem(productId: number) {
        if (!user) return;

        const updatedCart = CartService.removeItem(productId, user.id);
        setCart([...updatedCart]);

        toast.info("Produto removido do carrinho.");
    }

    function updateQuantity(productId: number, quantity: number) {
        if (!user) return;

        const updatedCart = CartService.updateQuantity(productId, quantity, user.id);
        setCart([...updatedCart]);

        toast.success("Quantidade atualizada.");
    }

    function clearCart() {
        if (!user) return;

        CartService.clearCart(user.id);
        setCart([]);

        toast.warn("Carrinho esvaziado.");
    }

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                totalItems,
                totalPrice,
                addItem,
                removeItem,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }

    return context;
}