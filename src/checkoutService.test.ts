import checkoutService, {CheckoutService} from "./checkoutService";
import Product from "./Product";

describe("checkoutService", async ()=> {

    test("constructor()", ()=> {
        expect(checkoutService).toBeInstanceOf(CheckoutService)
    })

    test("checkout() empty", async ()=> {
        let res = await checkoutService.checkout([])

        expect(res).toEqual([])
    })

    test("checkout() without discounts", async ()=> {
        let products = [
            new Product({id: "1", name: "1", pricing: 1}),
            new Product({id: "2", name: "2", pricing: 2}),
            new Product({id: "3", name: "3", pricing: 3}),
        ]
        let res = await checkoutService.checkout(products)

        expect(checkoutService.discounts).toEqual([])
        expect(res).toEqual(products)
        expect(res).not.toBe(products)
    })
})

