import Product from "../Product";

export interface IDiscount {

    id: string
    name: string

    apply: (products: Product[])=> Promise<Product[]>
}
