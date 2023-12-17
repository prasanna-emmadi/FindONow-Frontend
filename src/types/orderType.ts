import { ProductType } from "./productType";

export interface OrderItemType {
    _id?: string;
    product: string;
    quantity: number;
    priceAtPurchase: number;
}

export interface OrderType {
    _id?: string;
    date: string;
    totalAmount: number;
    orderItems?: OrderItemType[];
}

export interface GetOrderItemType {
    _id: string;
    product: ProductType;
    quantity: number;
    priceAtPurchase: number;
}

export interface GetOrderType {
    _id: string;
    date: string;
    totalAmount: number;
    orderItems: GetOrderItemType[];
}
