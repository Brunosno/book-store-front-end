'use client'

import style from './style.module.css';
import Image from 'next/image';
import BookImage from '@/../public/amo_livros.jpg';
import { BookResponse } from '@/types/BookType';
import { ShoppingBasket } from 'lucide-react';
import { useCart } from '@/context/CartContext';

type CardProductProps = {
    product: BookResponse;
}

export default function CardProduct({ product }: CardProductProps){

    const { addItem } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    }

    return(
        <div className={style.container}>
            <div className={style.image_product}>
                <Image
                    src={BookImage}
                    alt='Imagem do produto'
                    fill
                />
            </div>

            <div className={style.product_description}>
                <h2>{product.title}</h2>
                <h3>{product.author?.name}</h3>
                <p>{product.description}</p>

                <span className={style.product_price}>
                    {formatPrice(product.price)}
                </span>

                <small>
                    Estoque: {product.stock} unidades
                </small>

                <div className={style.card_buttons}>
                    <button onClick={() => addItem(product)}>
                        <ShoppingBasket size={24}/>
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}