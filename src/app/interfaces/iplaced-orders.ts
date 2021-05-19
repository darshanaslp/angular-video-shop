export interface IPlacedOrders {
    id: number;
    companyId: 25;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: IPlacedOrderRow[];
}

export interface IPlacedOrderRow {
    id: number;
    productId: number;
    product: string;
    amount: number;
    orderId: number;
}
