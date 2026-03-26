'use client'

import { useEffect, useState } from "react";
import { CartItem } from "@/services/CartService";
import { BookResponse } from "@/types/BookType";
import BookService from "@/services/BookService";
import styles from "./style.module.css";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartProps {
    item: CartItem;
}

export default function CartProduct({ item }: CartProps) {
    const [book, setBook] = useState<BookResponse | null>(null);
    const { removeItem, updateQuantity } = useCart();

    useEffect(() => {
        async function loadBook() {
            try {
                const { data } = await BookService.findById(item.book_id);
                setBook(data);
            } catch (error) {
                console.error("Erro ao carregar livro", error);
            }
        }

        loadBook();
    }, [item.book_id]);

    if (!book) return null;

    const increase = () => {
        updateQuantity(item.book_id, item.quantity + 1);
    };

    const decrease = () => {
        updateQuantity(item.book_id, item.quantity - 1);
    };

    return (
        <div className={styles.card}>
            
            {/* IMAGEM */}
            <div className={styles.image_box}>
                <img
                    src={`https://picsum.photos/200?random=${book.id}`}
                    alt={book.title}
                />
            </div>

            {/* INFO */}
            <div className={styles.info}>
                <h3>{book.title}</h3>

                <p className={styles.author}>
                    por {book.author?.name}
                </p>

                <p>{book.description}</p>

                <span className={styles.price}>
                    R$ {Number(book.price).toFixed(2)}
                </span>
            </div>

            {/* AÇÕES */}
            <div className={styles.actions}>
                <div className={styles.quantity_control}>
                    <button onClick={decrease}>
                        <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={increase}>
                        <Plus size={16} />
                    </button>
                </div>

                <button
                    className={styles.remove_btn}
                    onClick={() => removeItem(item.book_id)}
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* SUBTOTAL */}
            <div className={styles.subtotal}>
                R$ {(item.quantity * Number(book.price)).toFixed(2)}
            </div>
        </div>
    );
}