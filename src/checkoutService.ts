import Product from "./Product";
import _ from "lodash";
import {IDiscount} from "./Discount/IDiscount";

export class CheckoutService {

    /**
     * 折扣按順序套用
     */
    discounts: IDiscount[] = []

    addDiscount = async (discount: IDiscount)=> {
        this.discounts = _.unionBy(this.discounts, [discount], (discount)=> {
            return discount.id
        })
    }

    removeDiscount = async (id: string)=> {
        this.discounts = _.filter(this.discounts, (discount)=> {
            return discount.id !== id
        })
    }

    checkout = async (products: Product[]): Promise<Product[]> => {
        let res: Product[] = _.cloneDeep(products)

        for(let discount of this.discounts) {
            res = await discount.apply(res)
        }

        return res
    }
}

export default new CheckoutService()
