import {IDiscount} from "./IDiscount";
import Product from "../Product";

/**
 * 同商品第二件五折
 */
export default class Discount1 implements IDiscount {

    id = "discount1"
    name = "同商品第二件五折"

    apply = async (products: Product[]): Promise<Product[]> => {
        let countMap: Record<string, number> = {}
        let res: Product[] = products.map((product, index)=> {
            let newProduct = new Product(product)

            typeof countMap[product.id] === "number"
                ? countMap[product.id] += 1
                : countMap[product.id] = 1

            if(countMap[product.id] >= 2
            && countMap[product.id] % 2 === 0) {
                newProduct.pricing = Math.round(product.pricing / 2)
            }

            return newProduct
        })

        return res
    }

    constructor(props: Partial<Discount1>) {
        Object.assign(this, props)
    }
}
