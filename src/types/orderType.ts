export interface OrderItemType {
    _id?: string;
    productId: string;
    quantity: number;
    priceAtPurchase: number;
}

export interface OrderType {
    _id?: string;
    date: string;
    totalAmount: number;
    orderItems?: OrderItemType[]
}
