import { BookResponse } from "@/types/BookType";

export interface CartItem {
    book_id: number;
    quantity: number;
    price: number;
}

const STORAGE_KEY = "bookstore_cart";

const CartService = {

    getCart(user_id: number): CartItem[] {
        if (typeof window === "undefined") return [];

        const cart = localStorage.getItem(`${STORAGE_KEY}_${user_id}`);
        return cart ? JSON.parse(cart) : [];
    },

    saveCart(cart: CartItem[], user_id: number) {
        localStorage.setItem(`${STORAGE_KEY}_${user_id}`, JSON.stringify(cart));
    },

    addItem(product: BookResponse, user_id: number) {
        const cart = this.getCart(user_id);

        const existingItem = cart.find(item => item.book_id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                book_id: product.id,
                quantity: 1,
                price: product.price
            });
        }

        this.saveCart(cart, user_id);
        return cart;
    },

    removeItem(productId: number, user_id: number) {
        let cart = this.getCart(user_id);
        cart = cart.filter(item => item.book_id !== productId);

        this.saveCart(cart, user_id);
        return cart;
    },

    updateQuantity(productId: number, quantity: number, user_id: number) {
        const cart = this.getCart(user_id);

        const item = cart.find(item => item.book_id === productId);
        if (!item) return cart;

        item.quantity = quantity <= 0 ? 1 : quantity;

        this.saveCart(cart, user_id);
        return cart;
    },

    clearCart(user_id: number) {
        localStorage.removeItem(`${STORAGE_KEY}_${user_id}`);
    },

    getTotal(user_id: number): number {
        const cart = this.getCart(user_id);

        return cart.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }
};

export default CartService;
