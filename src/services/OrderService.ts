import api from '@/lib/api';
import { CartItem } from '@/services/CartService';
import { CreateOrderDTO } from '@/types/OrderType';

const OrderService = {

    async create(cart: CartItem[], addressId: number) {
        const payload: CreateOrderDTO = {
            address_id: addressId,
            order_items_attributes: cart.map(item => ({
                book_id: item.book_id,
                quantity: item.quantity
            }))
        };

        const { data } = await api.post('/orders', {
            order: payload
        });

        return data;
    },

    async getAll(page = 1, perPage = 10) {
        const { data } = await api.get('/orders', {
            params: {
                page,
                per_page: perPage
            }
        });

        return data;
    },

    async getById(id: number) {
        const { data } = await api.get(`/orders/${id}`);
        return data;
    },

    async update(id: number, payload: Partial<CreateOrderDTO>) {
        const { data } = await api.put(`/orders/${id}`, {
            order: payload
        });

        return data;
    },

    async delete(id: number) {
        await api.delete(`/orders/${id}`);
    }
};

export default OrderService;