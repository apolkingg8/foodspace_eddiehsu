
export default class Product {

    id: string = ""

    name: string = ""
    pricing: number = 0
    discount: number = 0

    appliedDiscountIds: string[] = []

    constructor(props: Partial<Product>) {
        Object.assign(this, props)
    }
}
