export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    year: number;
    added: string;
    productCategory: Array<{categoryId:number, category: string}>;
}
