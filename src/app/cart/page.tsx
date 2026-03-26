'use client'

import Header from "@/components/Header";
import style from './style.module.css'
import { useCart } from "@/context/CartContext";
import CartProduct from "@/components/CartProduct";
import { useState } from "react";

export default function Cart(){
    const { cart, totalItems, totalPrice } = useCart();
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("credit_card");

    function handleCheckout() {
        console.log({
            cart,
            address,
            payment
        });
    }

    return(
        <>
            <Header/>

            <div className={style.container}>
                <div className={style.content}>

                    {/* ESQUERDA - PRODUTOS */}
                    <div className={style.products}>
                        <h1>Carrinho de Compras</h1>

                        {cart.length === 0 ? (
                            <p className={style.empty}>Seu carrinho está vazio</p>
                        ) : (
                            cart.map((item) => (
                                <CartProduct key={item.book_id} item={item} />
                            ))
                        )}
                    </div>

                    {/* DIREITA - RESUMO */}
                    <div className={style.summary}>
                        <h2>Resumo do Pedido</h2>

                        <div className={style.section}>
                            <label>Endereço de entrega</label>
                            <input
                                type="text"
                                placeholder="Digite seu endereço"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className={style.section}>
                            <label>Forma de pagamento</label>
                            <select
                                value={payment}
                                onChange={(e) => setPayment(e.target.value)}
                            >
                                <option value="credit_card">Cartão de Crédito</option>
                                <option value="pix">Pix</option>
                                <option value="boleto">Boleto</option>
                            </select>
                        </div>

                        <div className={style.total_box}>
                            <p>Itens: {totalItems}</p>
                            <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
                        </div>

                        <button
                            className={style.checkout_btn}
                            onClick={handleCheckout}
                        >
                            Finalizar Compra
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}