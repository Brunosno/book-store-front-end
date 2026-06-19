import { z } from 'zod';

export const orderCreateSchema = z.object({
    order: z.object({
        address_id: z.number({
            message: "O endereço é obrigatório"
        }),

        order_items_attributes: z.array(
            z.object({
                book_id: z.number({
                    message: "Livro é obrigatório"
                }),

                quantity: z.number({
                    message: "Quantidade é obrigatória"
                }).min(1, {
                    message: "Quantidade deve ser no mínimo 1"
                })
            })
        ).min(1, {
            message: "O pedido deve ter pelo menos um item"
        })
    })
});

export type OrderCreateSchema = z.infer<typeof orderCreateSchema>;