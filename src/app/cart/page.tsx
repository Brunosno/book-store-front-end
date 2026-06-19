'use client'

import Header from "@/components/Header";
import style from './style.module.css'
import { useCart } from "@/context/CartContext";
import CartProduct from "@/components/CartProduct";
import OrderService from '@/services/OrderService';
import AddressService from '@/services/AddressService';
import { useState, useEffect  } from "react";
import { orderCreateSchema } from "@/schemas/OrderSchema";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Cart(){
    const { cart, totalItems, totalPrice, clearCart } = useCart();
    const [loading, setLoading] = useState<boolean>(true);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [addressId, setAddressId] = useState<number | null>(null);
    const [payment, setPayment] = useState<string>("credit_card");
    const [submitting, setSubmitting] = useState(false);

    const router = useRouter();

    useEffect(() => {
        async function fetchAddresses() {
            try {
                const response = await AddressService.findMyAddresses();
                setAddresses(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao buscar endereços", error);
            } finally {
                setLoading(false);
            }
        }

        fetchAddresses();
    }, []);

    async function handleCheckout() {
        if (submitting) return;

        setSubmitting(true);

        const payload = {
            order: {
                address_id: addressId,
                order_items_attributes: cart.map(item => ({
                    book_id: item.book_id,
                    quantity: item.quantity
                }))
            }
        };

        const result = orderCreateSchema.safeParse(payload);

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;

            console.error(errors);

            toast.error("Verifique os dados do pedido");
            return;
        }

        try {
            const response = await OrderService.create(cart, addressId!);

            toast.success("Pedido confirmado!!!")

            clearCart();
            router.push('/home')
        } catch (error: any) {
            console.error(error);

            const message =
                error?.response?.data?.message ||
                "Erro ao finalizar pedido";

            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    }

    return(
        <>
            <Header/>

            <div className={style.container}>
                <div className={style.content}>

                    <div className={style.products}>
                        <h1>Carrinho de Compras</h1>

                        {loading ? (
                            <div className={style.spinner_container}>
                                <div className={style.spinner}></div>
                            </div>
                        ) : cart.length === 0 ? (
                            <p className={style.empty}>Seu carrinho está vazio</p>
                        ) : (
                            cart.map((item) => (
                                <CartProduct key={item.book_id} item={item} />
                            ))
                        )}
                    </div>

                    <div className={style.summary}>
                        <h2>Resumo do Pedido</h2>

                        <div className={style.section}>
                            <label>Endereço de entrega</label>
                            <select
                                value={addressId ?? ""}
                                onChange={(e) => setAddressId(Number(e.target.value))}
                            >
                                <option value="">Selecione um endereço</option>

                                {addresses.map((addr) => (
                                    <option key={addr.id} value={addr.id}>
                                        {addr.nickname || addr.street}, {addr.city} - {addr.state}
                                    </option>
                                ))}
                            </select>
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
                            disabled={cart.length === 0 || !addressId || submitting}
                            className={style.checkout_btn}
                            onClick={handleCheckout}
                        >
                            {submitting ? "Finalizando..." : "Finalizar Compra"}
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}