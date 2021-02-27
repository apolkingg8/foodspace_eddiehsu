import {IDiscount} from "./IDiscount";
import Product from "../Product";

/**
 * 同商品第二件五折
 */
export default class Discount1 implements IDiscount {

    id = "discount1"
    name = "同商品第二件五折"

    apply = async (products: Product[]): Promise<Product[]> => {
        let map = {}
        return products
    }
}
