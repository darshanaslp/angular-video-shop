export interface IOrder {
    id: number; //It will be automatically created
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice:number;
    status: number;
    orderRows: IOrderRow[];
}

export interface IOrderRow {
    ProductId: number;
    Amount: number;
    Id: number;
}
