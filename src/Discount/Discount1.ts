import {IDiscount} from "./IDiscount";
import Product from "../Product";
import {union} from "lodash";

/**
 * 同商品第二件五折，不可與其他優惠併用
 */
export default class Discount1 implements IDiscount {

    id = "discount1"
    name = "同商品第二件五折，不可與其他優惠併用"

    apply = async (products: Product[]): Promise<Product[]> => {
        let tempMap: Record<string, number> = {}
        let pairIndexArr: number[] = []
        let res: Product[] = products.map((product, index)=> {
            let newProduct = new Product(product)

            if(newProduct.appliedDiscountIds.length > 0) {
                return newProduct
            }

            if(typeof tempMap[product.id] === "number") {
                newProduct.discount = Math.round(product.pricing / 2)
                pairIndexArr.push(tempMap[product.id])
                pairIndexArr.push(index)
                delete tempMap[product.id]
            } else {
                tempMap[product.id] = index
            }

            return newProduct
        })

        for(let index of pairIndexArr) {
            res[index].appliedDiscountIds = union(
                res[index].appliedDiscountIds,
                [this.id],
            )
        }

        return res
    }

    constructor(props: Partial<Discount1>) {
        Object.assign(this, props)
    }
}
