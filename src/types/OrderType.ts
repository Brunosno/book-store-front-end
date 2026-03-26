export interface OrderItemDTO {
    book_id: number;
    quantity: number;
}

export interface CreateOrderDTO {
    address_id: number;
    order_items_attributes: OrderItemDTO[];
}