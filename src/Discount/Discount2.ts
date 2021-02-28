import {IDiscount} from "./IDiscount";
import Product from "../Product";

/**
 * 任意商品(可相同也可不同)滿3件以上每件皆折5元
 */
export default class Discount2 implements IDiscount {

    id = "discount2"
    name = "任意商品(可相同也可不同)滿3件以上每件皆折5元"

    apply = async (products: Product[]): Promise<Product[]> => {
        let cleanProductCount = products.reduce((prev, current)=> {
            return prev + (current.appliedDiscountIds.length > 0 ? 0 : 1)
        }, 0)

        if(cleanProductCount < 3) {
            return products.map((product)=> (new Product(product)))
        }

        let res = products.map((product, index)=> {
            let newProduct = new Product(product)

            if(newProduct.appliedDiscountIds.length > 0) {
                return newProduct
            }

            newProduct.discount += 5

            return newProduct
        })

        return res
    }

    constructor(props: Partial<Discount2>) {
        Object.assign(this, props)
    }
}
